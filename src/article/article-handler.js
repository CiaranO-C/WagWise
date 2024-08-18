const {
  getArticles,
  getArticleById,
  insertComment,
  createArticle,
  updateArticle,
  deleteDbArticle,
} = require("./article-queries");

async function getAllArticles(req, res, next) {
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

async function getArticle(req, res, next) {
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

async function postComment(req, res, next) {
  try {
    const { articleId, authorId, text } = req.body;
    const newComment = await insertComment(articleId, authorId, text);
    res.json({ message: "Success", comment: newComment });
  } catch (error) {
    next(error);
  }
}

async function postArticle(req, res, next) {
  try {
    const { title, text, tagIds } = req.body;
    const newArticle = await createArticle(title, text, tagIds, req.user.id);
    res.json({ article: newArticle });
  } catch (error) {
    next(error);
  }
}

async function putArticle(req, res, next) {
  try {
    const { id } = req.params;
    const { title, text, tagIds } = req.body;
    const article = await updateArticle(id, title, text, tagIds);
    res.json({ article });
  } catch (error) {
    next(error);
  }
}

async function deleteArticle(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = await deleteDbArticle(id);
    res.json({ deleted });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllArticles,
  getArticle,
  postComment,
  postArticle,
  putArticle,
  deleteArticle,
};
