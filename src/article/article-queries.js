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

module.exports = { getArticles, getArticleById, insertComment };
