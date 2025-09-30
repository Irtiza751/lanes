import { api } from "@/api";

export interface CreateIssue {
  title: string;
  description?: string;
  priority?: string;
  projectKey: string;
  labels?: string[];
  completedAt?: Date;
  assigneeId?: string;
}

export interface Task {
  id: string;
  key: string;
  title: string;
  priority: string;
  labels: any;
  storyPoints: number;
  completedAt: string;
  status: Status;
  assignee: Assignee;
}

export interface Status {
  id: string;
  name: string;
  color: string;
  category: string;
  sortOrder: number;
}

export interface Assignee {
  id: string;
}

export class IssueService {
  static create(data: CreateIssue) {
    return api.post("/issues", data);
  }

  static findByProjectId(projectId: string) {
    return api.get<Record<string, Task[]>>(`/issues/${projectId}`);
  }
}
