const prisma = require('../../config/prisma');

async function fetchAllArticles() {
  /* db query for all articles */
}

async function fetchArticleById(id) {
  /* db query for single article */
}

async function insertComment() {
  /* db query to insert new comment */
}

module.exports = { fetchAllArticles, fetchArticleById, insertComment };
