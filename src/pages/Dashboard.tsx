import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

const Dashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <>
      <p>Main Body Content</p>
      <div  className="w-64 ">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border shadow"
        />
      </div>
    </>
  );
};
export default Dashboard;
