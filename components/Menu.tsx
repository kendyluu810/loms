"use client";
import {
  IdCardLanyard,
  LayoutDashboard,
  Package,
  Route,
  Settings,
  Truck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Load Board", href: "/load_board", icon: Package },
  { title: "Tracking", href: "/tracking", icon: Route },
  { title: "Vehicles", href: "/vehicles", icon: Truck },
  { title: "Customers", href: "/customers", icon: Users },
  { title: "Carriers", href: "/carriers", icon: Users },
  { title: "Employees", href: "/employees", icon: IdCardLanyard },
  { title: "Settings", href: "/settings", icon: Settings },
];

const Menu = () => {
  const pathname = usePathname();
  return (
    <nav className="space-y-4">
      {menuItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.title}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-[#E8EDFB] text-[#3461ff]"
                : "text-gray-700 hover:bg-gray-100 hover:text-[#3461ff]"
            } justify-center lg:justify-start`}
          >
            <Icon className="w-7 h-7" />
            <span className="hidden lg:inline">{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Menu;
