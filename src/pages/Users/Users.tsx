import useUsers from "@/hooks/useUsers";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-tables";
import BreadCrumb from "@/components/bread-crumb";
import RegistUser from "./RegistUser";
import { DataTableSkeleton } from "@/components/DataTableSkeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Users = () => {
  const { data, isLoading, error } = useUsers();
  const breadcrumbItems = [{ title: "Users", link: "/dashboard/users" }];

  return (
    <>
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Manage Users</h1>
      </div>
      <div className="flex justify-end">
        <RegistUser />
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

export default Users;
