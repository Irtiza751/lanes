"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AuthService } from "@/lib/auth-service";
import { useQuery } from "@tanstack/react-query";

export function ProjectsPage() {
  const { data, error } = useQuery({
    queryKey: ["whoami"],
    queryFn: async () => AuthService.whoami(),
    retry: false,
  });

  if (error) return <div>Error loading user data</div>;

  return (
    <Card>
      <CardContent>
        <pre>{JSON.stringify(data?.data.user, null, 2)}</pre>
      </CardContent>
    </Card>
  );
}
