import BreadCrumb from "@/components/bread-crumb";
import { DataTableSkeleton } from "@/components/DataTableSkeleton";
import useSTSEntry from "@/hooks/useSTSEntry";
import useUserStore from "@/store";
import { DataTable } from "./components/data-tables";
import { columns } from "./components/columns";
import STSEntryRegist from "./STSEntryRegist";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const STSEntry = () => {
  const breadcrumbItems = [{ title: "STS Entry", link: "/dashboard/stsentry" }];
  const { user } = useUserStore();
  const { data, isLoading, error } = useSTSEntry(user.id ?? "");

  return (
    <>
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Manage STS Entry</h1>
      </div>
      <div className="flex justify-end">
        <STSEntryRegist />
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
export default STSEntry;
