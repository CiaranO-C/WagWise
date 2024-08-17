const { Router } = require("express");
const {
  validateNewUsername,
  validateNewPassword,
} = require("./user-validation");
const { createUserHandler } = require("./user-handler");
const { auth, tokens } = require("./auth");

const userRouter = Router();

// base --> "/user"

userRouter.post(
  "/sign-up",
  validateNewUsername,
  validateNewPassword,
  createUserHandler,
);

userRouter.post("/log-in", auth.loginAuth, tokens.sendTokensToClient);
userRouter.get(
  "/refresh-token",
  tokens.authorizeRefreshToken,
  tokens.sendTokensToClient,
);

module.exports = userRouter;
