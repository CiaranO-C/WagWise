const prisma = require("../../config/prisma");

async function createUser(username, hashedPassword) {
  const newUser = await prisma.user.create({
    data: {
      username: username,
      password: hashedPassword,
    },
  });
  return newUser;
}

async function checkUsername(username) {
  const usernameExists = await prisma.user.findUnique({
    where: { username: username },
  });

  return usernameExists;
}

module.exports = { createUser, checkUsername };
