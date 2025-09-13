"use client";

import { AnimateFadeIn } from "@/components/animate";
import { SplashScreen } from "@/components/splash";
import { User } from "@/interfaces/signin.response";
import { AuthService } from "@/lib/auth-service";
import { sleep } from "@/lib/sleep";
import { WorkspaceService } from "@/lib/workspace-service";
import { useWorkspaceStore } from "@/stores/useWorkspaceStore";
import { useQueries } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect, useMemo } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";

interface SessionState {
  user: User | null;
}

const SessionContext = React.createContext<SessionState | null>(null);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

const publicPages = ["/", "/signin", "/signup"];

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const setAvailableWorkspaces = useWorkspaceStore(
    (state) => state.setAvailable
  );
  const setActiveWorkspace = useWorkspaceStore((state) => state.setActive);

  const results = useQueries({
    queries: [
      {
        queryKey: ["whoami"],
        queryFn: () => AuthService.whoami(), // fetch user data
        staleTime: Infinity,
        retry: 1,
        enabled: !publicPages.includes(pathname), // don’t call on public pages
      },
      {
        queryKey: ["workspaces"],
        queryFn: () => WorkspaceService.fetch(),
        staleTime: Infinity,
        enabled: !publicPages.includes(pathname),
      },
      {
        queryKey: ["sleep"],
        queryFn: () => sleep(2000), // just for splash effect
      },
    ],
  });

  const [whoami, workspace] = results;

  // Determine loading state
  const isLoading = results.some((q) => q.isLoading);
  // console.log(workspaces.data?.data);

  // Handle session error (401)
  useEffect(() => {
    if (whoami.isError && !publicPages.includes(pathname)) {
      toast.error("Session expired", {
        description: "Please sign in again",
      });
      router.replace("/signin");
    }
  }, [whoami.isError, pathname, router]);

  // populate workspace store
  useEffect(() => {
    console.log(workspace.data?.data);
    if (workspace.isSuccess && workspace.data.data.length) {
      const { data } = workspace.data;
      setAvailableWorkspaces(data);
      const lastActiveProject = Cookies.get("lap");
      if (lastActiveProject) {
        const slug = lastActiveProject.split("/")[0];
        const workspace =
          data.find((available) => available.workspace.slug === slug) ?? null;
        router.push(`/${lastActiveProject}`);
        setActiveWorkspace(workspace);
      } else {
        const activeWorkspace = data[0]?.workspace;
        Cookies.set("lap", `${activeWorkspace.slug}/`);
        router.push(`/${activeWorkspace.slug}/`);
      }
    } else {
      router.push("/create-workspace");
    }
  }, [workspace.isSuccess, router]);

  // Show splash screen while loading

  const value = useMemo(
    () => ({
      user: whoami.data?.data.user ?? null,
    }),
    [whoami]
  );

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <SessionContext.Provider value={value}>
      <AnimateFadeIn>{children}</AnimateFadeIn>
    </SessionContext.Provider>
  );
}
