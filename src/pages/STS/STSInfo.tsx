import BreadCrumb from "@/components/bread-crumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSTSStore } from "@/store";
import STSVehicle from "./STSVehicle/STSVehicles";
import STSManager from "./STSManager/STSManager";

const STSInfo = () => {
  const { sts } = useSTSStore();
  const breadcrumbItems = [
    { title: "Manage STS", link: "/dashboard/sts" },
    { title: "STS Info", link: "/dashboard/sts/stsInfo" },
  ];

  return (
    <>
      <BreadCrumb items={breadcrumbItems} />
      <div>
        <h1 className="text-lg font-semibold md:text-2xl">{sts.name}</h1>
        <p className="pt-2">
          STS ID <code className="px-1">{sts.id}</code>
        </p>
      </div>
      <Tabs defaultValue="vehicles">
        <TabsList>
          <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="vehicles">
          <STSVehicle />
        </TabsContent>
        <TabsContent value="users">
          <STSManager />
        </TabsContent>
      </Tabs>
    </>
  );
};
export default STSInfo;
