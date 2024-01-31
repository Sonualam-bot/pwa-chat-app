import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = `98818708492-2q44vdovud5a07mvfrefq4jlud1274vc.apps.googleusercontent.com`;

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={clientId}>
    <BrowserRouter>
      <CssBaseline />
      <App />
    </BrowserRouter>
  </GoogleOAuthProvider>
);
