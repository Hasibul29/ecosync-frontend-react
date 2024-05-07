import BreadCrumb from "@/components/bread-crumb";
import { DataTableSkeleton } from "@/components/DataTableSkeleton";
import useBilling from "@/hooks/useBilling";
import useUserStore from "@/store";
import { DataTable } from "./components/data-tables";
import { columns } from "./components/columns";

const Billing = () => {
  const breadcrumbItems = [{ title: "Billings", link: "/dashboard/billing" }];
  const {user} = useUserStore();
  const { data, isLoading, error } = useBilling(user.id?? "")
  
  return (
    <>
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Billings</h1>
      </div>
      <div>
        {error && <p>{error.message}</p>}
        {isLoading ? (
          <DataTableSkeleton columnCount={3}/>
        ) : (
          <DataTable columns={columns} data={data?.data ?? []} />
        )}
      </div>
    </>
  );
};
export default Billing;
