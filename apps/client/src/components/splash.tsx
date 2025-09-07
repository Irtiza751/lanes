"use client";

import Cookies from "js-cookie";
import { LogoIcon } from "./logo-icon";
import { AnimateFadeScale } from "./animate";
import { useEffect, useState } from "react";
export function SplashScreen() {
  const [sidebarWidth, setSidebarWidth] = useState("0");

  useEffect(() => {
    const width = Cookies.get("sidebar_width");
    if (width) {
      setSidebarWidth(width);
    }
  }, []);

  return (
    <div className="flex min-h-screen">
      <aside
        className="bg-background transition-[width] delay-500 duration-300"
        style={{ width: sidebarWidth || "10rem" }}
      />
      <main className="bg-sidebar flex-1 flex items-center justify-center flex-col gap-2 m-1.5 rounded">
        <AnimateFadeScale>
          <LogoIcon size={35} className="text-muted-foreground" />
        </AnimateFadeScale>
        <AnimateFadeScale>
          <p className="text-muted-foreground">Loading...</p>
        </AnimateFadeScale>
      </main>
    </div>
  );
}
