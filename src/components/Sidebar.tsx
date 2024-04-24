import { useState } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const [selected, setSelected] = useState("dashboard");
  const navigate = useNavigate();
  return (
    <div>
      <div className="bg-blue-300 h-40">IconAndTitle</div>
      <div className="px-2 py-2">
        <div className="space-y-1">
          <Button
            variant={selected == "dashboard" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => {
              setSelected("dashboard");
              navigate("/dashboard/home");
            }}
          >
            Dashboard
          </Button>
          <Button
            variant={selected == "users" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => {
              setSelected("users");
              navigate("/dashboard/user");
            }}
          >
            Users
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
