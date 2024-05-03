import { DashboardNav } from "@/components/dashboard-nav";
import { sidelinks } from "@/data/sidelinks";
import { cn } from "@/lib/utils";
import useUserStore from "@/store";

export default function Sidebar() {
  const { user } = useUserStore();
  console.log(user);
  return (
    <nav className={cn(`h-screen pt-16`)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
              Overview
            </h2>
            <DashboardNav items={sidelinks.filter((item) => item.access.includes(user.role?.name ?? ""))} />
          </div>
        </div>
      </div>
    </nav>
  );
}
