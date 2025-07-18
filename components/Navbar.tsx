import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Mail, Bell, Search } from "lucide-react";

const Navbar = () => {
  return (
    <div className="bg-white p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Search bar */}
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-4 border rounded-full px-4 py-2 text-xs w-[300px]">
            <Search width={14} height={14} />
            <input
              type="text"
              placeholder="Search..."
              className="outline-none bg-transparent w-full"
            />
          </div>
        </div>

        {/* Right: Icons + User */}
        <div className="flex items-center gap-4 space-x-4">
          <Bell width={24} height={24} />
          <Mail width={24} height={24} />

          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton showName />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
