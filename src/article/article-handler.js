const service = require("./article-service");

async function getAllArticles(req, res, next) {
  try {
    const articles = await service.fetchAllArticles();
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

async function getArticle(req, res, next) {
  const id = Number(req.params.id);
  try {
    const article = await service.fetchArticleById(id);
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

async function postComment(req, res, next) {
  /* logic - service.insertComment */
  res.json({ message: "you are authorized to comment!" });
}

module.exports = { getAllArticles, getArticle, postComment };
