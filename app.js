require("dotenv").config();
const express = require("express");
const { intialisePassport } = require("./config/passport");
const apiRouter = require("./src/apiRouter");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

intialisePassport();

app.use("/api", apiRouter);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
