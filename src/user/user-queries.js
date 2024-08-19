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

async function retrieveComments(userId) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        authorId: userId,
      },
    });
    return comments;
  } catch (error) {
    throw new Error("Error retrieving commnets");
  }
}

async function deleteDbComment(id) {
  try {
    const deleted = await prisma.comment.delete({
      where: {
        id: id,
      },
    });
    return deleted;
  } catch (error) {
    throw new Error("Error deleting comment");
  }
}

async function updateUser(id) {
    try {
        const updated = await prisma.user.update({
            where: {
                id: id
            },
            data: {

            }
        })
    } catch (error) {
        throw new Error(`Error updating user: ${id}`)
    }
}

module.exports = { createUser, checkUsername, retrieveComments, deleteDbComment, updateUser };
