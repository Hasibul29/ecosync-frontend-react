import useUsers from "@/hooks/useUsers";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-tables";
// import { tasks } from "./data/task";
import { User } from "@/store";

const Users = () => {
  const { data, isLoading, error } = useUsers();

  return (
    <>
      <h6>Users</h6>
      <div className="w-[950px] mx-4 my-10">
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
