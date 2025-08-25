import { LogoIcon } from "@/components/logo-icon";
import React from "react";

export default function Loading() {
  return (
    <div className="relative inset-0 flex justify-center items-center h-full">
      <div className="flex flex-col items-center gap-2 text-muted-foreground">
        <LogoIcon size={40} />
        Loading...
      </div>
    </div>
  );
}
