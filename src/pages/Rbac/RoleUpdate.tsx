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
import { Roles } from "@/hooks/useRbacRoles";
import useRbacUpdateRole from "@/hooks/useRbacUpdateRole";

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

interface Props {
  roleData: Roles;
}

const RoleUpdate = ({ roleData }: Props) => {
  const updateRole = useRbacUpdateRole();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: roleData.id,
      name: roleData.name,
      description: roleData.description ?? "",
    },
  });

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
    </div>
  );
};

export default RoleUpdate;
