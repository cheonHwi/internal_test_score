const mongoose = require("mongoose");

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
    unique: true,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
