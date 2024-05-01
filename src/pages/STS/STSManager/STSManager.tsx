import { useSTSStore } from "@/store";
import { DataTableSkeleton } from "@/components/DataTableSkeleton";
import useSTSManager from "@/hooks/useSTSManager";
import STSManagerRegist from "./STSManagerRegist";
import { columns } from "../components/manager-columns";
import { DataTable } from "../components/data-tables";

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

export default STSManager;
