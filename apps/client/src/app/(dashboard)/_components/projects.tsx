"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AuthService } from "@/lib/auth-service";
import { useSuspenseQuery } from "@tanstack/react-query";

export function ProjectsPage() {
  const { data, error } = useSuspenseQuery({
    queryKey: ["whoami"],
    queryFn: async () => AuthService.whoami(),
  });

  if (error) return <div>Error loading user data</div>;

  return (
    <Card>
      <CardContent>
        <pre>{JSON.stringify(data.data, null, 2)}</pre>
      </CardContent>
    </Card>
  );
}
