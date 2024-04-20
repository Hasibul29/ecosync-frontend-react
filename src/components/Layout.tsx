import App from "@/App";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-row">
      <div className="bg-green-300 w-64">
        <aside>Sidebar</aside>
      </div>
      <div className="bg-slate-600 flex-1">
        <header className="bg-red-300 h-10">Header</header>
        <main>
          <App />
        </main>
      </div>
    </div>
  );
};

export default Layout;
