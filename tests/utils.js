const prisma = require("../config/prisma");
const { createArticle } = require("../src/article/article-queries");
const { generateTokens } = require("../src/user/auth/tokens");
const { hashPassword } = require("../src/user/user-utils");

function getRandomUsername() {
  return `testUser${Math.floor(Math.random() * 100000)}`;
}

function testUser() {
  const username = getRandomUsername();
  return {
    username,
    password: "testPass1",
    confirmPassword: "testPass1",
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
  const testArticle = {
    title: "Title",
    text: "<p>text</p>",
    tagNames: ["tag1", "tag2"],
  };

  const article = await createArticle(
    testArticle.title,
    testArticle.text,
    testArticle.tagNames,
    authorId,
  );

  return article;
}

module.exports = { testUser, createTestUser, createTestArticle };
