const {
  getArticles,
  getArticleById,
  insertComment,
} = require("./article-queries");

async function getAllArticlesHandler(req, res, next) {
  const sort = req.query.sort || "created";
  const order = req.query.order || "desc";
  try {
    const articles = await getArticles(sort, order);
    if (!articles) {
      return res.status(200).json({
        message: "No articles found",
      });
    }
    return res.status(200).json({ articles });
  } catch (error) {
    next(error);
  }
}

async function getArticleHandler(req, res, next) {
  const id = Number(req.params.id);
  try {
    const article = await getArticleById(id);
    if (!article) {
      return res.status(200).json({
        message: "Article not found",
      });
    }
    return res.status(200).json({ article });
  } catch (error) {
    next(error);
  }
}

async function postCommentHandler(req, res, next) {
  try {
    const { articleId, authorId, text } = req.body;
    const newComment = await insertComment(articleId, authorId, text);
    res.json({ message: "Success", comment: newComment });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllArticlesHandler,
  getArticleHandler,
  postCommentHandler,
};
