import { ComponentsSidebar } from "@/components/layout/ComponentsSidebar";
import { ComponentsHeader } from "@/components/layout/ComponentsHeader";

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
        {/* Top Navbar with Integrated Command Palette */}
        <ComponentsHeader />

        {/* Page Content */}
        <main className="flex-1 p-5 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
