import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import SignUp from "./components/Sign-up";
import { Login } from "./components/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import { AddProduct } from "./components/AddProduct";
import { Products } from "./components/Products";
import { UpdateProduct } from "./components/UpdateProduct";

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
        path: "/edit-product/:id",
        element: <UpdateProduct />,
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
