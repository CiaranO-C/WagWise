const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
const { checkValidToken } = require("./auth-service");
const { saveRefreshToken } = require("./auth-queries");

async function generateTokens(userId) {
  try {
    const accessToken = jwt.sign({ userId }, process.env.JWT_PRIVATE_KEY, {
      algorithm: "HS384",
      expiresIn: "1h",
    });

    const jti = uuid();
    // current time
    const created = new Date();
    // 7 day expiry
    const expires = new Date(created.getTime() + 7 * 24 * 60 * 60 * 1000);

    await saveRefreshToken(userId, jti, created, expires);

    const refreshToken = jwt.sign({ jti }, process.env.JWT_REFRESH_KEY, {
      algorithm: "HS384",
      expiresIn: "1d",
    });
    return [accessToken, refreshToken];
  } catch (error) {
    throw new Error("Failed to generate token pair");
  }
}

async function sendTokensToClient(req, res, next) {
  try {
    // generate new token pair - also saves to db
    const { user } = req;
    const [accessToken, refreshToken] = await generateTokens(user.id);

    return res.status(200).json({
      jwt: accessToken,
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        likes: user.likes,
        comments: user.comments,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function authorizeRefreshToken(req, res, next) {
  try {
    const refreshToken = req.headers["refresh"];
    console.log("Received refresh token --> ", refreshToken);

    if (!refreshToken) {
      console.log("No refresh token!");

      return res
        .status(401)
        .json({ message: "Client does not have refresh token" });
    }

    // check db for valid token
    const validToken = await checkValidToken(refreshToken);

    // token invalid or expired
    if (!validToken || new Date() > validToken.expiresAt) {
      console.log("refresh token invalid or expired");

      return res
        .status(401)
        .json({ message: "Token invalid, Log in to generate new token" });
    }
    console.log("Refresh token valid!");

    // valid refresh token
    req.user = validToken.user;
    next();
  } catch (error) {
    console.error(error);

    next(error);
  }
}

module.exports = { generateTokens, sendTokensToClient, authorizeRefreshToken };
