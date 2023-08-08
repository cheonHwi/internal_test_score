require("dotenv/config");
require("./config/passport.config.js");

const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
// const cookieSession = require("cookie-session");

const mongooseConnect = require("./config/mongoose.config.js");

const { authRouter, dataRouter, scoreRouter } = require("./routes");

const { sessionRegenerate } = require("./middleware/utils.middleware.js");

const PORT = process.env.SERVER_PORT || 3000;
const url = process.env.MONGODB_URI || "mongodb://localhost/internal-test";

const app = express();

// app.use(
//   cookieSession({
//     name: "cookie-session-name",
//     keys: [process.env.COOKIE_ENCRYPTION_KEY],
//   })
// );
app.use(cookieParser("cookieSecret"));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: "sessionSecret",
  })
);

app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan("common"));
app.use(sessionRegenerate);

app.use("/auth", authRouter);
app.use("/data", dataRouter);
app.use("/score", scoreRouter);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/*", (req, res) => {
  res.sendStatus(404);
});

mongooseConnect(url);

app.listen(PORT, (req, res) => {
  console.log(`server opened at http://localhost:${PORT}`);
});
