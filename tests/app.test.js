const request = require("supertest");
const express = require("express");
const app = require("../config/app-config");

Test("index route works", (done) => {
  request(app)
    .get("/api/articles")
    .expect("Content-Type", /json/)
    .expect(200, done);
});
