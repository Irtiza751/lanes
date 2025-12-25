"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Header, SubHeader } from "@/components/ui/header";
import { Layers2 } from "lucide-react";
import React from "react";
import { useParams } from "next/navigation";
import { useIssueQuery } from "@/hooks/use-issue";
import { IssuesBoard } from "./_components/issues-board";

const COLUMNS: Record<string, string> = {
  backlog: "Backlog",
  inProgress: "In Progress",
  testing: "Testing",
  review: "Review",
  done: "Done",
};

export default function IssuesPage() {
  const { projectId } = useParams();

  const { data } = useIssueQuery(projectId as string);
  const issues = data?.data;

  return (
    <React.Fragment>
      <Header>
        <Button className="text-muted-foreground" size="xs" variant="outline">
          <Layers2 className="size-3" />
          All Issues
        </Button>
      </Header>
      <SubHeader />
      <Container>
        <IssuesBoard
          issues={
            issues?.map((issue) => ({
              id: issue.id,
              name: issue.title,
              column: issue.status.category,
              owner: {
                image: "https://avatar.iran.liara.run/public",
                name: "John doe",
              },
            })) || []
          }
          columns={Object.entries(COLUMNS).map(([key, value]) => ({
            id: key,
            name: value,
            color: "orange",
          }))}
        />
      </Container>
    </React.Fragment>
  );
}
