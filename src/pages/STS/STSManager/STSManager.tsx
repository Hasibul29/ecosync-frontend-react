import { useSTSStore } from "@/store";
import { DataTableSkeleton } from "@/components/DataTableSkeleton";
import useSTSManager from "@/hooks/useSTSManager";
import STSManagerRegist from "./STSManagerRegist";
import { columns } from "../components/manager-columns";
import { DataTable } from "../components/data-tables";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const STSManager = () => {
  const { sts } = useSTSStore();
  const { data, isLoading, error } = useSTSManager(sts.id ?? "");

  return (
    <>
      {/* <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Manage Rbac</h1>
      </div> */}
      <div className="flex justify-end my-4">
        <STSManagerRegist />
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
          <DataTableSkeleton columnCount={3} rowCount={4} />
        ) : (
          <DataTable columns={columns} data={data?.data ?? []} />
        )}
      </div>
    </>
  );
};

export default STSManager;
