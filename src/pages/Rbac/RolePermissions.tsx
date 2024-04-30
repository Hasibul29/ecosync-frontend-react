import { DataTable } from "./components/data-tables";
import { columns } from "./components/permission-column";
import AddRolePermission from "./AddRolePermission";
import useRbacRolePermissions from "@/hooks/useRbacRolePermission";
import { useRoleStore } from "@/store";
import { DataTableSkeleton } from "@/components/DataTableSkeleton";


const RolePermissions = () => {
  const {role} = useRoleStore();
  const { data, isLoading, error } = useRbacRolePermissions(role.id ?? "");
  
  return (
    <>
      {/* <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl mt-4">Permissions</h1>
      </div> */}
      <div className="flex justify-end my-4">
        {error && <p>{error.message}</p>}
        {isLoading ? (
          <p>Loading.....</p>
        ) : (
          <AddRolePermission
            permissions={data?.data ??  []}
          />
        )}
      </div>
      <div>
        {error && <p>{error.message}</p>}
        {isLoading ? (
          <DataTableSkeleton columnCount={3} rowCount={4}/>
        ) : (
          <DataTable columns={columns} data={data?.data ?? []} />
        )}
      </div>
    </>
  );
};

export default RolePermissions;
