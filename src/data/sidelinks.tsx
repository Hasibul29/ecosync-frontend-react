import {
  IconApps,
  IconChecklist,
  IconHexagonNumber4,
  IconLayoutDashboard,
  IconMessages,
  IconCurrencyDollar,
} from "@tabler/icons-react";

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: JSX.Element;
  access: string[];
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export const sidelinks: SideLink[] = [
  {
    title: "Dashboard",
    label: "",
    href: "/dashboard",
    icon: <IconLayoutDashboard size={18} />,
    access: ["Admin","STS Manager","Landfill Manager"],
  },
  {
    title: "Users",
    label: "",
    href: "/dashboard/users",
    icon: <IconChecklist size={18} />,
    access: ["Admin"],
  },
  {
    title: "Role",
    label: "",
    href: "/dashboard/role",
    icon: <IconChecklist size={18} />,
    access: ["Admin"],
  },
  {
    title: "Vehicles",
    label: "",
    href: "/dashboard/vehicles",
    icon: <IconApps size={18} />,
    access: ["Admin"],
  },
  {
    title: "STS",
    label: "",
    href: "/dashboard/sts",
    icon: <IconMessages size={18} />,
    access: ["Admin"],
  },
  {
    title: "Landfill",
    label: "",
    href: "/dashboard/landfill",
    icon: <IconMessages size={18} />,
    access: ["Admin"],
  },
  {
    title: "STS Entry",
    label: "",
    href: "/dashboard/stsentry",
    icon: <IconMessages size={18} />,
    access: ["Admin","STS Manager"],
  },
  {
    title: "STS Vehicle",
    label: "",
    href: "/dashboard/sts/vehicle",
    icon: <IconMessages size={18} />,
    access: ["Admin","STS Manager"],
  },
  {
    title: "Landfill Entry",
    label: "",
    href: "/dashboard/landfillentry",
    icon: <IconHexagonNumber4 size={18} />,
    access: ["Admin","Landfill Manager"],
  },
  {
    title: "Billings",
    label: "",
    href: "/dashboard/billing",
    icon: <IconCurrencyDollar size={18} />,
    access: ["Admin","Landfill Manager"],
  },
];
