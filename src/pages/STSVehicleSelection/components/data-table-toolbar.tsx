import { Cross2Icon } from "@radix-ui/react-icons";
import { Row, Table } from "@tanstack/react-table";

import { Button } from "@/components/custom/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "../components/data-table-view-options";
import { DataTableFilterOptions } from "./data-table-filter-option";
import { useState } from "react";
import AddToFleetAction from "./add_to_fleet_action";
import { SuggestedVehicle } from "@/hooks/useSTSVehicleSelecton";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [selectedFilter, setSelectedFilter] = useState("vehicleNumber");

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <div className="flex gap-x-2 pl-1 pt-1">
          <DataTableFilterOptions
            table={table}
            selectedFilter={(value) => {
              table.resetColumnFilters();
              setSelectedFilter(value);
            }}
          />
        </div>
        <Input
          placeholder="Filter vehicle..."
          value={
            (table.getColumn(selectedFilter)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(selectedFilter)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
        <Button
          onClick={() => console.log(table.getRowModel().rows.forEach((r) => (r.original as SuggestedVehicle).isSuggested===true && !r.getIsSelected()  ? r.toggleSelected(): null))  }> Select All Suggeted Vehicle </Button>
        {
          table.getFilteredSelectedRowModel().rows.length > 0 && (
            <AddToFleetAction
              vehicles={table.getFilteredSelectedRowModel().rows as Row<SuggestedVehicle>[]}
              onSuccess={() => table.toggleAllPageRowsSelected(false)}
            />
          )
        }
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
