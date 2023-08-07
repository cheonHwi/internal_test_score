const express = require("express");

const dataRouter = express.Router();

dataRouter.get("/", (req, res) => {
  res.send("dataRouter");
});

module.exports = dataRouter;
