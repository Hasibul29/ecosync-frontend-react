import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
// import { DataTableRowActions } from "./data-table-row-actions";
import { Roles } from "@/hooks/useRbacRoles";
import { DataTableRowActions } from "./data-table-row-actions";
import { Link } from "react-router-dom";
import { useRoleStore } from "@/store";

interface RoleLinkProps {
  to: string;
  children: React.ReactNode;
  roles: Roles;
}

const RoleLink = ({ to, children, roles }: RoleLinkProps) => {
  const roleStore = useRoleStore();

  const handleClick = () => {
    roleStore.setRole(roles);
  };

  return <Link to={to} onClick={handleClick} className="text-blue-500 hover:text-blue-700" >{children}</Link>;
};


export const columns: ColumnDef<Roles>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          {/* <Link to={`roles`} >{row.getValue("name")}</Link> */}
          <RoleLink to={`roles`} roles={row.original}> {row.getValue("name")}</RoleLink>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[250px] items-center">
          {row.getValue("description")}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
