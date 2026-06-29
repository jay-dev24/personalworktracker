import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./styles/dashboard.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      pauseOnHover
      draggable
      theme="colored"
      className="custom-toast-container"
      toastClassName="custom-toast"
      bodyClassName="custom-toast-body"
    />
  </React.StrictMode>,
);
