const prisma = require("../../config/prisma");
const { createArticle } = require("../../src/article/article-queries");
const { generateTokens } = require("../../src/user/auth/tokens");
const { createUser } = require("../../src/user/user-queries");
const { hashPassword } = require("../../src/user/user-utils");
const { request } = require("../config");
const { testUser, testArticle } = require("../utils");

describe("User Interaction with Article", () => {
  let article;
  let accessToken;
  let commentId;
  const userData = testUser();

  beforeAll(async () => {
    const hashedPassword = await hashPassword(userData.password);
    const user = await createUser(userData.username, hashedPassword);
    [token] = await generateTokens(user.id);
    accessToken = token;

    article = await createArticle(
      testArticle.title,
      testArticle.text,
      testArticle.tagNames,
      user.id,
    );
  });

  afterAll(async () => {
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
            expect(res.body.comments.length).toBe(0);
            done();
          });
      });
  });
});
