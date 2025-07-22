"use client";
import {
  ChartNoAxesCombined,
  FileText,
  Handshake,
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

const menuItem = {
  title: "Menu",
  items: [
    {
      title: "Dashboard",
      href: "/",
      icon: <LayoutDashboard />,
    },
    {
      title: "Load Board",
      href: "/load_board",
      icon: <Package />,
    },
    {
      title: "Tracking",
      href: "/tracking",
      icon: <Route />,
    },

    {
      title: "Analystics",
      href: "/analystics",
      icon: <ChartNoAxesCombined />,
    },
    {
      title: "Lego",
      href: "/lego",
      icon: <Handshake />,
    },
    {
      title: "Driver",
      href: "/drivers",
      icon: <Truck />,
    },
    {
      title: "Customers",
      href: "/customers",
      icon: <Users />,
    },
    {
      title: "Employees",
      href: "/employees",
      icon: <IdCardLanyard />,
    },
    {
      title: "Documents",
      href: "/documents",
      icon: <FileText />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings />,
    },
  ],
};

const Menu = () => {
  const pathname = usePathname();
  return (
    <div className="mt-4 text-sm">
      {menuItem.items.map((i) => {
        const isActive = pathname === i.href;

        return (
          <div className="flex flex-col gap-2 px-4 py-2" key={i.title}>
            <Link
              href={i.href}
              className={`flex items-center justify-center lg:justify-start gap-4 py-2 md:px-2 rounded-md font-medium transition-colors ${
                isActive
                  ? "border-l-2 lg:border-l-4 border-[#40BF60] text-[#40BF60]"
                  : "text-[#142B52] hover:text-[#40BF60]"
              }`}
            >
              <span>{i.icon}</span>
              <span className="hidden lg:block">{i.title}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
