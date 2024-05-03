import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

import { DollarSign } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function Component() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$45,231.89</div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      </CardContent>
    </Card>
  )
}

const Dashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <>
      <p>Main Body Content</p>
      <div className="w-64 mt-5">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border shadow"
        />
        <div className="mt-5">
          <Component/>
        </div>
        <div className="mt-5">
          <Component/>
        </div>
        <div className="mt-5">
          <Component/>
        </div>
        <div className="mt-5">
          <Component/>
        </div>
      </div>
    </>
  );
};
export default Dashboard;

