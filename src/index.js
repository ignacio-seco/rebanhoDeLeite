import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom"; // <== IMPORT
import  axios  from "axios";

const root = ReactDOM.createRoot(document.getElementById("root"));
axios.defaults.baseURL = 'https://ironrest.cyclic.app/cattleControl';

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
