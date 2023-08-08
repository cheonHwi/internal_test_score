const express = require("express");
const passport = require("passport");

const Student = require("../model/student.model");
const { checkNotAuthenticated } = require("../middleware/passport.middleware");
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

authRouter.post("/login", checkNotAuthenticated, (req, res, next) => {
  passport.authenticate("local", (err, student, info) => {
    if (err) {
      return next(err);
    }

    if (!student) {
      return res.json({ msg: info });
    }

    req.logIn(student, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  })(req, res, next);
});

authRouter.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = authRouter;
