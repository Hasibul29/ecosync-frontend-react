import { createBrowserRouter } from "react-router-dom";
import NotFoundError from "./pages/NotFoundError";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users/Users";

const router = createBrowserRouter([
  // Auth routes
  {
    path: "/",
    lazy: async () => ({
      Component: (await import("./pages/Login")).default,
    }),
  },
  {
    path: "/",
    lazy: async () => ({
      Component: (await import("./components/Layout")).default,
    }),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/users",
        element: <Users />,
      },
    ],
  },

  { path: "/404", Component: NotFoundError },
  { path: "*", Component: NotFoundError },
]);

export default router;
