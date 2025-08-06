"use client";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Menu */}
            <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-60 p-4 bg-white border-r
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:flex md:flex-col
        `}
      >
        <div className="flex items-center justify-center gap-2 mb-8">
          <Link
            href="/"
            className="flex justify-center lg:justify-start items-center gap-2 mb-6"
          >
            <Image src="/logo.svg" alt="Logo" width={40} height={32} />
          </Link>
        </div>
        <Menu />
      </aside>
      {/* RIGHT */}
      <main className="flex-1 bg-[#F7F8FA] overflow-auto flex flex-col">
        <Navbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        <div className="p-4 flex-1">
          {children}
          <Toaster richColors position="top-right" />
        </div>
      </main>
    </div>
  );
}
