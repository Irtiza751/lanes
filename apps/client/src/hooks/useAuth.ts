import { AuthService } from "@/lib/auth-service";
import { SignupForm } from "@/schemas";
import { Credentials } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const signinMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (credentials: Credentials) =>
      AuthService.signin(credentials.name, credentials.password),
    onSuccess: (data) => {
      console.log("Login successful:", data);
      router.push("/waredrop-workspace");
    },
  });

  const signoutMutation = useMutation({
    mutationKey: ["signout"],
    mutationFn: () => AuthService.signout(),
    onSuccess: () => {
      queryClient.clear();
      router.push("/signin");
    },
  });

  const signupMutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: (data: SignupForm) => AuthService.signup(data),
    onSuccess: () => {
      queryClient.clear();
      router.push("/create-workspace");
    },
  });

  return {
    signinMutation,
    signoutMutation,
    signupMutation,
  };
}
