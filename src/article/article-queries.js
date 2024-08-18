const prisma = require("../../config/prisma");

async function getArticles(sort, order) {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { [sort]: order },
    });

    return articles;
  } catch (error) {
    throw new Error("Error retrieving articles");
  }
}

async function getArticleById(id) {
  try {
    const article = await prisma.article.findUnique({ where: { id: id } });

    return article;
  } catch (error) {
    throw new Error(`Error retrieving article: ${id}`);
  }
}

async function createArticle(title, text, tagIds, userId) {
  try {
    const article = await prisma.article.create({
      data: {
        title: title,
        body: text,
        tags: tagIds,
        authorId: userId,
      },
    });
    return article;
  } catch (error) {
    throw new Error("Error creating article");
  }
}

async function updateArticle(articleId, title, text, tagIds) {
  try {
    const updated = await prisma.article.update({
      where: {
        id: articleId,
      },
      data: {
        title: title,
        body: text,
        tags: tagIds,
      },
    });
    return updated;
  } catch (error) {
    throw new Error("Error updating article");
  }
}

async function insertComment(articleId, authorId, text) {
  try {
    const newComment = await prisma.comment.create({
      data: { articleId, authorId, text },
    });

    return newComment;
  } catch (error) {
    throw new Error("Error inserting comment");
  }
}

async function deleteDbArticle(id) {
  try {
    const deleted = await prisma.article.delete({
      where: {
        id: id,
      },
    });

    return deleted;
  } catch (error) {
    throw new Error("Error deleting article");
  }
}

module.exports = {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  insertComment,
  deleteDbArticle
};
