"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SeparatorWithText } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import { SignupForm as SignupFormData, signupFormSchema } from "@/schemas";
import { GoogleSigninButton } from "./google-signin-button";

export function SignupForm() {
  const { signupMutation } = useAuth();
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = (data: SignupFormData) => {
    console.log("Form submitted with data:", data);
    // Handle form submission logic here
    signupMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <GoogleSigninButton text="Signup with Google" />
      <SeparatorWithText className="my-5">Or continue with</SeparatorWithText>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} placeholder="John Doe" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="name@example.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} placeholder="*********" type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={signupMutation.isPending}
          size="xl"
          className="w-full"
        >
          {signupMutation.isPending ? "Loading..." : "Signup"}
        </Button>
      </form>
    </Form>
  );
}
