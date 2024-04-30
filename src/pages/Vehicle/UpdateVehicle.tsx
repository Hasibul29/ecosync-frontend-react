import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/custom/button";
import { useEffect } from "react";
import { Vehicle } from "@/hooks/useVehicle";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import useVehicleUpdate from "@/hooks/useVehicleUpdate";

const schema = z.object({
  vehicleNumber: z.string().min(1, { message: "Vehicle number is required" }),
  vehicleType: z.string().min(1, { message: "Vehicle type is required" }),
  capacity: z.string().min(1, { message: "Capacity is required" }),
  fuelCostLoaded: z
    .string()
    .min(1, { message: "Fuel cost loaded is required" }),
  fuelCostUnloaded: z
    .string()
    .min(1, { message: "Fuel cost unloaded is required" }),
});

interface Props {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  vehicleData: Vehicle;
}

const UpdateVehicle = ({ onOpenChange, open, vehicleData }: Props) => {
  const vehicleUpdate = useVehicleUpdate(vehicleData.id ?? "", onOpenChange);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      vehicleNumber: vehicleData.vehicleNumber,
      vehicleType: vehicleData.vehicleType,
      capacity: vehicleData.capacity.toString(),
      fuelCostLoaded: vehicleData.fuelCostLoaded.toString(),
      fuelCostUnloaded: vehicleData.fuelCostUnloaded.toString(),
    },
  });

  useEffect(() => {
    form.reset({
      vehicleNumber: vehicleData.vehicleNumber,
      vehicleType: vehicleData.vehicleType,
      capacity: vehicleData.capacity.toString(),
      fuelCostLoaded: vehicleData.fuelCostLoaded.toString(),
      fuelCostUnloaded: vehicleData.fuelCostUnloaded.toString(),
    });
  }, [vehicleData,open]);

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);
    const {
      vehicleNumber,
      vehicleType,
      capacity,
      fuelCostLoaded,
      fuelCostUnloaded,
    } = data;

    vehicleUpdate.mutate(
      {
        vehicleNumber: vehicleNumber,
        vehicleType: vehicleType,
        capacity: parseInt(capacity),
        fuelCostLoaded: parseFloat(fuelCostLoaded),
        fuelCostUnloaded: parseFloat(fuelCostUnloaded),
      },
      { onSuccess: () => form.reset() }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>Update Vehicle</DialogTitle>
          <DialogDescription>
          Update the Vehicle details and save the changes.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-1">
                <FormField
                  control={form.control}
                  name="vehicleNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Number</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Vehicle Number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vehicleType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Type</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a vehicle" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Open Truck">
                                Open Truck
                              </SelectItem>
                              <SelectItem value="Dump Truck">
                                Dump Truck
                              </SelectItem>
                              <SelectItem value="Compactor">
                                Compactor
                              </SelectItem>
                              <SelectItem value="Container Carrier">
                                Container Carrier
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capacity</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Capacity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="3"> 3 Ton </SelectItem>
                              <SelectItem value="5"> 5 Ton </SelectItem>
                              <SelectItem value="7"> 7 Ton </SelectItem>
                              <SelectItem value="15"> 15 Ton </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fuelCostLoaded"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fuel Cost Loaded</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Fuel Cost Loaded"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fuelCostUnloaded"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fuel Cost Unloaded</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Fuel Cost Unloaded"
                          {...field}
                        />
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
                <Button loading={vehicleUpdate.isPending}>Save</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default UpdateVehicle;
