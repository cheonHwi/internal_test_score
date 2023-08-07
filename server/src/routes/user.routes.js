const express = require("express");

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("userRouter");
});

module.exports = userRouter;
