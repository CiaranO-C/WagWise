const { Router } = require("express");
const {
  validateNewUsername,
  validateNewPassword,
} = require("./user-validation");
const handler = require("./user-handler");
const { auth, tokens } = require("./auth");
const { userAuth, adminAuth } = require("./auth/auth");

const userRouter = Router();

// base --> "/user"

/* Public */
userRouter.post(
  "/sign-up",
  validateNewUsername,
  validateNewPassword,
  handler.createUser,
);

userRouter.post("/log-in", auth.loginAuth, tokens.sendTokensToClient);

userRouter.get(
  "/refresh-token",
  tokens.authorizeRefreshToken,
  tokens.sendTokensToClient,
);

/* User */
userRouter.get("/:id/comments", userAuth, handler.getUserComments);
userRouter.delete(
  ":userId/comments/:commentId",
  userAuth,
  handler.deleteComment,
);
userRouter.put("/:id", userAuth, handler.putUser);

/* Admin */
userRouter.delete("/comments/:id", adminAuth, handler.deleteComment);

module.exports = userRouter;
