import BreadCrumb from "@/components/bread-crumb";
import { DataTableSkeleton } from "@/components/DataTableSkeleton";
import useUserStore from "@/store";
import { DataTable } from "./components/data-tables";
import { columns } from "./components/columns";
import STSEntryRegist from "./LandfillEntryRegist";
import useLandfillEntry from "@/hooks/useLandfillEntry";

const LandfillEntry = () => {
  const breadcrumbItems = [{ title: "Landfill Entry", link: "/dashboard/landfillentry" }];
  const {user} = useUserStore();
  const { data, isLoading, error } = useLandfillEntry(user.id?? "")
  
  return (
    <>
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Manage Landfiil Entry</h1>
      </div>
      <div className="flex justify-end">
        <STSEntryRegist/>
      </div>
      <div>
        {error && <p>{error.message}</p>}
        {isLoading ? (
          <DataTableSkeleton columnCount={3} rowCount={5}/>
        ) : (
          <DataTable columns={columns} data={data?.data ?? []} />
        )}
      </div>
    </>
  );
};
export default LandfillEntry;
