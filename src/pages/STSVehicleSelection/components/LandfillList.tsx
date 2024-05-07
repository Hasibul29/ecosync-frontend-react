import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/custom/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useLandfill from "@/hooks/useLandfill";
import { useState } from "react";

interface LandfillListProps {
  onChange: (latitude:number,longitude:number) => void;
}

const LandfillList = ({onChange}:LandfillListProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const { data, isLoading, error, isError } = useLandfill();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          loading={isLoading}
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {isError ? (
            <p>{error.message}</p>
          ) : value ? (
            data?.data?.find((landfill) => landfill.id === value)?.name ||
            "Unknown landfill"
          ) : (
            "Select landfill..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search landfill..." />
          <CommandEmpty>No landfill found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {data?.data?.map((Landfill) => (
                <CommandItem
                  key={Landfill.id}
                  value={Landfill.name}
                  onSelect={(value) => {
                    setValue(value);
                    setOpen(false);
                    onChange(Landfill.latitude,Landfill.longitude);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === Landfill.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {Landfill.name}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default LandfillList;
