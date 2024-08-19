const { validationResult } = require("express-validator");
const { createNewUser } = require("./user-service");
const {
  retrieveComments,
  deleteDbComment,
  updateUser,
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
    const currentUserId = req.user.id;
    const id = Number(req.params.id);
    if (currentUserId !== id)
      return res.status(403).json({ message: "forbidden" });
    const comments = await retrieveComments(id);
    res.json({ comments });
  } catch (error) {
    next(error);
  }
}

async function deleteComment(req, res, next) {
  try {
    const currentUserId = req.user.id;
    const { userId, commentId } = req.params;
    if (currentUserId !== Number(userId)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const deleted = await deleteDbComment(commentId);
    res.json({ deleted });
  } catch (error) {
    next(error);
  }
}

async function adminDeleteComment(req, res, next) {
  try {
    const id = Number(req.params.id);
    const deleted = await deleteDbComment(id);
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

module.exports = {
  createUser,
  getUserComments,
  deleteComment,
  adminDeleteComment,
  putUser,
};
