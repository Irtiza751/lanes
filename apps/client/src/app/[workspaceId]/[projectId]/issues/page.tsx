import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Header, SubHeader } from "@/components/ui/header";
import { Layers2 } from "lucide-react";
// import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
// import { KanbanBoard } from "./_components/kanban-board";
import KanbanBoard from "./_components/kanban-board";

export default function IssuesPage() {
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
        <KanbanBoard />
      </Container>
    </React.Fragment>
  );
}
