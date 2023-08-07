require("dotenv/config");

const cors = require("cors");
const morgan = require("morgan");
const express = require("express");

const mongooseConnect = require("./config/mongoose.js");

const { userRouter, dataRouter, scoreRouter } = require("./routes");

const PORT = process.env.SERVER_PORT || 3000;
const url = process.env.MONGODB_URI || "mongodb://localhost/internal-test";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("common"));

app.use("/data", dataRouter);
app.use("/user", userRouter);
app.use("/score", scoreRouter);

app.get("/*", (req, res) => {
  res.sendStatus(404);
});

mongooseConnect(url);

app.listen(PORT, (req, res) => {
  console.log(`server opened at http://localhost:${PORT}`);
});
