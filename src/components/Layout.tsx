import App from "@/App";
import { Header } from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
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
          <App />
        </main>
      </div>
    </div>
  );
};

export default Layout;
