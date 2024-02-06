import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { AccountProvider } from "./context/AccountProvider.jsx";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={clientId}>
    <BrowserRouter>
      <AccountProvider>
        <CssBaseline />
        <App />
      </AccountProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
