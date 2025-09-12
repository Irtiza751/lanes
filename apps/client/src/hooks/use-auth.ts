import { AuthService } from "@/lib/auth-service";
import { SignupForm } from "@/schemas";
import { Credentials } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const signinMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (credentials: Credentials) =>
      AuthService.signin(credentials.name, credentials.password),
    onSuccess: (data) => {
      console.log("Login successful:", data);
      queryClient.clear();
      router.push("/waredrop-workspace");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.status === 400) {
          toast.error("Signin Error", {
            description: error.response?.data.message,
          });
        }
      } else {
        toast.error("Request failed", {
          description: "Something went wrong",
        });
      }
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
      toast.success("Account successfully created");
    },
    onError() {
      toast.error("Something went wrong", {
        description: "Server is on maintenance mode please comeback later.",
      });
    },
  });

  return {
    signinMutation,
    signoutMutation,
    signupMutation,
  };
}
