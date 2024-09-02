const { profanityCheck, profanityReplace } = require("../../config/obscenity");
const {
  getArticles,
  getArticleById,
  insertComment,
  createArticle,
  updateArticle,
  deleteDbArticle,
  getUnpublished,
  publishArticle,
  unpublishArticle,
  searchArticles,
} = require("./article-queries");

async function getAllArticles(req, res, next) {
  const sort = req.query.sort || "created";
  const order = req.query.order || "desc";
  const limit = Number(req.query.limit) || 100;
  try {
    const articles = await getArticles(sort, order, limit);
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
    const articleId = Number(req.params.id);
    const authorId = req.user.id;
    let { text } = req.body;
    const isBad = profanityCheck(text);
    if (isBad) text = profanityReplace(text);
    const newComment = await insertComment(articleId, authorId, text, isBad);
    res.json({ comment: newComment });
  } catch (error) {
    next(error);
  }
}

async function postArticle(req, res, next) {
  try {
    const { title, text, tagNames } = req.body;
    console.log(req.body);

    const newArticle = await createArticle(title, text, tagNames, req.user.id);
    res.json({ article: newArticle });
  } catch (error) {
    next(error);
  }
}

async function putArticle(req, res, next) {
  try {
    const id = Number(req.params.id);
    const { title, text, tagNames } = req.body;
    const article = await updateArticle(id, title, text, tagNames);
    res.json({ article });
  } catch (error) {
    next(error);
  }
}

async function deleteArticle(req, res, next) {
  try {
    const id = Number(req.params.id);
    const deleted = await deleteDbArticle(id);
    res.json({ deleted });
  } catch (error) {
    next(error);
  }
}

async function getUnpublishedArticles(req, res, next) {
  try {
    const sort = req.query.sort || "created";
    const order = req.query.order || "desc";
    const limit = Number(req.query.limit) || 100;

    const articles = await getUnpublished(sort, order, limit);
    if (!articles) {
      return res.status(200).json({
        message: "No unpublished articles found",
      });
    }
    return res.status(200).json({ articles });
  } catch (error) {
    next(error);
  }
}

async function postPublish(req, res, next) {
  try {
    const id = Number(req.params.id);
    const published = await publishArticle(id);
    if (!published) {
      return res.status(200).json({ message: "Unable to publish article" });
    }
    return res.status(200).json({ published });
  } catch (error) {
    next(error);
  }
}

async function postUnpublish(req, res, next) {
  try {
    const id = Number(req.params.id);
    const unpublished = await unpublishArticle(id);
    if (!unpublished) {
      return res.status(200).json({ message: "Unable to unpublish article" });
    }
    return res.status(200).json({ unpublished });
  } catch (error) {
    next(error);
  }
}

async function getSearchArticles(req, res, next) {
  try {
    //if search has mulptiple words format for prisma query
    const searchQuery = req.query.query.split(" ").join(" | ");
    const articles = await searchArticles(searchQuery);

    res.json({ articles });
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
  getUnpublishedArticles,
  postPublish,
  postUnpublish,
  getSearchArticles,
};
