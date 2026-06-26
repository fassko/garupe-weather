"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { syncTheme } from "@/lib/theme";

/** Keeps dark mode across client-side navigations (e.g. locale switch). */
export function ThemeSync() {
  const pathname = usePathname();

  useEffect(() => {
    syncTheme();
  }, [pathname]);

  return null;
}
