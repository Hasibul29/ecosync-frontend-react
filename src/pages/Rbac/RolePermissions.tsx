import { Permissions, Roles } from "@/hooks/useRbacRoles";
import { DataTable } from "./components/data-tables";
import { columns, getRoleId } from "./components/permission-column";
import AddRolePermission from "./AddRolePermission";
import useRbacRolePermissions from "@/hooks/useRbacRolePermission";

interface Props {
  roleData: Roles;
}

const RolePermissions = ({ roleData }: Props) => {
  const { data, isLoading, error } = useRbacRolePermissions(roleData.id ?? "");
  getRoleId(roleData.id);
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
            roleId={roleData.id}
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
