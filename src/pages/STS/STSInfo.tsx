import BreadCrumb from "@/components/bread-crumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSTSStore } from "@/store";
import STSVehicle from "./STSVehicles";

const STSInfo = () => {
  const {sts} = useSTSStore();
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
      <Tabs defaultValue="setting">
        <TabsList>
          <TabsTrigger value="setting">Settings</TabsTrigger>
          <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="setting">
          {/* <RoleUpdate/> */}
        </TabsContent>
        <TabsContent value="vehicles">
            <STSVehicle/>
            </TabsContent>
        <TabsContent value="users">NEW</TabsContent>
      </Tabs>
    </>
  );
};
export default STSInfo;
