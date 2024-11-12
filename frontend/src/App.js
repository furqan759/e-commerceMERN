import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import SignUp from "./components/Sign-up";
import { Layout } from "./components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <>products</>,
      },
      {
        path: "/add",
        element: <>add</>,
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
    path: "/sign-up",
    element: <SignUp />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
