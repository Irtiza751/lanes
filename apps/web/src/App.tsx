import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "./modules/auth";

const router = createBrowserRouter([
  {
    path: "",
    element: <div>Hello World</div>,
  },

  {
    path: "auth",
    // element: <AuthLayout />,
    Component: AuthLayout,
    children: [
      {
        path: "login",
        index: true,
        element: <div>Login Page</div>,
      }
    ]
  },
]);

export default () => {
  return <RouterProvider router={router} />;
};
