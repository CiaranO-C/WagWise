const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
const { saveRefreshToken, checkValidToken } = require("./auth-service");

async function generateTokens(userId) {
  try {
    const accessToken = jwt.sign({ userId }, process.env.JWT_PRIVATE_KEY, {
      algorithm: "HS384",
      expiresIn: "20s",
    });

    const jti = uuid();
    // current time
    const created = new Date();
    // 7 day expiry
    const expires = new Date(created.getTime() + 7 * 24 * 60 * 60 * 1000);
    await saveRefreshToken(userId, jti, created, expires);

    const refreshToken = jwt.sign({ jti }, process.env.JWT_REFRESH_KEY, {
      algorithm: "HS384",
      expiresIn: "7d",
    });

    return [accessToken, refreshToken];
  } catch (error) {
    throw new Error("Failed to generate token pair");
  }
}

async function sendTokensToClient(req, res, next) {
  try {
    // generate new token pair - also saves to db
    const [accessToken, refreshToken] = await generateTokens(req.user.id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      secure: process.env.APP_ENV === "production", // ensures https only in production
    });

    return res.status(200).json({ jwt: accessToken });
  } catch (error) {
    next(error);
  }
}

async function authorizeRefreshToken(req, res, next) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res
        .status(401)
        .json({ message: "Client does not have refresh token" });
    }

    // check db for valid token
    const validToken = await checkValidToken(refreshToken);

    // token invalid or expired
    if (!validToken || new Date() > validToken.expiresAt) {
      return res
        .status(401)
        .json({ message: "Token invalid, Log in to generate new token" });
    }

    // valid refresh token
    req.user = validToken.user;
    next();
  } catch (error) {
    console.error(error);

    next(error);
  }
}

module.exports = { generateTokens, sendTokensToClient, authorizeRefreshToken };
