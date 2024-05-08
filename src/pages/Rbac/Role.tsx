import BreadCrumb from "@/components/bread-crumb";
import useRbacRoles from "@/hooks/useRbacRoles";
import { DataTable } from "./components/data-tables";
import { columns } from "./components/columns";
import RoleRegist from "./RoleRegist";
import { DataTableSkeleton } from "@/components/DataTableSkeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Role = () => {
  const breadcrumbItems = [{ title: "Role", link: "/dashboard/role" }];

  const { data, isLoading, error } = useRbacRoles();

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
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error.response?.data.message}</AlertDescription>
          </Alert>
        )}
        {isLoading ? (
          <DataTableSkeleton columnCount={3} rowCount={5} />
        ) : (
          <DataTable columns={columns} data={data?.data ?? []} />
        )}
      </div>
    </>
  );
};
export default Role;
