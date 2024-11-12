import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import SignUp from "./components/Sign-up";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App/>,
//   },
//   {
//     path: "/add",
//     element: <App/>,
//   },
//   {
//     path: "/update",
//     element: <App/>,
//   },
//   {
//     path: "/logout",
//     element: <App/>,
//   },
//   {
//     path: "/profile",
//     element: <App/>,
//   },
//   {
//     path: "/sign-up",
//     element: <SignUp/>,
//   },
// ]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
