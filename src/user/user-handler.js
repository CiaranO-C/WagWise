const { validationResult } = require("express-validator");
const { createNewUser } = require("./user-service");

const createUserHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res
        .status(400)
        .json({ errors: err.array({ onlyFirstError: true }) });
    }
    const newUser = await createNewUser(username, password);

    return res.json({ message: "user created succesfully", newUser });
  } catch (error) {
    next(error);
  }
};

module.exports = { createUserHandler };
