import * as React from "react";
import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Aura Estates Portal | Executive Real Estate Operations",
  description:
    "Confidential executive portal for luxury real estate asset management, escrows, and investor relations.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
