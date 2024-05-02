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
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
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
import { useState } from "react";
import useVehicleRegist from "@/hooks/useVehicleRegist";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";

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

const RegistVehicle = () => {
  const [open, onOpenChange] = useState(false);
  const vehicleRegist = useVehicleRegist(onOpenChange);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      vehicleNumber: "",
      vehicleType: "",
      capacity: "",
      fuelCostLoaded: "",
      fuelCostUnloaded: "",
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);

    const {
      vehicleNumber,
      vehicleType,
      capacity,
      fuelCostLoaded,
      fuelCostUnloaded,
    } = data;

    vehicleRegist.mutate(
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
          <DialogTitle>Vehicle Registration</DialogTitle>
          <DialogDescription>
            Register a new Vehicle here. Click register button when you are done.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="flex justify-end">
            <Button variant="destructive" onClick={() => form.reset()}>
              Clear
            </Button>
          </div>
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
                <Button loading={vehicleRegist.isPending} disabled={!form.formState.isDirty} >Register</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default RegistVehicle;
