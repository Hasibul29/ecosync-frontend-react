import BreadCrumb from "@/components/bread-crumb";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useLandfillStore } from "@/store";
import LandfillManager from "./LandfillManager/LandfillManager";

const LandfillInfo = () => {
  const { landfill } = useLandfillStore();
  const breadcrumbItems = [
    { title: "Manage Landfill", link: "/dashboard/landfill" },
    { title: "Landfill Info", link: "/dashboard/landfill/landfillInfo" },
  ];

  return (
    <>
      <BreadCrumb items={breadcrumbItems} />
      <div>
        <h1 className="text-lg font-semibold md:text-2xl">{landfill.name}</h1>
        <p className="pt-2">
          Landfill ID <code className="px-1">{landfill.id}</code>
        </p>
      </div>
      <Tabs defaultValue="users">
        {/* <TabsList>
          <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList> */}
        <TabsContent value="users">
          <LandfillManager />
        </TabsContent>
      </Tabs>
    </>
  );
};
export default LandfillInfo;
