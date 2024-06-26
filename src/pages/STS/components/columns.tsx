import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
// import { DataTableRowActions } from "./data-table-row-actions";
import { STS } from "@/hooks/useSTS";
import { DataTableRowActions } from "./data-table-row-actions";
import { Link } from "react-router-dom";
import { useSTSStore } from "@/store";

interface STSLinkProps {
  to: string;
  children: React.ReactNode;
  sts: STS;
}

const STSLink = ({ to, children, sts }: STSLinkProps) => {
  const stsStore = useSTSStore();

  const handleClick = () => {
    stsStore.setSTS(sts);
  };

  return <Link to={to} onClick={handleClick} className="text-blue-500 hover:text-blue-700" >{children}</Link>;
};

export const columns: ColumnDef<STS>[] = [
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
        <div className="font-medium min-w-[50%]">
          {/* {row.getValue("name")} */}
          <STSLink to={`stsInfo`} sts={row.original}>{row.getValue("name")}</STSLink>
        </div>
      );
    },
  },
  {
    accessorKey: "wardNo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ward No" />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium min-w-[50%]">
          {row.getValue("wardNo")}
        </div>
      );
    },
  },
  {
    accessorKey: "latitude",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Latitude" />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium min-w-[50%]">
          {row.getValue("latitude")}
        </div>
      );
    },
  },
  {
    accessorKey: "longitude",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Latitude" />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium min-w-[50%]">
          {row.getValue("longitude")}
        </div>
      );
    },
  },
  {
    accessorKey: "capacity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Capacity" />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium min-w-[50%]">
          {row.getValue("capacity")}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <div className="min-w-[10%]"><DataTableRowActions row={row} /></div>,
  },
];
