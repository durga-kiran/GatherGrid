<<<<<<< HEAD
=======

>>>>>>> dd602eb0851def5026d21d11e319dabab70c0ae4
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

<<<<<<< HEAD
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";
=======
import App from "./App.jsx";
import "./index.css";

import "react-toastify/dist/ReactToastify.css";
>>>>>>> dd602eb0851def5026d21d11e319dabab70c0ae4

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
<<<<<<< HEAD
      <AuthProvider>
        <App />
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
=======
      <App />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  </React.StrictMode>
);
>>>>>>> dd602eb0851def5026d21d11e319dabab70c0ae4
