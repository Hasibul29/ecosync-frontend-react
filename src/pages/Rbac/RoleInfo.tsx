import BreadCrumb from "@/components/bread-crumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoleUpdate from "./RoleUpdate";
import RolePermissions from "./Permission/RolePermissions";
import { useRoleStore } from "@/store";

const RoleInfo = () => {
  const {role} = useRoleStore();
  const breadcrumbItems = [
    { title: "Role", link: "/dashboard/role" },
    { title: "Role Info", link: "/dashboard/role/roleInfo" },
  ];

  return (
    <>
      <BreadCrumb items={breadcrumbItems} />
      <div>
        <h1 className="text-lg font-semibold md:text-2xl">{role.name}</h1>
        <p className="pt-2">
          Role ID <code className="px-1">{role.id}</code>
        </p>
      </div>
      <Tabs defaultValue="setting">
        <TabsList>
          <TabsTrigger value="setting">Settings</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="setting">
          <RoleUpdate/>
        </TabsContent>
        <TabsContent value="permissions"><RolePermissions/></TabsContent>
        <TabsContent value="users">NEW</TabsContent>
      </Tabs>
    </>
  );
};
export default RoleInfo;
