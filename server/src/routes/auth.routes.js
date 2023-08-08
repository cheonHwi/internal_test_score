const express = require("express");

const Student = require("../model/student.model");
// const localAuth = require("../middleware/passport");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const student = new Student(req.body);
  try {
    await student.save();
    return res.status(201).json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = authRouter;
