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
import { STS } from "@/hooks/useSTS";
import useSTSUpdate from "@/hooks/useSTSUpdate";
import { useEffect } from "react";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  wardNo: z.string().min(1, { message: "Ward number is required" }),
  latitude: z.string().min(1, { message: "Latitude is required" }),
  longitude: z.string().min(1, { message: "Longitude is required" }),
  capacity: z.string().min(1, { message: "Capacity is required" }),
});

interface Props {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  stsData: STS;
}

const UpdateSTS = ({ onOpenChange, open, stsData }: Props) => {
  const stsUpdate = useSTSUpdate(stsData.id ?? "", onOpenChange);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: stsData.name,
      wardNo: stsData.wardNo,
      latitude: stsData.latitude.toString(),
      longitude: stsData.longitude.toString(),
      capacity: stsData.capacity.toString(),
    },
  });

  useEffect(() => {
    form.reset({
      name: stsData.name,
      wardNo: stsData.wardNo,
      latitude: stsData.latitude.toString(),
      longitude: stsData.longitude.toString(),
      capacity: stsData.capacity.toString(),
    });
  }, [stsData, open]);

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);
    stsUpdate.mutate(
      {
        name: data.name,
        wardNo: data.wardNo,
        latitude: parseFloat(data.latitude),
        longitude: parseFloat(data.longitude),
        capacity: parseInt(data.capacity),
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
          <DialogTitle>Update STS</DialogTitle>
          <DialogDescription>
            Register a new STS here. Click register button when you are done.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-1">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="wardNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ward Number</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Ward Number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="latitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Latitude</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Latitude" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="longitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Longitude</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Longitude" {...field} />
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
                      <FormLabel>Capacity (Tonnes)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Capacity"
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
                <Button loading={stsUpdate.isPending} disabled={!form.formState.isDirty} >Submit</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default UpdateSTS;
