// src/pages/RegisterPage.tsx
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/hooks/useAuth";
import type { UserRegister } from "@/client";
import { useNavigateTo } from "@/hooks/useNavigateTo";

// Define a Zod schema matching the UserRegister type.
// This enforces that the schema's shape exactly conforms to UserRegister.
const registerSchema: z.ZodType<UserRegister> = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

function RegisterPage() {
  const { signUp } = useAuth();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const {toLogin} = useNavigateTo()
  // Initialize react-hook-form with the Zod resolver and UserRegister type
  const form = useForm<UserRegister>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Submit handler that receives values typed as UserRegister
  const onSubmit = async (values: UserRegister) => {
    try {
      await signUp(values.email, values.password);
      // Instead of navigating immediately, show the success dialog
      setShowSuccessDialog(true);
    } catch (error) {
      console.error("Registration failed:", error);
      // Optionally set an error on the email field (or any other)
      form.setError("email", {
        message: "Registration failed. Please try again.",
      });
    }
  };

  return (
    <>
      <h2 className="mb-4 text-2xl font-bold">Register</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-72"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john.doe@example.com"
                    {...field}
                  />
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
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full mt-2">
            Sign Up
          </Button>
          <div className="text-center">
            <div className="cursor-pointer hover:underline">
              <span onClick={() => toLogin()}>
                Already have an account?
              </span>
            </div>
          </div>
        </form>
      </Form>
      
      {/* Show AlertDialog upon successful registration */}
      {showSuccessDialog && (
        <AlertDialog
          open={showSuccessDialog}
          onOpenChange={setShowSuccessDialog}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Registration Successful</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col items-center gap-4">
               You can now log in using the verification code sent to your email.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                onClick={() => {
                  setShowSuccessDialog(false);
                  toLogin(form.getValues("email"))
                }}
              >
                OK
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}

export default RegisterPage;
