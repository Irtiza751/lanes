import { api } from "@/api";
import { CreateWorkspaceForm } from "@/schemas";
import { CreateWorkspaceResponse } from "@/types";

export type Workspaces = {
  id: string;
  joinedAt: string;
  workspace: Workspace;
}[];

export interface Workspace {
  id: string;
  name: string;
  slug: string;
}

export interface ProjectMenus {
  workspace: string;
  projects: Project[];
}

export interface Project {
  id: string;
  name: string;
  key: string;
}

export class WorkspaceService {
  static create(data: CreateWorkspaceForm) {
    return api.post<CreateWorkspaceResponse>("/workspace", data);
  }

  static fetch() {
    return api.get<Workspaces>("/workspace");
  }

  static fetchProjects(workspace: string) {
    return api.get<ProjectMenus>(`/user/project-menus/${workspace}`);
  }
}
