import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import SignUp from "./components/Sign-up";
import { Layout } from "./components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
  },
  {
    path: "/add",
    element: <Layout />,
  },
  {
    path: "/update",
    element: <Layout />,
  },
  {
    path: "/logout",
    element: <Layout />,
  },
  {
    path: "/profile",
    element: <Layout />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
