const { Router } = require("express");
const { userAuth, adminAuth } = require("../user/auth/auth");
const handler = require("./article-handler");

const articleRouter = Router();

// base --> "/articles"

/* PUBLIC */

articleRouter.get("/", handler.getAllArticles);
articleRouter.get("/:id", handler.getArticle);

/* USER */
articleRouter.post("/:id/comment", userAuth, handler.postComment);

/* ADMIN */
articleRouter.use(adminAuth);

articleRouter.post("/", handler.postArticle);
articleRouter.put("/:id", handler.putArticle);
articleRouter.delete("/:id", handler.deleteArticle);

module.exports = articleRouter;
