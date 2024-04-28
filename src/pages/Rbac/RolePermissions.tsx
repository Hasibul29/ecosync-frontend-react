import { Permissions } from "@/hooks/useRbacRoles";
import { DataTable } from "./components/data-tables";
import { columns } from "./components/permission-column";
import AddRolePermission from "./AddRolePermission";
import useRbacRolePermissions from "@/hooks/useRbacRolePermission";
import { useRoleStore } from "@/store";


const RolePermissions = () => {
  const {role} = useRoleStore();
  const { data, isLoading, error } = useRbacRolePermissions(role.id ?? "");
  
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Manage Rbac</h1>
      </div>
      <div className="flex justify-end my-4">
        {isLoading ? (
          <p>Loading.....</p>
        ) : (
          <AddRolePermission
            permissions={data?.data as Permissions[]}
          />
        )}
      </div>
      <div>
        {error && <p>{error.message}</p>}
        {isLoading ? (
          <p>Loading.....</p>
        ) : (
          <DataTable columns={columns} data={data?.data as Permissions[]} />
        )}
      </div>
    </>
  );
};

export default RolePermissions;
