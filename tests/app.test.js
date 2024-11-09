const { request } = require("./config");

describe("test app level error handler", () => {
  test("Bad route should be passed to error middleware", (done) => {
    request
      .get("/badRoute")
      .expect(404)
      .expect({ error: "resource does not exist" }, done);
  });
});
