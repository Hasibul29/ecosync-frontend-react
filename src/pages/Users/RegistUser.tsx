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
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/custom/button";
import useRoles from "@/hooks/useRoles";
import useUserRegister from "@/hooks/useUserRegister";
import { User } from "@/store";

const schema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z
    .string()
    .min(1, { message: "Please enter your email." })
    .email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(1, {
      message: "Please enter your password.",
    })
    .min(7, {
      message: "Password must be at least 7 characters long.",
    }),
  roleId: z.string().optional(),
});

const RegistUser = () => {
  const { data, error, isError } = useRoles();
  const userRegister = useUserRegister();

  const RegistUserFC: React.FC = () => {
    const form = useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
      defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        roleId: undefined,
      },
    });

    const onSubmit = (data: z.infer<typeof schema>) => {
      console.log(data);
      userRegister.mutate(data as User);
    };

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <PlusIcon className="mr-2" /> Add User
          </Button>
        </DialogTrigger>
        <DialogContent
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
          className="sm:max-w-[425px]"
        >
          <DialogHeader>
            <DialogTitle>User Registration</DialogTitle>
            <DialogDescription>
              Register a new user here. Click register button when you are done.
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
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="First Name"
                            {...field}
                          />
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
                          <Input
                            type="text"
                            placeholder="Last Name"
                            {...field}
                          />
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
                          <Input type="Email" placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="colums-1">
                    {isError && (
                      <p className="text-red-400">
                        {error?.response?.data?.message}
                      </p>
                    )}
                    <FormField
                      control={form.control}
                      name="roleId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Role
                            <span className="text-gray-400 pl-1">
                              (Optional)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              value={field.value}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Role</SelectLabel>
                                  {data?.data?.map((role) => (
                                    <SelectItem key={role.id} value={role.id}>
                                      {role.name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <DialogFooter className="gap-2 pt-10 sm:space-x-0">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button loading={userRegister.isPending}>Register</Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return <RegistUserFC />;
};

export default RegistUser;
