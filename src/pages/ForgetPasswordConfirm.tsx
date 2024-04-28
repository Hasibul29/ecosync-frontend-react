import { HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { Button } from "@/components/custom/button";
import { PasswordInput } from "@/components/custom/PasswordInput";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import useForgetPasswordConfirm from "@/hooks/useForgetPasswordConfirm";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  newPassword: z
    .string()
    .min(1, {
      message: "Please enter your password.",
    })
    .min(7, {
      message: "Password must be at least 8 characters long.",
    }),
  confirmPassword: z
    .string()
    .min(1, {
      message: "Please enter your password.",
    })
    .min(7, {
      message: "Password must be at least 8 characters long.",
    }),
  email: z.string(),
  step: z.string(),
});

const ForgetPasswordConfirm = ({ className, ...props }: UserAuthFormProps) => {
  const confirmReset = useForgetPasswordConfirm();
  const { state } = useLocation();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
      email: state.email,
      step: "1",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    confirmReset.mutate(data, { onSuccess: () => navigate("/") });
  }

  return (
    <div className="container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8">
        <div className="mb-4 flex items-center justify-center"></div>
        <Card className="p-6">
          <div className="flex flex-col space-y-2 text-left">
            <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
            <p className="text-sm text-muted-foreground pb-2">
              Enter your email and password below to log into your account
            </p>
          </div>
          <div className={cn("grid gap-6", className)} {...props}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <PasswordInput placeholder="Password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
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
                  <Button className="mt-2" loading={confirmReset.isPending}>
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

export default ForgetPasswordConfirm;
