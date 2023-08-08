const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 5,
  },
  googleId: {
    type: String,
    // unique: true,
  },
});

const saltRounds = 10;

studentSchema.pre("save", function (next) {
  let student = this;
  if (student.isModified("password")) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(student.password, salt, (err, hash) => {
        if (err) return next(err);
        student.password = hash;
        next();
      });
    });
  }
});

studentSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
