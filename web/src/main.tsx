import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Router from "./pages/Router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <GoogleOAuthProvider
    clientId={
      "1034288932963-1me3o7b3egvlc6msu68eguq63ablhqrv.apps.googleusercontent.com"
    }
  >
    <Router />
  </GoogleOAuthProvider>
);
