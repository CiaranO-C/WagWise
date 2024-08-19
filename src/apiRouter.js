const { Router } = require("express");
const articleRouter = require("./article/article-router");
const userRouter = require('./user/user-router');
const tagRouter = require('./tag/tag-router');

const apiRouter = Router();

// base --> "/api"

apiRouter.use("/user", userRouter)
apiRouter.use("/articles", articleRouter);
apiRouter.use("/tags", tagRouter);

module.exports = apiRouter;
