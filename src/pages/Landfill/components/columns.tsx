import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
// import { DataTableRowActions } from "./data-table-row-actions";
import { DataTableRowActions } from "./data-table-row-actions";
import { Link } from "react-router-dom";
import { useLandfillStore } from "@/store";
import { Landfill } from "@/hooks/useLandfill";

interface LandfillLinkProps {
  to: string;
  children: React.ReactNode;
  landfill: Landfill;
}

const LandFillLink = ({ to, children, landfill }: LandfillLinkProps) => {
  const landfillStore = useLandfillStore();

  const handleClick = () => {
    landfillStore.setLandfill(landfill);
  };

  return <Link to={to} onClick={handleClick} className="text-blue-500 hover:text-blue-700" >{children}</Link>;
};

export const columns: ColumnDef<Landfill>[] = [
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
          <LandFillLink landfill={row.original} to="landfill" >  {row.getValue("name")} </LandFillLink>
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
    accessorKey: "operationalTimespan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ward No" />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium min-w-[50%]">
          {row.getValue("operationalTimespan")}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <div className="min-w-[10%]"><DataTableRowActions row={row} /></div>,
  },
];
