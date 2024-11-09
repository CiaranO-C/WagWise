const { body } = require("express-validator");
const { checkUsername } = require("./user-queries");

// login username input
const validateUsername = body("username")
  .notEmpty()
  .withMessage("Username cannot be empty")
  .trim()
  .isLength({ min: 3, max: 15 })
  .withMessage("Username must be between 3-15 characters")
  .isAlphanumeric()
  .withMessage("Username can only contain letters and numbers")
  .escape();

// sign-up or update username input
const validateNewUsername = [
  validateUsername,
  body("username").custom(async (username) => {
    try {        
      const userExists = await checkUsername(username);
      if (userExists) {
        throw new Error("Username already in use");
      }
      return true;
    } catch (error) {
      throw new Error(`Failed username check: ${error.message}`);
    }
  }),
];

// login password input
const validatePassword = body("password")
  .notEmpty()
  .withMessage("Password cannot be empty");

// sign-up or update password input
const validateNewPassword = [
  validatePassword,
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long.")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number."),
  body("confirmPassword").custom((confirmPass, { req }) => { 
    
    if (confirmPass !== req.body.password) {
      throw new Error("Confirm password must match Password");
    }
    return true;
  }),
];

module.exports = {
  validateUsername,
  validateNewUsername,
  validatePassword,
  validateNewPassword,
};
