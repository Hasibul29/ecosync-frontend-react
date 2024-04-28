import { createBrowserRouter } from "react-router-dom";
import NotFoundError from "./pages/NotFoundError";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users/Users";
import Rbac from "./pages/Rbac/Rbac";
import RbacInfo from "./pages/Rbac/RoleInfo";
import ForgetPassword from "./pages/ForgetPassword";
import ForgetPasswordOtp from "./pages/ForgetPassword.otp";
import ForgetPasswordConfirm from "./pages/ForgetPasswordConfirm";

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
  { path: "/forgot-password", element: <ForgetPassword/> },
  { path: "/forgot-password/otp", element: <ForgetPasswordOtp/> },
  { path: "/forgot-password/confirm", element: <ForgetPasswordConfirm/> },
  { path: "/404", Component: NotFoundError },
  { path: "*", Component: NotFoundError },
]);

export default router;
