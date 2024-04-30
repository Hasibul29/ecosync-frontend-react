import { useSTSStore } from "@/store";
import { DataTableSkeleton } from "@/components/DataTableSkeleton";
import { columns } from "./components/vehicles_column";
import useSTSVehicle from "@/hooks/useSTSVehicle";
import STSVehicleRegist from "./STSVehicleRegist";
import { DataTable } from "./components/vehicle-data-tables";

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
        {error && <p>{error.message}</p>}
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
