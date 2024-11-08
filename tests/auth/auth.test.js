const prisma = require("../../config/prisma");
const { request } = require("../config");

afterAll(async () => {
  await prisma.refreshToken.deleteMany({});
  await prisma.user.deleteMany({});
});

const testUser = {
  username: "testUser2",
  password: "testPass1",
  confirmPassword: "testPass1",
};

test("sign up creates user", (done) => {
  request
    .post("/api/user/sign-up")
    .type("form")
    .send(testUser)
    .expect("Content-Type", /json/)
    .expect({
      message: "user created succesfully",
      newUser: { username: testUser.username },
    })
    .expect(200, done);
});

let accessToken;
let refreshToken;

test("log in with new user", (done) => {
  request
    .post("/api/user/log-in")
    .type("form")
    .send({ username: testUser.username, password: testUser.password })
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
      expect(res.body).toHaveProperty("user.username", testUser.username);
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
