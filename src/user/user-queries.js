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
    throw new Error("Error retrieving comments");
  }
}

async function retrieveRecentComments() {
  try {
    const comments = await prisma.comment.findMany({
      include: { author: true },
      orderBy: { created: "desc" },
      take: 10,
    });
    return comments;
  } catch (error) {
    throw new Error("Error retrieving recent comments");
  }
}

async function retrieveReviewComments() {
  try {
    const comments = await prisma.comment.findMany({
      where: { review: true },
      include: { author: true },
      orderBy: { created: "desc" },
      take: 100,
    });
    return comments;
  } catch (error) {
    throw new Error("Error retrieving review comments");
  }
}

async function getCommentAuthorId(commentId) {
  try {
    const authorId = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { authorId: true },
    });
    return authorId;
  } catch (error) {
    throw new Error("Could not retrieve comment author");
  }
}

async function deleteDbComment(author, id) {
  try {
    const deleted = await prisma.comment.delete({
      where: {
        id: id,
        authorId: author,
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
        id: id,
      },
      data: {},
    });
  } catch (error) {
    throw new Error(`Error updating user: ${id}`);
  }
}

async function retrieveUser(id) {
  try {
    const user = prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        likes: true,
        comments: true,
      },
    });
    return user;
  } catch (error) {
    throw new Error("Error retrieving user");
  }
}

async function retrieveAllUsers() {
  try {
    const users = prisma.user.findMany({ where: { role: "USER" } });
    return users;
  } catch (error) {
    throw new Error("Error retrieving users");
  }
}

module.exports = {
  createUser,
  checkUsername,
  retrieveComments,
  deleteDbComment,
  updateUser,
  getCommentAuthorId,
  retrieveUser,
  retrieveAllUsers,
  retrieveRecentComments,
  retrieveReviewComments,
};
