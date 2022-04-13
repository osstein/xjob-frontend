import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "lightgallery.js/dist/css/lightgallery.css";
import { LightgalleryProvider } from "react-lightgallery";

ReactDOM.render(
  <React.StrictMode>
    <LightgalleryProvider
      lightgallerySettings={
        {
          // settings: https://sachinchoolur.github.io/lightgallery.js/docs/api.html
        }
      }
      galleryClassName="my_custom_classname"
    >
      <App />
    </LightgalleryProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
