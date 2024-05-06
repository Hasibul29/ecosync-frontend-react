import { DashboardNav } from "@/components/dashboard-nav";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { sidelinks } from "@/data/sidelinks";
import useUserStore from "@/store";
import { MenuIcon } from "lucide-react";
import { useState } from "react";

export function SidebarSmall() {
  const [open, setOpen] = useState(false);
  const { user } = useUserStore();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="left" className="!px-0">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Overview
            </h2>
            <div className="space-y-1">
              <DashboardNav items={sidelinks.filter((item) => item.access.includes(user.role?.name ?? ""))} setOpen={setOpen} />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
