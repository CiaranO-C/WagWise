const { Router } = require("express");
const { loginAuth } = require("./auth");
const { sendTokensToClient, authorizeRefreshToken } = require("./tokens");

const authRouter = Router();

// base --> "/auth"

authRouter.post("/log-in", loginAuth, sendTokensToClient);
authRouter.get("/refresh-token", authorizeRefreshToken, sendTokensToClient);

module.exports = authRouter;
