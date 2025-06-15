import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "./modules/auth";
import BoardLayout from "./modules/board";
import Login from "./modules/auth/login";

const router = createBrowserRouter([
  {
    path: "",
    Component: BoardLayout,
    children: [
      {
        index: true,
        element: <div>Home Page</div>,        
      }
    ]
  },
  {
    path: "auth",
    // element: <AuthLayout />,
    Component: AuthLayout,
    children: [
      {
        path: "login",
        index: true,
        element: <Login />,
      }
    ]
  },
]);

export default () => {
  return <RouterProvider router={router} />;
};
