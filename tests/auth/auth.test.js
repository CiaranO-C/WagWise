const prisma = require("../../config/prisma");
const { request } = require("../config");
const { testUser } = require("../utils");

describe("User Authentication Flow", () => {
  const userData = testUser();

  afterAll(async () => {
    await prisma.refreshToken.deleteMany({});
    await prisma.user.deleteMany({});
  });

  test("sign up creates user", (done) => {
    request
      .post("/api/user/sign-up")
      .type("form")
      .send(userData)
      .expect("Content-Type", /json/)
      .expect({
        message: "user created succesfully",
        newUser: { username: userData.username },
      })
      .expect(200, done);
  });

  let accessToken;
  let refreshToken;

  test("log in with new user", (done) => {
    request
      .post("/api/user/log-in")
      .type("form")
      .send({ username: userData.username, password: userData.password })
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).toHaveProperty("jwt");
        expect(res.body).toHaveProperty("refreshToken");
        expect(res.body).toHaveProperty("user");
        expect(200);
        accessToken = res.body.jwt;
        refreshToken = res.body.refreshToken;
        done();
      })
      .catch(done);
  });

  test("new user has correct information", (done) => {
    request
      .get("/api/user")
      .set("Authorization", `Bearer ${accessToken}`)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).toHaveProperty("user.username", userData.username);
        expect(res.body).toHaveProperty("user.role", "USER");
        expect(200);
        done();
      })
      .catch(done);
  });

  test("user has valid refresh token after issuing", (done) => {
    request
      .get("/api/user/refresh-token")
      .set("refresh", refreshToken)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });

  test("sign up with name already in use rejects", (done) => {
    request
      .post("/api/user/sign-up")
      .type("form")
      .send(userData)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(({ body }) => {
        expect(body).toHaveProperty("errors");
        expect(body.errors[0].msg).toEqual(
          "Failed username check: Username already in use",
        );
        done();
      });
  });

  test("log in with incorrect password", (done) => {
    request
      .post("/api/user/log-in")
      .type("form")
      .send({ username: userData.username, password: "incorrectPassword1" })
      .expect("Content-Type", /json/)
      .expect({ error: "Incorrect password" })
      .expect(400, done);
  });

  test("log in non-existing user gets 400 response", (done) => {
    request
      .post("/api/user/log-in")
      .type("form")
      .send({ username: "noUser", password: "noUser1" })
      .expect("Content-Type", /json/)
      .expect({ error: "Username does not exist" })
      .expect(400, done);
  });
});