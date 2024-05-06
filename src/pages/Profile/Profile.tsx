import BreadCrumb from "@/components/bread-crumb";
import { PasswordInput } from "@/components/custom/PasswordInput";
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
import usePasswordChange from "@/hooks/usePasswordChange";
import useProfileUpdate from "@/hooks/useProfieUpdate";
import useProfile from "@/hooks/useProfile";
import useUserStore from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
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

const passwordSchema = z.object({
  newPassword: z
    .string()
    .min(7, { message: "Password must be at least 7 characters" }),
  confirmPassword: z
    .string()
    .min(7, { message: "Password must be at least 7 characters" }),
});

const Profile = () => {
  const breadcrumbItems = [{ title: "Profile", link: "/dashboard/profile" }];
  const { user } = useUserStore();
  const { data, error, isLoading } = useProfile(user.id ?? "");
  const updateProfile = useProfileUpdate(user.id ?? "");
  const passwordChange = usePasswordChange(user.id ?? "");

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

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
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
    updateProfile.mutate(data);
  };
  const onSubmitPassword = (data: z.infer<typeof passwordSchema>) => {
    passwordChange.mutate(data, { onSuccess: () => passwordForm.reset() });
  };

  return (
    <>
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Profile</h1>
      </div>
      <div className="max-w-4xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
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
                        placeholder="No permissions"
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
                loading={updateProfile.isPending}
                disabled={!form.formState.isDirty}
              >
                Update
              </Button>
            </div>
          </form>
        </Form>

        <div className="mt-10 max-w-sm">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Change Password</h1>
          </div>
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(onSubmitPassword)}
              className="mt-6"
            >
              <div>
                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="Confirm Password"
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
                  loading={passwordChange.isPending}
                  disabled={!passwordForm.formState.isDirty}
                >
                  Update
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-24"></div>
        </div>
      </div>
    </>
  );
};

export default Profile;
