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

export class IssueService {
  static create(data: CreateIssue) {
    return api.post("/issues", data);
  }
}
