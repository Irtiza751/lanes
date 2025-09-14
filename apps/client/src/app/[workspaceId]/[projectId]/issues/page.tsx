import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Header, HeaderTitle } from "@/components/ui/header";
import { Layers, Layers2 } from "lucide-react";
// import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

export default function IssuesPage() {
  return (
    <React.Fragment>
      <Header>
        <Button size="xsm" variant="outline">
          <Layers2 size={2} />
          All Issues
        </Button>
      </Header>
      <Container>
        <div>Inbox Page</div>
      </Container>
    </React.Fragment>
  );
}
