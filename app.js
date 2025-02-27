require("dotenv").config();
require("express-async-errors");

const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

const authenticateUser = require("./middleware/authentication");

const authRouter = require("./routes/auth");
const characterRouter = require("./routes/character");
const journalRouter = require("./routes/journal");

const notFoundMiddleware = require("./middleware/notfound");
const errorHandleMiddleware = require("./middleware/errorhandler");

app.use(express.static("public"));
app.use(express.json());

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.use(helmet());
app.use(cors());
app.use(xss());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/character", authenticateUser, characterRouter);
app.use("/api/v1/journal", authenticateUser, journalRouter);

app.use(notFoundMiddleware);
app.use(errorHandleMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}.`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
