import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NavLink } from "@/data/sidelinks";
import { Dispatch, SetStateAction } from "react";

interface DashboardNavProps {
  items: NavLink[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export function DashboardNav({ items, setOpen }: DashboardNavProps) {
  const location = useLocation();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        return (
          item.href && (
            <Link
              key={index}
              to={item.href}
              onClick={() => {
                if (setOpen) setOpen(false);
              }}
            >
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  location.pathname === item.href ? "bg-accent" : "transparent"
                )}
              >
                <div className="mr-2 h-4 w-4">{item.icon}</div>
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
}
