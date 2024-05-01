import BreadCrumb from "@/components/bread-crumb";
import RegistLandfill from "./RegistLandfill";
import { DataTable } from "./components/data-tables";
import { columns } from "./components/columns";
import useLandfill from "@/hooks/useLandfill";
import { DataTableSkeleton } from "@/components/DataTableSkeleton";



const Landfill = () => {
  const breadcrumbItems = [{ title: "Manage Landfill", link: "/dashboard/landfill" }];
  const { data, isLoading, error } = useLandfill();

  return (
    <>
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Manage Landfill</h1>
      </div>
      <div className="flex justify-end">
        <RegistLandfill />
      </div>
      <div>
        {error && <p>{error.message}</p>}
        {isLoading ? (
          <DataTableSkeleton columnCount={3} rowCount={10}/>
        ) : (
          <DataTable columns={columns} data={data?.data ?? []}  />
        )}
      </div>
    </>
  );
};

export default Landfill;
