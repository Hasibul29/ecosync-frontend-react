import { createBrowserRouter } from "react-router-dom";
import NotFoundError from "./pages/NotFoundError";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users/Users";
import Rbac from "./pages/Rbac/Rbac";
import RbacInfo from "./pages/Rbac/RoleInfo";

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
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "dashboard/users",
        element: <Users />,
      },
      {
        path: "dashboard/rbac",
        element: <Rbac />,
      },
      {
        path: "dashboard/rbac/roles",
        element: <RbacInfo />,
      },
    ],
  },
  { path: "/404", Component: NotFoundError },
  { path: "*", Component: NotFoundError },
]);

export default router;
