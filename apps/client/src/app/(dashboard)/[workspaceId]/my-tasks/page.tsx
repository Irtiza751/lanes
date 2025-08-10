import React from "react";
import {
  Header,
  HeaderTitle,
  ToggleSidebarTrigger,
} from "../../../../components/ui/header";
import { Container } from "@/components/ui/container";

export default function MyTasksPage() {
  return (
    <React.Fragment>
      <Header>
        <ToggleSidebarTrigger />
        <HeaderTitle>My tasks</HeaderTitle>
      </Header>
      <Container>
        <div>MyTasksPage</div>
      </Container>
    </React.Fragment>
  );
}
