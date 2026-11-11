"use client";

import { AdminShell } from "@/components/admin-shell";

export default function DeskLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
