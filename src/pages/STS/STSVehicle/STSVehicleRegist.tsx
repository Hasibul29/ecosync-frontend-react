import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/custom/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

import { useEffect, useState } from "react";
import { PlusIcon } from "lucide-react";
import useVehicle from "@/hooks/useVehicle";
import { useSTSStore } from "@/store";
import useSTSVehicleRegist from "@/hooks/useSTSVehicleRegist";

const formSchema = z.object({
  vehicleId: z.string().min(1, { message: "Vehicle is required" }),
  stsId: z.string(),
});

const STSVehicleRegist = () => {
  const [open, onOpenChange] = useState(false);
  const [open2, setOpen] = useState(false);
  const { data, isLoading, error } = useVehicle("sts");
  const { sts } = useSTSStore();
  const vehicleRegist = useSTSVehicleRegist(sts.id ?? "", onOpenChange);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicleId: "",
      stsId: sts.id,
    },
  });

  useEffect(() => {
    form.reset({
      stsId: sts.id,
      vehicleId: "",
    });
  }, [sts]);

  function onSubmit(data: z.infer<typeof formSchema>) {
    vehicleRegist.mutate(data, { onSuccess: () => form.reset() });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2" /> Add Vehicle
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>Add Vehicle</DialogTitle>
          <DialogDescription>
            Add a new Vehicle here. Search by vehicle Number.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-5">
              <FormField
                control={form.control}
                name="vehicleId"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Select Vehicle</FormLabel>
                    <FormControl>
                      <div>
                        <Popover open={open2} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className="w-[200px] justify-between "
                            >
                              <p className="opacity-50">
                                {error? <p className="text-red-500">{error.response?.data.message}</p>:  field.value
                                  ? data?.data?.find(
                                      (vehicle) =>
                                        vehicle.id === field.value
                                    )?.vehicleNumber
                                  : "Select Vehicles..."}
                              </p>
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput
                                placeholder="Search Vehicle..."
                                className="h-9"
                              />
                              <CommandEmpty>No vehicle found.</CommandEmpty>
                              <CommandGroup>
                                <CommandList>
                                  {isLoading ? (
                                    <p>loading</p>
                                  ) : (
                                    data?.data?.map((vehicle) => (
                                      <CommandItem
                                        key={vehicle.id}
                                        value={vehicle.vehicleNumber}
                                        onSelect={() => {
                                          field.onChange(vehicle.id);
                                          setOpen(false);
                                        }}
                                      >
                                        {vehicle.vehicleNumber}
                                        <CheckIcon
                                          className={cn(
                                            "ml-auto h-4 w-4",
                                            field.value ===
                                              vehicle.id
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))
                                  )}
                                </CommandList>
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="gap-2 pt-10 sm:space-x-0">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button loading={vehicleRegist.isPending} disabled={!form.formState.isDirty} >Register</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default STSVehicleRegist;
