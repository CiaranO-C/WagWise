require("dotenv").config();
const express = require("express");
const { intialisePassport } = require("./config/passport");
const apiRouter = require("./src/apiRouter");
const cookieParser = require("cookie-parser");
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

intialisePassport();

app.use("/api", apiRouter);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
