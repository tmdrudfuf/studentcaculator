"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { trackRelatedToolClick } from "@/lib/analytics";

type TrackedToolLinkProps = {
  href: string;
  sourceTool: string;
  destinationTool: string;
  className?: string;
  children: ReactNode;
};

export function TrackedToolLink({
  href,
  sourceTool,
  destinationTool,
  className,
  children,
}: TrackedToolLinkProps) {
  return (
    <Link
      className={className}
      href={href}
      onClick={() => trackRelatedToolClick(sourceTool, destinationTool)}
    >
      {children}
    </Link>
  );
}
