import { useGoogleLogin } from "@react-oauth/google";
import GoogleAuthLogin from "../../components/GoogleLogin";
import styled from "styled-components";

export const Login = () => {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse.code),
    flow: "auth-code",
  });

  return (
    <div>
      login 페이지 입니다. <GoogleAuthLogin />
      <MyCustomButton onClick={login}>Sign in with Google 🚀</MyCustomButton>
    </div>
  );
};

const MyCustomButton = styled.button``;
