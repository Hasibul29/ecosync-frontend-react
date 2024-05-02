import BreadCrumb from "@/components/bread-crumb";
import { Button } from "@/components/custom/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useProfile from "@/hooks/useProfile";
import useUserStore from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  id: z.string(),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string(),
  roleId: z.string(),
  roleName: z.string(),
  permissions: z.string(),
});

const Profile = () => {
  const breadcrumbItems = [{ title: "Profile", link: "/dashboard/profile" }];
  const { user } = useUserStore();
  const { data, error, isLoading } = useProfile(user.id ?? "");
  const [isEnable, setEnable] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      roleId: "",
      roleName: "",
      permissions: "",
    },
  });

  useEffect(() => {
    form.reset({
      id: data?.data?.id,
      firstName: data?.data?.firstName,
      lastName: data?.data?.lastName,
      email: data?.data?.email,
      roleId: data?.data?.roleId,
      roleName: data?.data?.role?.name,
      permissions: data?.data?.role?.permissions
        ?.map((permission) => permission.name)
        .join(", "),
    });
  }, [data]);

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(form.formState.isDirty);
    // update.mutate(data, { onSuccess: () => form.reset() });
  };

  return (
    <>
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">User Registration</h1>
      </div>
      <div className="max-w-4xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="disabled:opacity-100"
                        type="Email"
                        placeholder="Email"
                        disabled
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="roleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input
                        className="disabled:opacity-100"
                        type="text"
                        placeholder="text"
                        disabled
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="permissions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Permissions</FormLabel>
                    <FormControl>
                      <Textarea
                        className="disabled:opacity-100 h-40"
                        placeholder="Permissions"
                        disabled
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-10">
              <Button
                type="submit"
                className="px-8 py-2"
                loading={false}
                disabled={!form.formState.isDirty}
              >
                Update
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default Profile;
