import {
  Bell,
  FileText,
  History,
  LayoutDashboard,
  ScanFace,
  Settings,
  ShieldCheck,
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
  { href: "/notifications", label: "Notifications", Icon: Bell },
  { href: "/profile", label: "Profile", Icon: User },
  { href: "/settings", label: "Settings", Icon: Settings },
];

export const APP_NAV_ADMIN: AppNavItem[] = [{ href: "/admin", label: "Admin", Icon: ShieldCheck }];

/** All nav items, for title lookup / command palette. */
export const APP_NAV_ALL: AppNavItem[] = [...APP_NAV, ...APP_NAV_ACCOUNT, ...APP_NAV_ADMIN];
