import BreadCrumb from "@/components/bread-crumb";
import RegistSTS from "./RegistSTS";
import { DataTable } from "./components/data-tables";
import { columns } from "./components/columns";
import useSTS from "@/hooks/useSTS";
import { DataTableSkeleton } from "@/components/DataTableSkeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const STS = () => {
  const breadcrumbItems = [{ title: "Manage STS", link: "/dashboard/sts" }];
  const { data, isLoading, error } = useSTS();

  return (
    <>
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Manage STS</h1>
      </div>
      <div className="flex justify-end">
        <RegistSTS />
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
          <DataTableSkeleton columnCount={3} rowCount={10} />
        ) : (
          <DataTable columns={columns} data={data?.data ?? []} />
        )}
      </div>
    </>
  );
};

export default STS;
