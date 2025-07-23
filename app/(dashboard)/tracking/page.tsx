"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TrackingList from "@/components/tracking/TrackingList";
import RouteDetails from "@/components/tracking/RouteDetails";
import LoadDetails from "@/components/tracking/LoadDetails";

export default function TrackingPage() {
  const [selectedLoad, setSelectedLoad] = useState<any>(null);
  const [loads, setLoads] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchTracking = async () => {
      const res = await fetch("/api/tracking");
      const json = await res.json();
      setLoads(json.data || []);
    };
    fetchTracking();
  }, []);

  const filteredLoads = loads.filter((load) =>
    load._id.toLowerCase().includes(search.toLowerCase())
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
          <h2 className="text-lg font-semibold text-[#022f7e]">
            {selectedLoad?.customer?.name || "Tracking Details"}
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 h-screen">
        <TrackingList loads={filteredLoads} onSelect={setSelectedLoad} />
        <RouteDetails load={selectedLoad} />
        <LoadDetails load={selectedLoad} />
      </div>
    </div>
  );
}
