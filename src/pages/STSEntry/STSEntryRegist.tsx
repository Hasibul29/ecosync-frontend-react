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
import useUserStore from "@/store";
import useSTSEntryRegist from "@/hooks/useSTSEntryRegist";

// export interface STSEntry {
//     id: string;
//     stsId: string;
//     vehicleId: string;
//     wasteVolume: number;
//     arrivalTime: Date;
//     departureTime: Date;
//     vehicle?:Vehicle;
//     sts?:STS;
//   }

const schema = z.object({
  vehicleNumber: z.string().min(1, { message: "Please enter vehicle number." }),
  wasteVolume: z.string().min(1, { message: "Please enter waste volume." }),
  arrivalTime: z.string({ required_error: "Please enter arrival time." }),
  departureTime: z.string({ required_error: "Please enter departure time." }),
});

const STSEntryRegist = () => {
  const [open, onOpenChange] = useState(false);
  const { user } = useUserStore();
    const stsEntryRegist = useSTSEntryRegist(user.id??"",onOpenChange);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      vehicleNumber: "",
      wasteVolume: "",
      arrivalTime: "",
      departureTime: "",
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);
    stsEntryRegist.mutate({
      vehicleNumber: data.vehicleNumber,
      wasteVolume: parseInt(data.wasteVolume),
      arrivalTime: new Date(data.arrivalTime),
      departureTime: new Date(data.departureTime),
    }, {onSuccess: () => form.reset()});
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2" /> Add STS Entry
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>Add STS Entry</DialogTitle>
          <DialogDescription>
            Add STS Entry here. Click register button when you are done.
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
                  name="wasteVolume"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Volume of Waste</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Volume of Waste"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="arrivalTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Arrival Time</FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          placeholder="Arrival Time"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="departureTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Departure Time</FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          placeholder="Departure Time"
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
                <Button loading={false}>Register</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default STSEntryRegist;
