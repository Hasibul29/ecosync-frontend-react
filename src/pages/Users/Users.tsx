import useUsers from "@/hooks/useUsers";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-tables";
import { User } from "@/store";
import { Button } from "@/components/custom/button";
import { PlusIcon } from "@radix-ui/react-icons";
import BreadCrumb from "@/components/bread-crumb";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const { data, isLoading, error } = useUsers();
  const breadcrumbItems = [{ title: "Users", link: "/dashboard/users" }];
  const navigate = useNavigate();

  return (
    <>
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Manage Users</h1>
      </div>
      <div className="flex justify-end">
        <Button onClick={() => navigate("/dashboard/users/register")}>
          <PlusIcon />
          Add User
        </Button>
      </div>
      <div>
        {error && <p>{error.message}</p>}
        {isLoading ? (
          <p>Loading.....</p>
        ) : (
          <DataTable columns={columns} data={data?.data as User[]} />
        )}
      </div>
    </>
  );
};

export default Users;
