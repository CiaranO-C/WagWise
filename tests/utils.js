const prisma = require("../config/prisma");
const { createArticle } = require("../src/article/article-queries");
const { createTag } = require("../src/tag/tag-queries");
const { generateTokens } = require("../src/user/auth/tokens");
const { hashPassword } = require("../src/user/user-utils");

function getRandomSuffix(base) {
  return `${base}${Math.floor(Math.random() * 100000)}`;
}

function testUser() {
  const username = getRandomSuffix("testUser");
  return {
    username,
    password: "testPass1",
    confirmPassword: "testPass1",
  };
}

function testArticle() {
  const title = getRandomSuffix("Title");

  return {
    title,
    text: "<p>text</p>",
    tagNames: ["tag1", "tag2"],
  };
}

async function createTestUser(role = "USER") {
  const { username, password } = testUser();
  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      role,
    },
  });

  const [token] = await generateTokens(user.id);

  return { user, token };
}

async function createTestArticle(authorId) {
  const { title, text, tagNames } = testArticle();
  const article = await createArticle(title, text, tagNames, authorId);

  return article;
}

const testTags = ["tag1", "tag2"];

async function createTestTags() {
  await createTag(testTags[0]);
  await createTag(testTags[1]);
}

module.exports = {
  testUser,
  createTestUser,
  createTestArticle,
  createTestTags,
  testTags,
  testArticle,
};
