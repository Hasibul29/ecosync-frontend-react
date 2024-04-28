import useUsers from "@/hooks/useUsers";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-tables";
import { User } from "@/store";
import BreadCrumb from "@/components/bread-crumb";
import RegistUser from "./RegistUser";

const Users = () => {
  const { data, isLoading, error } = useUsers();
  const breadcrumbItems = [{ title: "Users", link: "/dashboard/users" }];

  return (
    <>
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Manage Users</h1>
      </div>
      <div className="flex justify-end">
        <RegistUser />
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

export default Users;
