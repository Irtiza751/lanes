"use client";
import { ThemeProvider } from "./theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { WorkspaceProvider } from "./workspace-provider";
import { getQueryClient } from "@/lib/get-query-client";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <WorkspaceProvider>{children}</WorkspaceProvider>
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
