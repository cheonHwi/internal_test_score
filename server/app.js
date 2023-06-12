const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");
const cors = require("cors");

const app = express();

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173", // 허용할 도메인
    credentials: true, // 인증 정보(쿠키 등)를 전달하려면 true로 설정
  })
);

const {
  GOOGLE_TOKEN_URL,
  GOOGLE_USERINFO_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_LOGIN_REDIRECT_URI,
  GOOGLE_SIGNUP_REDIRECT_URI,
} = process.env;

const baseUrl = "https://accounts.google.com/o/oauth2/v2/auth";

app.get("/login", (req, res) => {
  let loginUrl = baseUrl;
  loginUrl += `?client_id=${GOOGLE_CLIENT_ID}`;
  loginUrl += `&redirect_uri=${GOOGLE_LOGIN_REDIRECT_URI}`;
  loginUrl += "&response_type=code";
  loginUrl += "&scope=email profile";
  res.redirect(loginUrl);
  //   res.status(200).json({ data: payLoad });
});

app.get("/login/redirect", (req, res) => {
  const { code } = req.query;
  console.log(`code: ${code}`);
  res.send("ok");
});

app.get("/signup", (req, res) => {
  let signupUrl = baseUrl;
  signupUrl += `?client_id=${GOOGLE_CLIENT_ID}`;
  signupUrl += `&redirect_uri=${GOOGLE_SIGNUP_REDIRECT_URI}`;
  signupUrl += "&response_type=code";
  signupUrl += "&scope=email profile";
  res.redirect(signupUrl);
});

app.get("/signup/redirect", async (req, res) => {
  const { access_token } = req.query;
  console.log(`code: ${code}`);
  try {
    // const resp = await axios.post(GOOGLE_TOKEN_URL, {
    //   code,
    //   client_id: GOOGLE_CLIENT_ID,
    //   client_secret: GOOGLE_CLIENT_SECRET,
    //   redirect_uri: GOOGLE_SIGNUP_REDIRECT_URI,
    //   grant_type: "authorization_code",
    // });

    const resp2 = await axios.get(GOOGLE_USERINFO_URL, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    res.json(resp2.data);
  } catch (error) {
    res.send(error.message);
  }
});

app.listen(3000, () => {
  console.log(`server is running at http://localhost:${3000}`);
});
