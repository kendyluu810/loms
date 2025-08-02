"use client";
import BookingForm from "@/components/load_board/load-form/BookingForm";
import { Badge } from "@/components/ui/badge";
import { ExtendedLoadRow, LoadRow } from "@/type";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookingPage() {
  const { id } = useParams();
  const [load, setLoad] = useState<ExtendedLoadRow | null>(null);

  useEffect(() => {
    const fetchLoad = async () => {
      try {
        const res = await fetch(`/api/load_board/${id}`);
        const data = await res.json();
        setLoad(data);
      } catch (error) {
        console.error("Failed to fetch load", error);
      }
    };
    if (id) fetchLoad();
  }, [id]);

  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      <div className="flex items-center justify-between border-b pb-4">
        {/* left */}
        <div className="space-y-4 p-4">
          <h2 className="font-bold text-2xl text-[#022f7e]">Book Load</h2>
          <div className="flex items-center space-x-4">
            <h2 className="text-[#022f7e] font-medium">#{load?.load_id}</h2>
            <div className="flex items-center gap-2">
              <Badge className="border border-green-500 bg-white text-[#022f7e]">
                {load?.status}
              </Badge>
              <Badge className="border border-blue-500 bg-white text-[#022f7e]">
                {load?.shipment.equipmentType || "N/A"}
              </Badge>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="space-y-4 p-4">
          <h2 className="text-[#022f7e] text-2xl font-medium">
            {load?.customer.companyName}
          </h2>
          <div className="flex items-center space-x-2">
            <h2 className="text-[#022f7e]">{load?.customer.contactPerson}</h2>
            <h2 className="text-[#022f7e]">{load?.customer.contactPhone}</h2>
          </div>
        </div>
      </div>

      {load?._id && <BookingForm loadId={load._id} />}
    </div>
  );
}
