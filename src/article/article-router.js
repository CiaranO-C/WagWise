const { Router } = require("express");
const { userAuth, adminAuth } = require("../user/auth/auth");
const handler = require("./article-handler");

const articleRouter = Router();

// base --> "/articles"

/* PUBLIC */

articleRouter.get("/", handler.getAllArticles);
articleRouter.get("/search", handler.getSearchArticles);
articleRouter.get("/:id", handler.getArticle);

/* USER */
articleRouter.post("/:id/comment", userAuth, handler.postComment);


/* ADMIN */
articleRouter.use(adminAuth);

articleRouter.post("/", handler.postArticle);
articleRouter.post("/:id/publish", handler.postPublish);
articleRouter.post("/:id/unpublish", handler.postUnpublish);
articleRouter.get("/admin/unpublished", handler.getUnpublishedArticles);
articleRouter.get("/admin/search", handler.getSearchArticles);
articleRouter.put("/:id", handler.putArticle);
articleRouter.delete("/:id", handler.deleteArticle);

module.exports = articleRouter;
