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

const testArticle = {
  title: "Title",
  text: "<p>text</p>",
  tagNames: ["tag1", "tag2"],
};

module.exports = { testUser, testArticle };
