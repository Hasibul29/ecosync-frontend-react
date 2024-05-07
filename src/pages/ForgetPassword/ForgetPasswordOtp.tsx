import { HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { Button } from "@/components/custom/button";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import useForgetPasswordOtp from "@/hooks/useForgetPasswordOtp";
import { useLocation, useNavigate } from "react-router-dom";
import { useTimer } from "react-timer-hook";
import useForgetPasswordInitiate from "@/hooks/useForgetPasswordInitiate";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
  email: z.string(),
  step: z.string(),
});

const ForgetPasswordOtp = ({ className, ...props }: UserAuthFormProps) => {
  const otpConfirm = useForgetPasswordOtp();
  const { state } = useLocation();
  const navigate = useNavigate();
  const countdown = new Date();
  countdown.setSeconds(countdown.getSeconds() + 300);
  const initiateReset = useForgetPasswordInitiate();
  const { minutes, seconds, isRunning , restart} = useTimer({
    autoStart: true,
    expiryTimestamp: countdown,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
      email: state.email,
      step: "0",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    otpConfirm.mutate(data, {
      onSuccess: () => {
        navigate("/forgot-password/confirm", { state: { email: data.email } });
      },
    });
  }

  const onResendOpt = () => {
    initiateReset.mutate({email:state.email},{onSuccess:() => restart(countdown,true) });
  };

  return (
    <div className="container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8">
        <div className="mb-4 flex items-center justify-center"></div>
        <Card className="p-6">
          <div className="flex flex-col space-y-2 text-left">
            <h1 className="text-2xl font-semibold tracking-tight">
              Reset Password
            </h1>
            <div className="flex flex-row justify-between content-center">
              <p className="text-sm text-muted-foreground pb-2">
                Enter the OTP we sent to your email.
              </p>
              <p className="text-red-500 text-sm pb-2">
                {minutes}:{seconds}
              </p>
            </div>
          </div>
          <div className={cn("grid gap-6", className)} {...props}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormControl>
                          <div className="flex justify-center">
                            <InputOTP maxLength={6} {...field}>
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                              </InputOTPGroup>
                              <InputOTPSeparator />
                              <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                              </InputOTPGroup>
                            </InputOTP>
                          </div>
                        </FormControl>
                        <FormMessage className="flex justify-center" />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="mt-5"
                    disabled={!isRunning}
                    loading={otpConfirm.isPending}
                  >
                    Verify
                  </Button>
                </div>
              </form>
            </Form>
            <div className="flex justify-center items-center mt-6 gap-2">
              Resend Code ?
              <Button
                variant="ghost"
                disabled={isRunning}
                onClick={() => onResendOpt()}
              >
                Resend
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ForgetPasswordOtp;
