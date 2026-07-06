import {
  FileText,
  History,
  LayoutDashboard,
  ScanFace,
  Settings,
  Target,
  User,
  type LucideIcon,
} from "lucide-react";

export interface AppNavItem {
  href: string;
  label: string;
  Icon: LucideIcon;
}

export const APP_NAV: AppNavItem[] = [
  { href: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/scan", label: "Face Scan", Icon: ScanFace },
  { href: "/history", label: "History", Icon: History },
  { href: "/reports", label: "Reports", Icon: FileText },
  { href: "/goals", label: "Goals", Icon: Target },
];

export const APP_NAV_ACCOUNT: AppNavItem[] = [
  { href: "/profile", label: "Profile", Icon: User },
  { href: "/settings", label: "Settings", Icon: Settings },
];
