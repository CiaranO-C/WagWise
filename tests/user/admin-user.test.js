const prisma = require("../../config/prisma");
const { insertComment } = require("../../src/article/article-queries");
const { request } = require("../config");
const { createTestUser, createTestArticle } = require("../utils");

describe("Admin routes for users and comments", () => {
  let accessToken;
  let admin;
  let user;
  let commentId;

  beforeAll(async () => {
    const { user: adminData, token: adminToken } =
      await createTestUser("ADMIN");
    accessToken = adminToken;
    admin = adminData;
    const { user: userData } = await createTestUser();
    user = userData;
    const article = await createTestArticle(admin.id);
    const comment = await insertComment(
      article.id,
      admin.id,
      "test comment",
      false,
    );
    commentId = comment.id;
  });

  afterAll(async () => {
    await prisma.tags.deleteMany({});
    await prisma.comment.deleteMany({});
    await prisma.article.deleteMany({});
    await prisma.refreshToken.deleteMany({});
    await prisma.user.deleteMany({});
  });

  test("Admin can retrieve list of all users", (done) => {
    request
      .get("/api/user/admin/users")
      .set("Authorization", `Bearer ${accessToken}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("users");
        expect(body.users.some((u) => u.id === user.id)).toBeTruthy();
        done();
      });
  });

  test("Admin can retrieve list of all comments", (done) => {
    request
      .get("/api/user/admin/comments")
      .set("Authorization", `Bearer ${accessToken}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("comments");
        expect(
          body.comments.some((comment) => comment.text === "test comment"),
        ).toBeTruthy();
        done();
      });
  });

  test("Admin can delete user comments", (done) => {
    request
      .delete(`/api/user/admin/comments/${commentId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("deleted.id", commentId);
        done();
      });
  });
});
