import App from "@/App";
import { Header } from "./Header";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-row">
      <div className="bg-green-300 w-64">
        <aside>Sidebar</aside>
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
