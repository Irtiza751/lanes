export interface Workspace {
  id: number;
  slug: string;
  ownerId: string;
  name: string;
  logoUrl: string;
  color: string;
  description?: string;
}

export interface CreateWorkspaceResponse {
  message: string;
  data: Data;
}

export interface Data {
  id: string;
  workspaceUsers: unknown[];
  createdAt: string;
  updatedAt: string;
  name: string;
  slug: string;
}
