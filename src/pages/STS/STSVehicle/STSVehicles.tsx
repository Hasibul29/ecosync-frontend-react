import { useSTSStore } from "@/store";
import { DataTableSkeleton } from "@/components/DataTableSkeleton";
import useSTSVehicle from "@/hooks/useSTSVehicle";
import STSVehicleRegist from "./STSVehicleRegist";
import { DataTable } from "../components/vehicle-data-tables";
import { columns } from "../components/vehicle_column";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const STSVehicle = () => {
  const { sts } = useSTSStore();
  const { data, isLoading, error } = useSTSVehicle(sts.id ?? "");

  return (
    <>
      {/* <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Manage Rbac</h1>
      </div> */}
      <div className="flex justify-end my-4">
        <STSVehicleRegist />
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

export default STSVehicle;
