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
import { Input } from "@/components/ui/input";
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

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import useRbacAddRole from "@/hooks/useRbacAddRole";
import { Roles } from "@/hooks/useRbacRoles";

const formSchema = z.object({
  name: z.string().min(1, { message: "Please enter name." }).min(2, {
    message: "Name must be at least 2 characters long.",
  }),
  description: z
    .string()
    .min(1, {
      message: "Please enter description.",
    })
    .min(8, {
      message: "Description must be at least 8 characters long.",
    }),
});

const RoleRegist = () => {
  const [open, onOpenChange] = useState(false);
  const addRole = useRbacAddRole(onOpenChange);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    addRole.mutate(data as Roles);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2" /> Add Role
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }} 
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>Role Registration</DialogTitle>
          <DialogDescription>
            Register a new role here. Click register button when you are done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1">
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
                name="description"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Description" {...field} />
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
              <Button loading={addRole.isPending}>Register</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RoleRegist;
