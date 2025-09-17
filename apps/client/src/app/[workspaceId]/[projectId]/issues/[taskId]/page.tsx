import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Header } from "@/components/ui/header";
import { ChevronRight, Ellipsis, Layers2, Star } from "lucide-react";
// import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

export default function IssuesPage() {
  return (
    <React.Fragment>
      <Header>
        <ChevronRight size={12} className="text-muted-foreground" />
        <p className="font-semibold">WAR-12</p>
        <Button size="sm-icon" variant="ghost">
          <Star className="text-muted-foreground" />
        </Button>
        <Button size="sm-icon" variant="ghost">
          <Ellipsis className="text-muted-foreground" />
        </Button>
      </Header>
      <Container>
        <p>Issue details</p>
      </Container>
    </React.Fragment>
  );
}
