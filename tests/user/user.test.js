const prisma = require("../../config/prisma");
const { publishArticle } = require("../../src/article/article-queries");
const { generateTokens } = require("../../src/user/auth/tokens");
const { createUser } = require("../../src/user/user-queries");
const { hashPassword } = require("../../src/user/user-utils");
const { request } = require("../config");
const { testUser, createTestArticle } = require("../utils");

describe("Non-article user routes", () => {
  let accessToken;
  let user;

  beforeAll(async () => {
    const userData = testUser();
    const hashedPassword = await hashPassword(userData.password);
    user = await createUser(userData.username, hashedPassword);
    const [token] = await generateTokens(user.id);
    accessToken = token;
  });

  afterAll(async () => {
    await prisma.refreshToken.deleteMany({});
    await prisma.user.deleteMany({});
  });

  test("User can update username", (done) => {    
    request
      .put(`/api/user/${user.id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .type("form")
      .send({ username: "newUsername" })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("updated");
        expect(body.updated.username).toEqual("newUsername")
        done();
      })
      .catch(done);
  });


});

describe("User Interaction with Article", () => {
  let article;
  let accessToken;
  let commentId;
  const userData = testUser();

  beforeAll(async () => {
    const hashedPassword = await hashPassword(userData.password);
    const user = await createUser(userData.username, hashedPassword);
    const [token] = await generateTokens(user.id);
    accessToken = token;
    const articleData = await createTestArticle(user.id);
    const published = await publishArticle(articleData.id);

    article = published;
  });

  afterAll(async () => {
    await prisma.tags.deleteMany({});
    await prisma.comment.deleteMany({});
    await prisma.article.deleteMany({});
    await prisma.refreshToken.deleteMany({});
    await prisma.user.deleteMany({});
  });

  test("User comment created successfully", (done) => {
    request
      .post(`/api/articles/${article.id}/comment`)
      .set("Authorization", `Bearer ${accessToken}`)
      .type("form")
      .send({ text: "test comment" })
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).toHaveProperty("comment.text", "test comment");
        commentId = res.body.comment.id;
        expect(200);
        done();
      })
      .catch(done);
  });

  test("offensive comment censored successfully", (done) => {
    request
      .post(`/api/articles/${article.id}/comment`)
      .set("Authorization", `Bearer ${accessToken}`)
      .type("form")
      .send({ text: "you turd!" })
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).toHaveProperty("comment.text", "you ****!");
        commentId = res.body.comment.id;
        expect(200);
        done();
      })
      .catch(done);
  });

  test("User can check and delete comments", (done) => {
    request
      .get("/api/user/comments")
      .set("Authorization", `Bearer ${accessToken}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("comments");
        expect(
          res.body.comments.some((comment) => comment.text === "test comment"),
        ).toBe(true);
      });

    request
      .delete(`/api/user/comments/${commentId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(() => {
        request
          .get("/api/user/comments")
          .set("Authorization", `Bearer ${accessToken}`)
          .then((res) => {
            expect(res.body).toHaveProperty("comments");
            expect(res.body.comments.length).toBe(1);
            done();
          });
      });
  });

  test("User can like, or un-like article", (done) => {
    request
      .put("/api/user/likes")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ id: article.id, like: true })
      .expect("Content-Type", /json/)
      .expect(200)
      .expect({ updated: true })
      .then(() => {
        request
          .get(`/api/articles/${article.id}`)
          .expect("Content-Type", /json/)
          .expect(200)
          .then(({ body }) => {
            expect(
              body.article.likes.some(
                (likedBy) => likedBy.username === userData.username,
              ),
            ).toBe(true);
            done();
          });
      });
  });
});
