"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function MainNav() {
  const pathname = usePathname();

  const sections = [
    {
      name: "Polls",
      path: "/polls",
      description: "Create and participate in community polls on various topics.",
    },
    {
      name: "Posts",
      path: "/posts",
      description: "Share your thoughts and ideas with the community.",
    },
    {
      name: "Questions",
      path: "/questions",
      description: "Ask questions and get answers from community members.",
    },
    {
      name: "Discussions",
      path: "/discussions",
      description: "Engage in meaningful conversations with other community members.",
    },
  ];

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="font-bold inline-block">Community Hub</span>
      </Link>
      <nav className="hidden md:flex gap-6">
        {sections.map((section) => (
          <Popover key={section.path}>
            <PopoverTrigger asChild>
              <Link
                href={section.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === section.path ? "text-primary" : "text-muted-foreground"
                )}
              >
                {section.name}
              </Link>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">{section.name}</h4>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
            </PopoverContent>
          </Popover>
        ))}
      </nav>
    </div>
  );
}