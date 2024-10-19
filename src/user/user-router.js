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
userRouter.get("/", userAuth, handler.getUser);
userRouter.get("/comments", userAuth, handler.getUserComments);
userRouter.delete("/comments/:commentId", userAuth, handler.deleteComment);
userRouter.put("/:id", userAuth, handler.putUser);

/* Admin */
userRouter.use(adminAuth);
userRouter.get("/admin/users", handler.getUsers);
userRouter.get("/admin/comments", handler.getComments);
userRouter.get("/admin/comments/recent", handler.getRecentComments);
userRouter.get("/admin/comments/review", handler.getReviewComments);
userRouter.delete("/admin/comments", handler.deleteComments)
userRouter.delete("/admin/comments/:id", handler.adminDeleteComment);
userRouter.put("/admin/comments/:id", handler.putComment);


module.exports = userRouter;
