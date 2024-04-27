import BreadCrumb from "@/components/bread-crumb";
import { Roles } from "@/hooks/useRbacRoles";
import { useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoleUpdate from "./RoleUpdate";
import RolePermissions from "./RolePermissions";

const RoleInfo = () => {
  const location = useLocation();
  const state = location.state as Roles;
  const breadcrumbItems = [
    { title: "Rbac", link: "/dashboard/rbac" },
    { title: "Roles", link: "/dashboard/rbac/roles" },
  ];

  return (
    <>
      <BreadCrumb items={breadcrumbItems} />
      <div>
        <h1 className="text-lg font-semibold md:text-2xl">{state.name}</h1>
        <p className="pt-2">
          Role ID <code className="px-1">{state.id}</code>
        </p>
      </div>
      <Tabs defaultValue="setting">
        <TabsList>
          <TabsTrigger value="setting">Settings</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="setting">
          <RoleUpdate roleData={state}/>
        </TabsContent>
        <TabsContent value="permissions"><RolePermissions roleData={state}/></TabsContent>
        <TabsContent value="users">NEW</TabsContent>
      </Tabs>
    </>
  );
};
export default RoleInfo;
