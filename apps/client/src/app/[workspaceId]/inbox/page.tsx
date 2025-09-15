import { Container } from "@/components/ui/container";
import { Header, HeaderTitle } from "@/components/ui/header";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

export default function InboxPage() {
  return (
    <React.Fragment>
      <Header>
        <SidebarTrigger />
        <HeaderTitle>Inbox</HeaderTitle>
      </Header>
      <Container>
        <div>Inbox Page</div>
      </Container>
    </React.Fragment>
  );
}
