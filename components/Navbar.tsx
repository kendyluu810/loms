import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Mail, Bell, Search, Menu } from "lucide-react";

interface NavbarProps {
  onToggleSidebar?: () => void; // nhận prop toggle
}

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  return (
    <header className="bg-white px-4 py-2 border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Search bar */}
        <div className="hidden flex-1 md:flex justify-center">
          <div className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-sm w-full max-w-xs bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
            <Search className="text-gray-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Right section: Icons + Auth */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex">
            <button className="relative p-2 hover:bg-gray-100 rounded-full">
              <Bell className="w-5 h-5 text-gray-700" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Mail className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          <SignedOut>
            <SignInButton mode="modal" />
          </SignedOut>

          <SignedIn>
            <UserButton showName afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
