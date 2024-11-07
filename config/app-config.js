require("dotenv").config();
const express = require("express");
const { intialisePassport } = require("./passport");
const apiRouter = require("../src/apiRouter");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  "http://localhost:5174",
  "http://localhost:5173",
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
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


intialisePassport();


app.use("/api", apiRouter);

module.exports = app; 
