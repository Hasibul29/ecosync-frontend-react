import BreadCrumb from "@/components/bread-crumb";

const RegistUser = () => {
  const breadcrumbItems = [
    { title: "Users", link: "/dashboard/users" },
    { title: "Register", link: "/dashboard/users/register" },
  ];

  return (
    <>
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">User Registration</h1>
      </div>
    </>
  );
};

export default RegistUser;
