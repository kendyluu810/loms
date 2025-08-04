"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TrackingList from "@/components/tracking/TrackingList";
import RouteDetails from "@/components/tracking/RouteDetails";
import LoadDetails from "@/components/tracking/LoadDetails";
import { ExtendedLoadRow } from "@/type";

export default function TrackingPage() {
  const [selectedLoad, setSelectedLoad] = useState<ExtendedLoadRow | null>(
    null
  );
  const [loads, setLoads] = useState<ExtendedLoadRow[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTracking = async () => {
      try {
        const res = await fetch("/api/load_board/tracking");
        const json = await res.json();
        if (json.success) {
          console.log("Tracking data:", json.data);
          setLoads(json.data);
        } else {
          console.error("Failed to fetch tracking:", json.message);
        }
      } catch (error) {
        console.error("Error fetching tracking:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTracking();
  }, []);

  const filteredLoads = loads.filter((load) =>
    load.load_id?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="gap-4 p-4">
      {/* Search Bar & Name of the Company */}
      <div className="flex flex-row justify-between space-y-6">
        <div className="flex justify-between space-x-4">
          <Input
            placeholder="Search by Load ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[300px]"
          />
          <Button onClick={() => setSearch("")}>Clear</Button>
        </div>
        <div className="flex space-x-4">
          <h2 className="text-2xl font-bold text-[#022f7e]">
            {selectedLoad?.customer?.companyName || "Tracking Details"}
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 h-screen">
        <TrackingList
          loads={filteredLoads}
          loading={loading}
          onSelect={setSelectedLoad}
        />
        <RouteDetails load={selectedLoad} />
        <LoadDetails load={selectedLoad} />
      </div>
    </div>
  );
}
