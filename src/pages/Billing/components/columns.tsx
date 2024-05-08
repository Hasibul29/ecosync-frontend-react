import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Billing } from "@/hooks/useBilling";

export const columns: ColumnDef<Billing>[] = [
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
    accessorKey: "stsName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Arriving STS" />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium min-w-[50%]">
          {row.getValue("stsName")}
        </div>
      );
    },
  },
  {
    accessorKey: "wasteVolume",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Waste Volume" />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium min-w-[50%]">
          {row.getValue("wasteVolume")}
        </div>
      );
    },
  },
  {
    accessorKey: "fuelCost",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cost of Fuel" />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium min-w-[50%]">
          {row.getValue("fuelCost")}
        </div>
      );
    },
  },
  {
    accessorKey: "generatedTimeStamp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Generated Timestamp" />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium min-w-[50%]">
          {row.getValue("generatedTimeStamp")}
        </div>
      );
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <div className="min-w-[10%]"><DataTableRowActions row={row} /></div>,
  // },
];
