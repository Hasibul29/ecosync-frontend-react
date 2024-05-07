import { createBrowserRouter } from "react-router-dom";
import NotFoundError from "./pages/NotFoundError";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users/Users";
import RbacInfo from "./pages/Rbac/RoleInfo";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import ForgetPasswordOtp from "./pages/ForgetPassword/ForgetPasswordOtp";
import ForgetPasswordConfirm from "./pages/ForgetPassword/ForgetPasswordConfirm";
import STS from "./pages/STS/STS";
import Vehicle from "./pages/Vehicle/Vehicle";
import Role from "./pages/Rbac/Role";
import STSInfo from "./pages/STS/STSInfo";
import Landfill from "./pages/Landfill/Landfill";
import STSEntry from "./pages/STSEntry/STSEntry";
import LandfillInfo from "./pages/Landfill/LandfillInfo";
import Profile from "./pages/Profile/Profile";
import LandfillEntry from "./pages/LandfillEntry/LandfiillEntry";
import STSVehicleSelection from "./pages/STSVehicleSelection/Vehicle";
import Billing from "./pages/Billing/Billing";

const router = createBrowserRouter([
  // Auth routes
  {
    path: "/landing",
    lazy: async () => ({
      Component: (await import("./pages/landingPage/landing")).default,
    }),
  },
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
        path: "dashboard/role",
        element: <Role />,
      },
      {
        path: "dashboard/role/roleInfo",
        element: <RbacInfo />,
      },
      {
        path: "dashboard/sts",
        element: <STS />,
      },
      {
        path: "dashboard/sts/stsInfo",
        element: <STSInfo />,
      },
      {
        path: "dashboard/vehicles",
        element: <Vehicle />,
      },
      {
        path: "dashboard/landfill",
        element: <Landfill/>,
      },
      {
        path: "dashboard/stsentry",
        element: <STSEntry />,
      },
      {
        path: "dashboard/landfill/landfillInfo",
        element: <LandfillInfo/>,
      },
      {
        path: "dashboard/landfillentry",
        element: <LandfillEntry />,
      },
      {
        path: "dashboard/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard/sts/vehicle",
        element: <STSVehicleSelection />,
      },
      {
        path: "/dashboard/billing",
        element: <Billing />,
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
