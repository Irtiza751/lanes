"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Header, SubHeader } from "@/components/ui/header";
import { Layers2 } from "lucide-react";
// import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
// import { KanbanBoard } from "./_components/kanban-board";
import KanbanBoard from "./_components/kanban-board";
import { useParams } from "next/navigation";
import { useIssueQuery } from "@/hooks/use-issue";

export default function IssuesPage() {
  const { projectId } = useParams();

  // const activeProject = useProjectMenuStore((state) => state.active);
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
        <KanbanBoard tasks={{}} />
      </Container>
    </React.Fragment>
  );
}
