import { Editor } from "@/components/ui/editor";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";

export function IssueDetail({ className }: { className?: string }) {
  return (
    <div className={cn("px-6 space-y-4 pt-4", className)}>
      <Input
        placeholder="Issue title"
        className="bg-transparent dark:bg-transparent border-none lg:text-xl font-semibold focus-visible:ring-0 p-0 h-auto"
      />
      <Editor
        namespace="issue-detail"
        value={
          '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Test issue description","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'
        }
      />
    </div>
  );
}
