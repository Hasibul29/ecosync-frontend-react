import { DollarSign } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  );
}

const Dashboard = () => {
  return (
    <>
      <p>Main Body Content</p>
      <div className="w-64 mt-5">
        <div className="mt-5">
          <Component />
        </div>
        {/* 23.734965142073605, 90.41712656442267 */}
        {/* <iframe
          src="https://www.google.com/maps/embed?pb=!1m20!1m8!1m3!1d20570.125811014525!2d90.42256866702908!3d23.712072097294925!3m2!1i1024!2i768!4f13.1!4m9!3e6!4m3!3m2!1d23.7349444!2d90.4170254!4m3!3m2!1d23.705335046644926!2d90.52195741396255!5e0!3m2!1sen!2sbd!4v1714762410598!5m2!1sen!2sbd"
          width="600"
          height="450"
          loading="eager"
        ></iframe> */}
        {/* 23.5397482254434, 90.29361859906831 */}
      </div>
      {/* <iframe
        width="100%"
        height="500"
        src="https://maps.google.com/maps?q=[-36.623758386860175, 174.5020302019307]&output=embed"
      ></iframe> */}

        {/* <MyLocation /> */}
    </>
  );
};
export default Dashboard;