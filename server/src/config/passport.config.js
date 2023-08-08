const passport = require("passport");
const Student = require("../model/student.model");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((student, done) => {
  done(null, student.id);
});

passport.deserializeUser((id, done) => {
  Student.findById(id).then((student) => {
    done(null, student);
  });
});

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    (email, password, done) => {
      Student.findOne({ email: email.toLowerCase() })
        .then((student) => {
          if (!student)
            return done(null, false, { msg: `Email ${email} not found` });
          student.comparePassword(password, (err, isMatch) => {
            if (err) return done(err);
            if (isMatch) {
              return done(null, student);
            }
            return done(null, false, { msg: "Invalid email or password" });
          });
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);

// passport.use(
//   new LocalStrategy(
//     { usernameField: "email", passwordField: "password" },
//     (email, password, done) => {
//       Student.findOne({ email: email.toLowerCase() }, (err, student) => {
//         if (err) return done(err);
//         if (!student) {
//           return done(null, false, { msg: `Email ${email} not found` });
//         }

//         student.comparePassword(password, (err, isMatch) => {
//           if (err) return done(err);
//           if (isMatch) {
//             return done(null, student);
//           }
//           return done(null, false, { msg: "Invalid email or password" });
//         });
//       });
//     }
//   )
// );
