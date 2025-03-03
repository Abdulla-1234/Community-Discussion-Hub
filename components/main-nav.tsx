"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PieChart } from "lucide-react";

export function MainNav() {
  const pathname = usePathname();
  
  return (
    <div className="mr-4 flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <PieChart className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          Community Platform
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/polls"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/polls" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Polls
        </Link>
        <Link
          href="/discussions"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/discussions" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Discussions
        </Link>
        <Link
          href="/questions"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/questions" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Questions
        </Link>
      </nav>
    </div>
  );
}