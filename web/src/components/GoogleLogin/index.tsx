import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router";
import { GoogleLogin } from "@react-oauth/google";
import { ToastContainer, toast } from "react-toastify";

import { credential, userData } from "./types";

import "react-toastify/dist/ReactToastify.css";

const GoogleAuthLogin = () => {
  const navigate = useNavigate();

  return (
    <>
      <GoogleLogin
        onSuccess={({ credential }: credential) => {
          if (!credential) return;
          const userInfo: userData = jwtDecode(credential);

          if (userInfo.email.includes("sdh")) {
            toast.success(`${userInfo.name} 학생 반갑습니다.`);
            setTimeout(() => {
              navigate("/newPage", { state: { userInfo: userInfo } });
            }, 2000);
          } else {
            toast.error("디지텍고 학생이 아닙니다.");
          }
        }}
        onError={() => {
          toast.error("무언가 문제가 발생했습니다.");
        }}
        width="300px"
      />
      <ToastContainer
        position="top-center"
        autoClose={800}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
};

export default GoogleAuthLogin;
