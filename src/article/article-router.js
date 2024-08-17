const { Router } = require("express");
const handler = require("./article-handler");
const { userAuth } = require('../user/auth/auth');

const articleRouter = Router();

// base --> "/articles"

articleRouter.get("/", handler.getAllArticles);
articleRouter.get("/:id", handler.getArticle);
articleRouter.post("/:id/comment", userAuth, handler.postComment);

module.exports = articleRouter;
