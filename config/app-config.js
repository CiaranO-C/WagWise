require("dotenv").config();
const express = require("express");
const { intialisePassport } = require("./passport");
const apiRouter = require("../src/apiRouter");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  "https://wagwise-cms.vercel.app",
  "https://wagwise-blog.vercel.app",
];

app.set("trust proxy", true);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Invalid origin"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

intialisePassport();

app.use("/api", apiRouter);

//error handler
app.use((err, req, res, next) => {
  //log for debug
  console.error(err.stack);

  res.status(err.status || 500).json({
    error: {
      message: err.message || "Something went wrong!",
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    },
  });
});

//catch all 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: "resource does not exist" });
});

module.exports = app;
