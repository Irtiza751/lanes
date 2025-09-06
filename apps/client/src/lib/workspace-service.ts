import { api } from "@/api";
import { CreateWorkspaceForm } from "@/schemas";
import { WorkspaceResponse } from "@/types";

export class WorkspaceService {
  static create(data: CreateWorkspaceForm) {
    return api.post<WorkspaceResponse>("/workspace", data);
  }
}
