import { api } from "@/api";
import { CreateWorkspaceForm } from "@/schemas";

export class WorkspaceService {
  static create(data: CreateWorkspaceForm) {
    return api.post("/workspace", data);
  }
}
