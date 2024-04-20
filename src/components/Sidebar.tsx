import { Button } from "./ui/button";

const SideBar = () => {
  return (
    <div>
      <div className="bg-blue-300 h-40">IconAndTitle</div>
      <div className="px-2 py-2">
        <div className="space-y-1">
          <Button variant="secondary" className="w-full justify-start">
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Users
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
