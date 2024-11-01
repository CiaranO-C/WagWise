const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcryptjs");
const prisma = require("./prisma");

function intialisePassport() {
  passport.use(
    new JwtStrategy(
      {
        // Extract the JWT from Authorization header as a Bearer token
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        // Verify JWT using the public key
        secretOrKey: process.env.JWT_PRIVATE_KEY,
      },
      async (payload, done) => {
        try {
          // if JWT valid find user in db
          const user = await prisma.user.findUnique({
            where: { id: payload.userId },
          });

          if (user) {
            // user found
            return done(null, user);
          } else {
            // payload contains invalid user id
            return done(null, false, { message: "Token has invalid user ID" });
          }
        } catch (error) {
          // if error log and return error
          console.error(error);
          return done(error, false, { message: "Error during authentication" });
        }
      },
    ),
  );

  passport.use(
    "login",
    new LocalStrategy(async (username, password, done) => {
      try {
        // check for username in database
        const user = await prisma.user.findUnique({
          where: { username: username },
          include: {
            likes: true,
            comments: true,
          },
        });

        if (!user) {
          return done(null, false, { message: "Username does not exist" });
        }
        // User exists so check for matching password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return done(null, false, { message: "Incorrect password" });
        }

        // Correct details entered, return user
        return done(null, user);
      } catch (error) {
        console.error(error);
        done(error);
      }
    }),
  );
}

module.exports = { passport, intialisePassport };
