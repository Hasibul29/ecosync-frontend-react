import BreadCrumb from "@/components/bread-crumb";
import RegistSTS from "./RegistSTS";
import { DataTable } from "./components/data-tables";
import { columns } from "./components/columns";
import useSTS from "@/hooks/useSTS";



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
        {error && <p>{error.message}</p>}
        {isLoading ? (
          <p>Loading.....</p>
        ) : (
          <DataTable columns={columns} data={data?.data ?? []} />
        )}
      </div>
    </>
  );
};

export default STS;
