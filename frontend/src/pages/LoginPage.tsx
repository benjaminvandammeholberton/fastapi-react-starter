// src/pages/LoginPage.tsx
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
import { useAuth } from "@/hooks/useAuth";
import { useNavigateTo } from "@/hooks/useNavigateTo";
import { useLocation } from "react-router-dom";

// Define a Zod schema matching the Body_login_login_access_token type.
// Adjust the field names if needed. Here we're using "username" for the email.
const loginSchema = z.object({
  username: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

// Infer the form values type from the schema
type LoginFormValues = z.infer<typeof loginSchema>;

function LoginPage() {
  const location = useLocation();
  const { signIn } = useAuth();
  const { toHome, toRegister } = useNavigateTo()

  // Initialize react-hook-form with Zod resolver
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: location.state?.email || "",
      password: "",
    },
  });

  // Submit handler
  const onSubmit = async (values: LoginFormValues) => {
    try {
      await signIn(values.username, values.password);
      toHome();
    } catch (error) {
      console.error("Login failed:", error);
      // Optionally, you can use form.setError() to set an error on a specific field or a global error.
      form.setError("username", { message: "Login failed. Please check your credentials." });
    }
  };

  return (
    <>
      <h2 className="mb-4 text-2xl font-bold">Login</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-72">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@example.com" {...field} />
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
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-2 w-full">
            Sign In
          </Button>
          <div className="text-center">
            <div>
              <span
                className="cursor-pointer hover:underline"
                onClick={toRegister}
              >
                Don't have an account?
              </span>
            </div>
            <div className="cursor-pointer hover:underline">
              <span onClick={toRegister}>Forgot Password</span>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}

export default LoginPage;
