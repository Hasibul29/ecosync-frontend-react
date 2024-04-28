import BreadCrumb from "@/components/bread-crumb";
import useRbacRoles from "@/hooks/useRbacRoles";
import { DataTable } from "./components/data-tables";
import { columns } from "./components/columns";
import RoleRegist from "./RoleRegist";

const Rbac = () => {
  const breadcrumbItems = [{ title: "Rbac", link: "/dashboard/rbac" }];

  const { data, isLoading, error } = useRbacRoles()
  
  return (
    <>
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Manage Rbac</h1>
      </div>
      <div className="flex justify-end">
        <RoleRegist />
      </div>
      <div>
        {error && <p>{error.message}</p>}
        {isLoading ? (
          <p>Loading.....</p>
        ) : (
          <DataTable columns={columns} data={data?.data ?? []} />
        )}
      </div>
    </>
  );
};
export default Rbac;
