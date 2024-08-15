const service = require("./article-service");

async function getAllArticles(req, res, next) {
  /* logic - service.fetchAllArticles */
}

async function getArticle(req, res, next) {
  /* logic - service.fetchArticleById */
}

async function postComment(req, res, next) {
  /* logic - service.insertComment */
}

module.exports = { getAllArticles, getArticle, postComment };
