import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { SuggestedVehicle } from "@/hooks/useSTSVehicleSelecton";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<SuggestedVehicle>[] = [
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
    accessorKey: "vehicleNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vehicle Number" />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium min-w-[50%]">
          {row.getValue("vehicleNumber")}
        </div>
      );
    },
  },
  {
    accessorKey: "vehicleType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vehicle Type" />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium min-w-[50%]">
          {row.getValue("vehicleType")}
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
    accessorKey: "fuelCostLoaded",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fuel Cost Loaded" />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium min-w-[50%]">
          {row.getValue("fuelCostLoaded")}
        </div>
      );
    },
  },
  {
    accessorKey: "fuelCostUnloaded",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fuel Cost Unloaded" />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium min-w-[50%]">
          {row.getValue("fuelCostUnloaded")}
        </div>
      );
    },
  },
  {
    accessorKey: "isSuggested",
    header: () => (
      <p></p>
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium min-w-[50%]">
          {row.getValue("isSuggested")  === true ? <Badge style={{background: "green", color: "white"}} >Suggested</Badge> : ""}
        </div>
      );
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <div className="min-w-[10%]"><DataTableRowActions row={row} /></div>,
  // },
];
