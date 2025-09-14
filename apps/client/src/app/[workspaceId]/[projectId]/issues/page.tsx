import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Header, SubHeader } from "@/components/ui/header";
import { Layers2 } from "lucide-react";
// import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

export default function IssuesPage() {
  return (
    <React.Fragment>
      <Header>
        <Button className="text-muted-foreground" size="xs" variant="outline">
          <Layers2 />
          All Issues
        </Button>
      </Header>
      <SubHeader />
      <Container>
        <div>Inbox Page</div>
      </Container>
    </React.Fragment>
  );
}
