import { Header } from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { SidebarSmall } from "./SidebarSmall";
import { ThemeProvider } from "@/components/theme-provider";

const Layout = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6"></div>
            <div className="flex-1">
              <Sidebar />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <div className="md:hidden">
              <SidebarSmall />
            </div>
            <div className="w-full flex-1"></div>
            <Header />
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </ThemeProvider>

  );
};

export default Layout;
