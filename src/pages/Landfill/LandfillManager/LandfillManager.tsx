import { useLandfillStore } from "@/store";
import { DataTableSkeleton } from "@/components/DataTableSkeleton";
import LandfillManagerRegist from "./LandfillManagerRegist";
import { columns } from "../components/manager-columns";
import { DataTable } from "../components/data-tables";
import useLandfillManager from "@/hooks/useLandfillManager";

const LandfillManager = () => {
  const { landfill } = useLandfillStore();
  const { data, isLoading, error } = useLandfillManager(landfill.id??"");

  return (
    <>
      {/* <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Manage Rbac</h1>
      </div> */}
      <div className="flex justify-end my-4">
        <LandfillManagerRegist />
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

export default LandfillManager;
