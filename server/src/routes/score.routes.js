const express = require("express");

const scoreRouter = express.Router();

scoreRouter.get("/", (req, res) => {
  res.send("scoreRouter");
});

module.exports = scoreRouter;
