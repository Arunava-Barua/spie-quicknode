import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SpieProvider } from "./context/SpieContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SpieProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SpieProvider>
  </React.StrictMode>
);
