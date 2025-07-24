"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import GeneralTabs from "@/components/load_board/Tabs/GeneralTab";
import { useRouter } from "next/navigation";

export default function LoadDetails() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"general" | "invoice" | "history">(
    "general"
  );
  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      <div className="flex items-center justify-between border-b pb-4">
        {/* left */}
        <div className="space-y-4 p-4">
          <h2 className="font-bold text-2xl text-[#022f7e]">Open Load</h2>
          <div className="flex items-center space-x-4">
            <h2 className="text-[#022f7e] font-medium">#64756879</h2>
            <div className="flex items-center gap-2">
              <Badge className="border border-green-500 bg-white text-[#022f7e]">
                Posted
              </Badge>
              <Badge className="border border-blue-500 bg-white text-[#022f7e]">
                Van
              </Badge>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="space-y-4 p-4">
          <h2 className="text-[#022f7e] text-2xl font-medium">
            LG Electronics
          </h2>
          <div className="flex items-center space-x-2">
            <h2 className="text-[#022f7e]">John Doe</h2>
            <h2 className="text-[#022f7e]">+1 123-456-7890</h2>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center border-b px-4 py-2 sticky top-0 z-10">
        <div className="flex space-x-4">
          <Button
            variant={activeTab === "general" ? "default" : "outline"}
            onClick={() => setActiveTab("general")}
            className={cn(
              "text-sm font-medium",
              activeTab === "general" && "text-white border-b-2 bg-blue-600"
            )}
          >
            General
          </Button>
          <Button
            variant={activeTab === "invoice" ? "default" : "outline"}
            onClick={() => setActiveTab("invoice")}
            className={cn(
              "text-sm font-medium",
              activeTab === "invoice" && "text-white border-b-2 bg-blue-600"
            )}
          >
            Invoice
          </Button>
          <Button
            variant={activeTab === "history" ? "default" : "outline"}
            onClick={() => setActiveTab("history")}
            className={cn(
              "text-sm font-medium",
              activeTab === "history" && "text-white border-b-2 bg-blue-600"
            )}
          >
            History
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => router.push("/load_board")}>
            Cancel
          </Button>
          <Button>Booking</Button>
        </div>
      </div>
      <div className="p-4">
        {activeTab === "general" && <GeneralTabs />}
        {activeTab === "invoice" && (
          <div className="text-center text-gray-500">Invoice details here</div>
        )}
        {activeTab === "history" && (
          <div className="text-center text-gray-500">History details here</div>
        )}
      </div>
    </div>
  );
}
