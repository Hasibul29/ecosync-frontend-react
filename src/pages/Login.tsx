import { HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
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
import { PasswordInput } from "@/components/custom/PasswordInput";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import useLogin from "@/hooks/useLogin";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
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
});

const Login = ({ className, ...props }: UserAuthFormProps) => {
  const login = useLogin();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    login.mutate(data);
  }

  return (
    <div className="container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8">
        <div className="mb-4 flex items-center justify-center">
          <h1 className="text-3xl font-medium ">EcoSync</h1>
        </div>
        <Card className="p-6">
          <div className="flex flex-col space-y-2 text-left">
            <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
            <p className="text-sm text-muted-foreground pb-2">
              Enter your email and password below to log into your account
            </p>
          </div>
          {login.error && (
            <h1 className="text-red-500 font-medium flex justify-center">{login.error.response?.data.message}</h1>
          )}
          <div className={cn("grid gap-6", className)} {...props}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input  type="email" placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <div className="flex items-center justify-between">
                          <FormLabel>Password</FormLabel>
                          <Link
                            to="/forgot-password"
                            className="text-sm font-medium text-muted-foreground hover:opacity-75"
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <FormControl>
                          <PasswordInput placeholder="Password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="mt-2" loading={login.isPending}>
                    Login
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
