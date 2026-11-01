import { ComponentsSidebar } from "@/components/layout/ComponentsSidebar";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      {/* Sidebar */}
      <ComponentsSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="hidden md:flex h-16 items-center justify-between border-b border-border bg-surface px-8 sticky top-0 z-20">
          <div className="flex items-center gap-4 text-xs">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Website</span>
            </Link>
            <span className="text-border">/</span>
            <span className="font-medium text-foreground">Component Library</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">
              Production Real Estate Components
            </span>
            <ThemeToggle variant="segmented" />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-5 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
