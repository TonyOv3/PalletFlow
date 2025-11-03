import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export function DashboardLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      {/* Sidebar - Fixed width */}
      <Sidebar />

      {/* Main Content Area - Takes remaining space */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
