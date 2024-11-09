let request = require("supertest");
const app = require("../config/app-config");
request = request(app);

module.exports = { request }