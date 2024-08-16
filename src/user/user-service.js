const { createUser } = require("./user-queries");
const { hashPassword } = require("./user-utils");

async function createNewUser(username, password) {
  try {
    // Hash password input
    const hashedPassword = await hashPassword(password);

    // Create new user in DB
    const newUser = await createUser(username, hashedPassword);
    return newUser;
  } catch (error) {
    throw new Error("Failed to create new user. Please try again.");
  }
}

module.exports = { createNewUser };
