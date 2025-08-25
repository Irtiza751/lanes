import { LogoIcon } from "@/components/logo-icon";
import React from "react";

export default function Loading() {
  return (
    <div className="relative inset-0 flex justify-center items-center h-full">
      <div className="flex flex-col items-center gap-3 text-muted-foreground">
        <LogoIcon size={45} className="animate-fade-in-scale" />
        Loading...
      </div>
    </div>
  );
}
