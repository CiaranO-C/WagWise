const prisma = require("../../config/prisma");
const { publishArticle } = require("../../src/article/article-queries");
const { createTag } = require("../../src/tag/tag-queries");
const { request } = require("../config");
const {
  createTestArticle,
  createTestUser,
  testArticle,
  testTags,
} = require("../utils");

describe("Public Article Endpoints", () => {
  const articles = [];
  beforeAll(async () => {
    const { user: author } = await createTestUser("ADMIN");
    const articleOne = await createTestArticle(author.id);
    const articleTwo = await createTestArticle(author.id);
    const articleThree = await createTestArticle(author.id);
    await publishArticle(articleOne.id);
    articles.push(articleOne, articleTwo, articleThree);
  });

  afterAll(async () => {
    await prisma.tags.deleteMany({});
    await prisma.article.deleteMany({});
    await prisma.refreshToken.deleteMany({});
    await prisma.user.deleteMany({});
  });

  test("Users can only get published articles", (done) => {
    request
      .get("/api/articles")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("articles");
        expect(body.articles.length).toEqual(1);
        expect(body.articles[0].id).toEqual(articles[0].id);
        done();
      });
  });

  test("Users can get individual articles", (done) => {
    request
      .get(`/api/articles/${articles[0].id}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body.article.id).toEqual(articles[0].id);
        done();
      });
  });

  test("Users can search for articles", (done) => {
    request
      .get("/api/articles/search")
      .query({ query: articles[0].title })
      .expect(200)
      .expect("Content-Type", /json/)
      .then(({ body }) => {
        expect(body).toHaveProperty("articles");
        expect(body.articles[0].id).toEqual(articles[0].id);
        done();
      });
  });
});

describe("Admin article endpoints", () => {
  let admin;
  let accessToken;
  let article;

  beforeAll(async () => {
    const { user, token } = await createTestUser("ADMIN");
    admin = user;
    accessToken = token;
  });

  afterAll(async () => {
    await prisma.refreshToken.deleteMany({});
    await prisma.user.deleteMany({});
  });

  beforeEach(async () => {
    const articleData = await createTestArticle(admin.id);
    article = articleData;
  });

  afterEach(async () => {
    await prisma.tags.deleteMany({});
    await prisma.article.deleteMany({});
  });

  test("Admin can post new article", (done) => {
    const newArticle = testArticle();
    request
      .post("/api/articles")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(newArticle)
      .expect(200)
      .expect("Content-Type", /json/)
      .then(({ body }) => {
        expect(body).toHaveProperty("article");
        expect(body.article.title).toEqual(newArticle.title);
        expect(body.article.body).toEqual(newArticle.text);
        done();
      });
  });

  test("Admin can publish article", (done) => {
    request
      .post(`/api/articles/${article.id}/publish`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("published");
        expect(body.published.id).toEqual(article.id);
        expect(body.published.published).toBeTruthy();
        done();
      });
  });

  test("Admin can unpublish article", (done) => {
    publishArticle(article.id).then(() => {
      request
        .post(`/api/articles/${article.id}/unpublish`)
        .set("Authorization", `Bearer ${accessToken}`)
        .expect("Content-Type", /json/)
        .expect(200)
        .then(({ body }) => {
          expect(body).toHaveProperty("unpublished");
          expect(body.unpublished.id).toEqual(article.id);
          expect(body.unpublished.published).toBeFalsy();
          done();
        });
    });
  });

  test("Admin can get unpublished articles", (done) => {
    request
      .get(`/api/articles/admin/unpublished`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("articles");
        expect(body.articles.length).toEqual(1);
        expect(body.articles[0].published).toBeFalsy();
        done();
      });
  });

  test("Admin can edit article", (done) => {
    request
      .put(`/api/articles/${article.id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        title: "updatedTitle",
        text: "updatedText",
        tagNames: testTags,
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("article");
        expect(body.article.title).toEqual("updatedTitle");
        expect(body.article.body).toEqual("updatedText");
        done();
      });
  });

  test("Admin can delete article", (done) => {
    request
      .delete(`/api/articles/${article.id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("deleted");
        expect(body.deleted.id).toEqual(article.id);
        done();
      });
  });
});
