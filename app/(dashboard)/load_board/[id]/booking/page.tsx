"use client";

import BookingForm from "@/components/load_board/load-form/BookingForm";
import { Badge } from "@/components/ui/badge";
import { ExtendedLoadRow } from "@/type";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function BookingPage() {
  const { id } = useParams();
  const [load, setLoad] = useState<ExtendedLoadRow | null>(null);

  const getVariant = (status: string) => {
    switch (status) {
      case "posted":
        return "secondary"; // xám nhạt
      case "booked":
      case "in_progress":
        return "outline"; // xanh dương viền
      case "completed":
        return "default"; // xanh lá
      case "cancelled":
        return "destructive"; // đỏ
      default:
        return "secondary";
    }
  };

  const formatStatus = (status: string) =>
    status
      .replace(/_/g, " ") // "in_progress" → "in progress"
      .replace(/\b\w/g, (c) => c.toUpperCase()); // "in progress" → "In Progress"

  useEffect(() => {
    const fetchLoad = async () => {
      try {
        const res = await fetch(`/api/load_board/${id}`);
        const data: ExtendedLoadRow = await res.json();
        setLoad(data);
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Something went wrong";
        toast.error("Failed to fetch load: " + message);
      }
    };
    if (id) fetchLoad();
  }, [id]);

  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      {/* Top Info Section - Responsive */}
      <div className="flex flex-col lg:flex-row justify-between border-b pb-4 gap-6">
        {/* Left Info */}
        <div className="space-y-4">
          <h2 className="font-bold text-2xl text-[#022f7e]">Book Load</h2>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-[#022f7e] font-medium text-lg">
              #{load?.load_id}
            </h2>
            {load?.status && (
              <Badge variant={getVariant(load.status)}>
                {formatStatus(load.status)}
              </Badge>
            )}
            <Badge className="border border-blue-500 bg-white text-[#022f7e]">
              {load?.shipment?.equipmentType || "N/A"}
            </Badge>
          </div>
        </div>
        {/* Right Info */}
        <div className="space-y-2">
          <h2 className="text-[#022f7e] text-2xl font-medium text-wrap break-words">
            {load?.customer?.companyName}
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0">
            <h2 className="text-[#022f7e]">{load?.customer?.contactPerson}</h2>
            <h2 className="text-[#022f7e]">{load?.customer?.contactPhone}</h2>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      {load?._id && <BookingForm loadId={load.load_id} />}
    </div>
  );
}
