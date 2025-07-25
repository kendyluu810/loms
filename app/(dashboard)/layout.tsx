import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Menu */}
      <aside className="hidden md:flex w-20 lg:w-60 flex-col p-4 bg-white border-r">
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
        <Navbar />
        <div className="p-4 flex-1">
          {children}
          <Toaster richColors position="top-right" />
        </div>
      </main>
    </div>
  );
}
