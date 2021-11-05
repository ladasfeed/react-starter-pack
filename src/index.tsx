import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MediaContextProvider } from "services/Media";

ReactDOM.render(
  <React.StrictMode>
    <MediaContextProvider>
      <App />
    </MediaContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
