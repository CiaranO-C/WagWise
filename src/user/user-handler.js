const { validationResult } = require("express-validator");
const { createNewUser } = require("./user-service");
const {
  retrieveComments,
  deleteDbComment,
  updateUser,
  getCommentAuthorId,
  retrieveUser,
  retrieveRecentComments,
  retrieveAllUsers,
  retrieveReviewComments,
} = require("./user-queries");

const createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res
        .status(400)
        .json({ errors: err.array({ onlyFirstError: true }) });
    }
    const newUser = await createNewUser(username, password);

    return res.json({ message: "user created succesfully", newUser });
  } catch (error) {
    next(error);
  }
};

async function getUserComments(req, res, next) {
  try {
    const userId = req.user.id;
    const comments = await retrieveComments(userId);
    res.json({ comments });
  } catch (error) {
    next(error);
  }
}

async function deleteComment(req, res, next) {
  try {
    const userId = req.user.id;
    const commentId = Number(req.params.commentId);

    const deleted = await deleteDbComment(userId, commentId);
    res.json({ deleted });
  } catch (error) {
    next(error);
  }
}

async function adminDeleteComment(req, res, next) {
  try {
    const commentId = Number(req.params.id);
    console.log(commentId);

    const { authorId } = await getCommentAuthorId(commentId);
    console.log(authorId);

    const deleted = await deleteDbComment(authorId, commentId);
    res.json({ deleted });
  } catch (error) {
    next(error);
  }
}

async function putUser(req, res, next) {
  try {
    currentUserId = req.user.id;
    const { id } = req.params;
    if (currentUserId !== id)
      return res.status(403).json({ message: "Forbidden" });
    const updated = await updateUser(id);
    res.json({ updated });
  } catch (error) {
    next(error);
  }
}

async function getUser(req, res, next) {
  try {
    const { id } = req.user;
    const user = await retrieveUser(id);
    res.json({
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

async function getUsers(req, res, next) {
  try {
    const users = await retrieveAllUsers();
    res.json({ users });
  } catch (error) {
    next(error);
  }
}

async function getRecentComments(req, res, next) {
  try {
    const recent = await retrieveRecentComments();
    res.json({ recent });
  } catch (error) {
    next(error);
  }
}

async function getReviewComments(req, res, next) {
  try {
    const review = await retrieveReviewComments();
    res.json({ review });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createUser,
  getUserComments,
  deleteComment,
  adminDeleteComment,
  getRecentComments,
  getReviewComments,
  putUser,
  getUser,
  getUsers,
};
