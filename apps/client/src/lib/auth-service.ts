import { api } from "@/api";
// import { ServiceOptions } from "@/interfaces/service-options";
import { Signin, User } from "@/interfaces/signin.response";
import { SignupForm } from "@/schemas";

export class AuthService {
  static signin(name: string, password: string) {
    return api.post<Signin>("/auth/signin", { name, password });
  }

  // static whoami(options?: ServiceOptions) {
  static whoami() {
    return api.get<{ user: User }>("/auth/whoami");
  }

  static signout() {
    return api.post("/auth/signout");
  }

  static signup(data: SignupForm) {
    return api.post("/auth/signup", data);
  }
}
