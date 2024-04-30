import BreadCrumb from "@/components/bread-crumb";
import { DataTable } from "./components/data-tables";
import { columns } from "./components/columns";
import { DataTableSkeleton } from "@/components/DataTableSkeleton";
import useVehicle from "@/hooks/useVehicle";
import RegistVehicle from "./RegistVehicle";



const Vehicle = () => {
  const breadcrumbItems = [{ title: "Vehicles", link: "/dashboard/vehicles" }];
  const { data, isLoading, error } = useVehicle();

  return (
    <>
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Manage Vehicle</h1>
      </div>
      <div className="flex justify-end">
        <RegistVehicle />
      </div>
      <div>
        {error && <p>{error.message}</p>}
        {isLoading ? (
          <DataTableSkeleton columnCount={3} rowCount={10}/>
        ) : (
          <DataTable columns={columns} data={data?.data ?? []} />
        )}
      </div>
    </>
  );
};

export default Vehicle;
