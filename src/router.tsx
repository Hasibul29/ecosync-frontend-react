import { createBrowserRouter } from "react-router-dom";
import NotFoundError from "./pages/NotFoundError";

const router = createBrowserRouter([
  // Auth routes
  {
    path: "/",
    lazy: async () => ({
      Component: (await import("./pages/Login")).default,
    }),
  },
  {
    path: "/dashboard",
    lazy: async () => ({
      Component: (await import("./components/Layout")).default,
    }),
  },
  { path: "/404", Component: NotFoundError },
  { path: "*", Component: NotFoundError },
]);

export default router;
