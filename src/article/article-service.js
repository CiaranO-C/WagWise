const prisma = require("../../config/prisma");

async function fetchAllArticles() {
  /* db query for all articles */
  try {
    const articles = await prisma.article.findMany();
  } catch (error) {
    
  }
}

async function fetchArticleById(id) {
  /* db query for single article */
  try {
    const article = await prisma.article.findUnique({ where: { id: id } });
  } catch (error) {
    
  }
}

async function insertComment(articleId, comment) {
  /* db query to insert new comment */
  try {
    const { authorId, text } = comment;
    const newComment = await prisma.comment.create({
      data: { articleId, authorId, text },
    });
  } catch (error) {
    
  }

}

module.exports = { fetchAllArticles, fetchArticleById, insertComment };
