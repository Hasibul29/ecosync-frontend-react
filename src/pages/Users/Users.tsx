import useUsers from "@/hooks/useUsers";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-tables";
// import { tasks } from "./data/task";
import { User } from "@/store";

const Users = () => {
  const { data, isLoading, error } = useUsers();

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
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
