import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World</div>,
  },
  {
    path: "/about",
    element: <div>Hi, this is Muhammad Irtiza</div>
  }
]);

export default () => {
  return (
    <RouterProvider router={router} />
  )
}