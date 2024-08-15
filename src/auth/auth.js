const { passport } = require("../../config/passport");

/* Login authentaction */
function loginAuth(req, res, next) {
  passport.authenticate("login", (err, user, info) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ error: info.message || "Authentication failed" });
    }
    // if success, send tokens to client
    req.user = user;
    next();
  })(req, res, next);
}



/* JWT authorization */
function userAuth(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err || !user) {
      console.error(err);
      return res.status(401).json({ message: info.message });
    }

    req.user = user;
    next();
  })(req, res, next);
}

module.exports = { loginAuth, userAuth };
