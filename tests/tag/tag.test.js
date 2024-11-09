const prisma = require("../../config/prisma");
const { request } = require("../config");
const { createTestTags, testTags, createTestUser } = require("../utils");

describe("Retrieve tag endpoints", () => {
  beforeAll(async () => {
    await createTestTags();
  });

  afterAll(async () => {
    await prisma.tags.deleteMany({});
    await prisma.refreshToken.deleteMany({});
    await prisma.user.deleteMany({});
  });
  test("User can get list of all tags", (done) => {
    request
      .get("/api/tags")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body.tags.length).toBe(2);
        expect(
          body.tags.some((tag) => tag.tagName === testTags[0]),
        ).toBeTruthy();
        expect(
          body.tags.some((tag) => tag.tagName === testTags[1]),
        ).toBeTruthy();
        done();
      });
  });

  test("User can get individual tags", (done) => {
    request
      .get(`/api/tags/${testTags[0]}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .expect({ tag: { tagName: testTags[0], articles: [] } }, done);
  });
});

describe("Admin CRUD operations on tags", () => {
  let accessToken;
  beforeAll(async () => {
    const { user: adminData, token: adminToken } =
      await createTestUser("ADMIN");
    accessToken = adminToken;
  });

  afterAll(async () => {
    await prisma.refreshToken.deleteMany({});
    await prisma.user.deleteMany({});
  });

  beforeEach(async () => {
    await createTestTags();
  });

  afterEach(async () => {
    await prisma.tags.deleteMany({});
  });

  test("Admin can create tags", (done) => {
    request
      .post("/api/tags")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ tagName: "tag3" })
      .expect("Content-Type", /json/)
      .expect({ newTag: { tagName: "tag3" } })
      .expect(200, done);
  });

  test("Admin can update tags", (done) => {
    request
      .put(`/api/tags/${testTags[0]}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ newName: "tagUpdate" })
      .expect("Content-Type", /json/)
      .expect({ previous: testTags[0], updated: { tagName: "tagUpdate" } })
      .expect(200, done);
  });

  test("Admin can delete tags", (done) => {
    request
      .delete(`/api/tags/${testTags[0]}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect("Content-Type", /json/)
      .expect({ deleted: { tagName: testTags[0] } })
      .expect(200, done);
  });
});
