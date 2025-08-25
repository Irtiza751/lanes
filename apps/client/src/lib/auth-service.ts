import { api } from "@/api";
import { ServiceOptions } from "@/interfaces/service-options";
import { Signin } from "@/interfaces/signin.response";

export class AuthService {
  static signin(name: string, password: string) {
    return api.post<Signin>("/auth/signin", { name, password });
  }

  static whoami(options?: ServiceOptions) {
    console.log("Access Token:", options?.accessToken);
    api.defaults.headers.common["Authorization"] = options?.accessToken;
    return api.get("/auth/whoami");
  }

  static signout() {
    return api.post("/auth/signout");
  }
}
