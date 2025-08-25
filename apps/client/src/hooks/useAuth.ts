import { AuthService } from "@/lib/auth-service";
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

  return {
    signinMutation,
  };
}
