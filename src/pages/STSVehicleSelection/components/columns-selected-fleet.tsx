import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { SuggestedVehicle } from "@/hooks/useSTSVehicleSelecton";
import { DataTableRowActions } from "./data-table-row-actions";

export const columnsSelectedFleet: ColumnDef<SuggestedVehicle>[] = [
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
    id: "actions",
    cell: ({ row }) => <div className="min-w-[10%]"><DataTableRowActions row={row} /></div>,
  },
];
