import BreadCrumb from "@/components/bread-crumb";
import { DataTableSkeleton } from "@/components/DataTableSkeleton";
import useBilling from "@/hooks/useBilling";
import useUserStore from "@/store";
import { DataTable } from "./components/data-tables";
import { columns } from "./components/columns";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Billing = () => {
  const breadcrumbItems = [{ title: "Billings", link: "/dashboard/billing" }];
  const { user } = useUserStore();
  const { data, isLoading, error } = useBilling(user.id ?? "");

  return (
    <>
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Billings</h1>
      </div>
      <div>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error.response?.data.message}
            </AlertDescription>
          </Alert>
        )}
        {isLoading ? (
          <DataTableSkeleton columnCount={3} />
        ) : (
          <DataTable columns={columns} data={data?.data ?? []} />
        )}
      </div>
    </>
  );
};
export default Billing;
