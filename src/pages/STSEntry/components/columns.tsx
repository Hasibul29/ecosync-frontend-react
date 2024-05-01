import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
// import { DataTableRowActions } from "./data-table-row-actions";
import { STSEntry } from "@/hooks/useSTSEntry";

export const columns: ColumnDef<STSEntry>[] = [
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
    accessorFn: (row) => row.vehicle?.vehicleNumber,
    id: "vehicleNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vehicle Number" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="font-medium min-w-[30%]">
            {row.getValue("vehicleNumber")}
          </span>
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.sts?.name,
    id: "stsName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="STS Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="font-medium min-w-[30%]">
            {row.getValue("stsName")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "wasteVolume",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Volume of Waste" />
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
    accessorKey: "arrivalTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Arrival Time" />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium min-w-[50%]">
          {row.getValue("arrivalTime")}
        </div>
      );
    },
  },
  {
    accessorKey: "departureTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Departure Time" />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium min-w-[50%]">
          {row.getValue("departureTime")}
        </div>
      );
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <div className="min-w-[10%]"><DataTableRowActions row={row} /></div>,
  // },
];
