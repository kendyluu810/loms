"use client";
import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import GeneralTabs from "@/components/load_board/load-form/Tabs/GeneralTab";
import { useParams, useRouter } from "next/navigation";
import { ExtendedLoadRow } from "@/type";
import InvoiceTabs from "@/components/load_board/load-form/Tabs/InvoiceTabs";
import { toast } from "sonner";

export default function LoadDetails() {
  const router = useRouter();
  const { id } = useParams();
  const [load, setLoad] = useState<ExtendedLoadRow | null>(null);
  const [activeTab, setActiveTab] = useState<"general" | "invoice" | "history">(
    "general"
  );

  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      case "in_progress":
        return "bg-blue-100 text-blue-800 border border-blue-300";
      case "delivered":
        return "bg-green-100 text-green-800 border border-green-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };

  const formatStatus = (status: string) =>
    status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const fetchLoad = useCallback(async () => {
    try {
      const res = await fetch(`/api/load_board/${id}`);
      const data = await res.json();
      if (res.ok) {
        setLoad(data);
      } else {
        toast.error(data.message || "Failed to fetch load");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Failed to fetch load: ${error.message}`);
      } else {
        toast.error("Failed to fetch load: Unknown error");
      }
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchLoad();
  }, [id, fetchLoad]);
  const handleUpdateLoad = (newData: Partial<ExtendedLoadRow>) => {
    setLoad((prev) =>
      prev
        ? {
            ...prev,
            ...newData,
            route: newData.route ?? prev.route,
            status: newData.status ?? prev.status,
          }
        : prev
    );
  };

  if (!load) {
    return <div className="p-4 text-gray-500">Loading Load Data...</div>;
  }

  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-4 gap-4">
        {/* left */}
        <div className="space-y-2 md:space-y-4 p-2 md:p-4">
          <h2 className="font-bold text-xl sm:text-2xl text-[#022f7e]">
            Open Load
          </h2>
          <div className="flex items-center space-x-4">
            <h2 className="text-[#022f7e] font-medium">#{load.load_id}</h2>
            <div className="flex items-center gap-2">
              {load.status && (
                <span
                  className={`text-xs px-1 md:px-2 md:py-1 rounded font-medium ${getStatusStyle(
                    load.status
                  )}`}
                >
                  {formatStatus(load.status || "Unknown")}
                </span>
              )}
              <Badge className="text-xs px-1 md:px-2 md:py-1 rounded font-medium border border-blue-500 bg-white text-[#022f7e]">
                {load.shipment?.equipmentType || "N/A"}
              </Badge>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="space-y-2 md:space-y-4 p-2 md:p-4">
          <h2 className="text-[#022f7e] text-xl sm:text-2xl font-medium">
            {load.customer.companyName}
          </h2>
          <div className="flex items-center space-x-2 text-sm">
            <h2 className="text-[#022f7e]">{load.customer.contactPerson}</h2>
            <h2 className="text-[#022f7e]">{load.customer.contactPhone}</h2>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b px-2 md:px-4 py-2 sticky top-0 z-10 gap-4">
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
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => {
              if (!load.driver || !load.vehicle) {
                router.push(`/load_board/${id}/booking`);
              } else {
                toast.warning("This load has already been booked.");
              }
            }}
            disabled={!!load.driver && !!load.vehicle}
          >
            Booking
          </Button>
        </div>
      </div>
      <div className="p-2 md:p-4">
        {activeTab === "general" && (
          <GeneralTabs load={load} onUpdateLoad={handleUpdateLoad} />
        )}
        {activeTab === "invoice" && <InvoiceTabs load={load} />}
        {activeTab === "history" && (
          <div className="text-center text-gray-500">History details here</div>
        )}
      </div>
    </div>
  );
}
