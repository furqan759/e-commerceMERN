import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import SignUp from "./components/Sign-up";
import { Login } from "./components/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import { AddProduct } from "./components/AddProduct";
import { Products } from "./components/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <Products />,
      },
      {
        path: "/add",
        element: <AddProduct />,
      },
      {
        path: "/update",
        element: <>update</>,
      },
      {
        path: "/logout",
        element: <>logout</>,
      },
      {
        path: "/profile",
        element: <>profile</>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
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
