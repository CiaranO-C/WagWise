const { Router } = require("express");
const handler = require("./article-handler");

const articleRouter = Router();

articleRouter.get("/", handler.getAllArticles);
articleRouter.get("/:id", handler.getArticle);
articleRouter.post("/:id/comment", handler.postComment);

module.exports = articleRouter;
