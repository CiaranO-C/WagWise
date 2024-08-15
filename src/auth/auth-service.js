const prisma = require("../../config/prisma");
const jwt = require("jsonwebtoken");

async function saveRefreshToken(userId, jti, created, expires) {
  try {
    await prisma.refreshToken.upsert({
      where: {
        userId: userId,
      },
      update: {
        token: jti,
        createdAt: created,
        expiresAt: expires,
      },
      create: {
        userId: userId,
        token: jti,
        createdAt: created,
        expiresAt: expires,
      },
    });
  } catch (error) {
    throw new Error("Error persisting refresh token");
  }
}

async function checkValidToken(refreshToken) {
  try {
    const decodedToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, {
      algorithms: ["HS384"],
    });

    // search db for valid matching token
    const validToken = await prisma.refreshToken.findUnique({
      where: { token: decodedToken.jti },
      include: { user: true },
    });

    return validToken;
  } catch (error) {
    throw new Error("Failed to match token");
  }
}

module.exports = { saveRefreshToken, checkValidToken };
