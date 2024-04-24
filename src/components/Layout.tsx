import { Header } from "./Header";
import Sidebar from "./Sidebar";
import useAuth from "@/hooks/useAuth";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { data, isLoading, isError, error } = useAuth();

  if (isLoading) return <p>Loading...</p>;

  if (isError) {
    return <p>{error.message}</p>;
  }

  if (!data?.success) {
    return <p>WOW</p>;
  }

  return (
    <div className="min-h-screen flex flex-row">
      <div className="w-56 border-r">
        <aside>
          <Sidebar />
        </aside>
      </div>
      <div className="flex-1">
        <header className="py-3 pr-5 flex justify-end border-b">
          <Header />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
