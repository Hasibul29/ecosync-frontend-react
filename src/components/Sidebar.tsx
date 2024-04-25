import { DashboardNav } from "@/components/dashboard-nav";
import { sidelinks } from "@/data/sidelinks";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  return (
    <nav className={cn(`h-screen pt-16`)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
              Overview
            </h2>
            <DashboardNav items={sidelinks} />
          </div>
        </div>
      </div>
    </nav>
  );
}
