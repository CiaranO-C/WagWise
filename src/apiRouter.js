const { Router } = require("express");
const articleRouter = require("./article/article-router");
const authRouter = require('./auth/auth-router');
const signUpRouter = require('./sign-up/sign-up-router');

const apiRouter = Router();

// base --> "/api"

apiRouter.post("/sign-up", signUpRouter)
apiRouter.use("/auth", authRouter);
apiRouter.use("/articles", articleRouter);

module.exports = apiRouter;
