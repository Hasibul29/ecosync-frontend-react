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
import useRbacUpdateRole from "@/hooks/useRbacUpdateRole";
import { useRoleStore } from "@/store";
import { useTheme } from "@/components/theme-provider";
import { DeleteRole } from "./DeleteRole";
import { useEffect, useState } from "react";

const formSchema = z.object({
  id: z.string(),
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

const RoleUpdate = () => {
  const { theme } = useTheme();
  const { role } = useRoleStore();
  const updateRole = useRbacUpdateRole();
  const [showDeleteRolesDialog, setShowDeleteRolesDialog] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: role.id,
      name: role.name,
      description: role.description ?? "",
    },
  });

  useEffect(()=> {
    form.reset({
      id: role.id,
      name: role.name,
      description: role.description ?? "",
    })
  },[role]);

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    updateRole.mutate(data);
  }

  return (
    <div className="mt-10">
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
            <Button className="w-20" loading={updateRole.isPending}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
      <div
        className={
          "mt-20 p-4 w-full " +
          (theme === "light" ? "bg-red-100" : "bg-red-950") +
          " min-h-0"
        }
      >
        <DeleteRole open={showDeleteRolesDialog} onOpenChange={setShowDeleteRolesDialog} roleData={role} redirect={true}></DeleteRole>
        <div className="flex flex-row justify-between items-center">
          <p className={theme === "light" ? "text-red-950" : "text-red-100"}>
            <span className="font-medium">Delete Role</span> <br />Once confirmed, this operation can't be undone!
          </p>
          <Button variant="destructive" onClick={() => setShowDeleteRolesDialog(true)} >Delete Role</Button>
        </div>
      </div>
    </div>
  );
};

export default RoleUpdate;
