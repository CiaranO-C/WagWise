const prisma = require("../../../config/prisma");

async function saveRefreshToken(userId, jti, created, expires) {
  
  try {
    const stored = await prisma.refreshToken.upsert({
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
    throw new Error("Error saving refresh token");
  }
}

async function findRefreshToken(jti) {
  // search db for valid matching token
  const allTokens = await prisma.refreshToken.findMany();
  
  const validToken = await prisma.refreshToken.findUnique({
    where: { token: jti },
    include: { user: true },
  });
  return validToken;
}

module.exports = { saveRefreshToken, findRefreshToken };
