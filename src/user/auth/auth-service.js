const jwt = require("jsonwebtoken");
const { findRefreshToken } = require("./auth-queries");

async function checkValidToken(refreshToken) {
  try {
    const decodedToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, {
      algorithms: ["HS384"],
    });
    console.log("decoded JTI --> ", decodedToken.jti);
    
    // search db for valid matching token
    const validToken = await findRefreshToken(decodedToken.jti);
    console.log('VALID TOKEN RESPONSE ---->>>', validToken);
    
    return validToken;
  } catch (error) {
    throw new Error("Failed to match token");
  }
}

module.exports = { checkValidToken };
