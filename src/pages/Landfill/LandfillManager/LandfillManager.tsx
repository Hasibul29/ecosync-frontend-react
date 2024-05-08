import { useLandfillStore } from "@/store";
import { DataTableSkeleton } from "@/components/DataTableSkeleton";
import LandfillManagerRegist from "./LandfillManagerRegist";
import { columns } from "../components/manager-columns";
import { DataTable } from "../components/data-tables";
import useLandfillManager from "@/hooks/useLandfillManager";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const LandfillManager = () => {
  const { landfill } = useLandfillStore();
  const { data, isLoading, error } = useLandfillManager(landfill.id ?? "");

  return (
    <>
      {/* <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Manage Rbac</h1>
      </div> */}
      <div className="flex justify-end my-4">
        <LandfillManagerRegist />
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

export default LandfillManager;
