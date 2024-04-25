import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { Table } from "@tanstack/react-table";

interface DataTableFilterOptionsProps<TData> {
  table: Table<TData>;
  selectedFilter: (value: string) => void;
}

export function DataTableFilterOptions<TData>({
  table,
  selectedFilter,
}: DataTableFilterOptionsProps<TData>) {
  return (
    <Select onValueChange={(value) => selectedFilter(value)}>
      <SelectTrigger>
        <SelectValue placeholder="Filter on" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Filter on</SelectLabel>
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== "undefined" &&
                column.getCanHide() &&
                column.id != "roles"
            )
            .map((column) => (
              <SelectItem key={column.id} value={column.id}>
                {column.id}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
