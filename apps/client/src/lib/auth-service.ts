import { api } from "@/api";
import { Signin } from "@/interfaces/signin.response";

export class AuthService {
  static signin(name: string, password: string) {
    return api.post<Signin>("/auth/signin", { name, password });
  }
}
