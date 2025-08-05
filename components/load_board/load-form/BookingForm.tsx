"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, MoreVerticalIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Employee, Vehicle } from "@/type";
import { toast } from "sonner";

interface BookingFormProps {
  loadId: string;
}

export default function BookingForm({ loadId }: BookingFormProps) {
  const router = useRouter();
  const [drivers, setDrivers] = useState<Employee[]>([]);
  const [dispatchers, setDispatchers] = useState<Employee[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const [selectedDriver, setSelectedDriver] = useState<Employee | null>(null);
  const [selectedDispatcher, setSelectedDispatcher] = useState<Employee | null>(
    null
  );
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const [pickupETA, setPickupETA] = useState("");
  const [pickupTime, setPickupTime] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [driversRes, dispatchersRes, vehiclesRes] = await Promise.all([
          fetch("/api/employees?position=Driver"),
          fetch("/api/employees?position=Dispatcher"),
          fetch("/api/vehicles"),
        ]);

        const driversData = await driversRes.json();
        const dispatchersData = await dispatchersRes.json();
        const vehiclesData = await vehiclesRes.json();

        setDrivers(driversData?.data || []);
        setDispatchers(dispatchersData?.data || []);
        setVehicles(vehiclesData?.vehicles || []);
        //console.log("Fetched data:", { drivers: driversData, dispatchers: dispatchersData });
      } catch (error) {
        //console.error("Error fetching data:", error);
        setDrivers([]);
        setDispatchers([]);
        setVehicles([]);
      }
    };

    fetchData();
  }, []);

  const handleSubmitBooking = async () => {
    if (
      !selectedDriver ||
      !selectedDispatcher ||
      !selectedVehicle ||
      !pickupETA ||
      !pickupTime
    ) {
      alert("Please select all required fields.");
      return;
    }

    const res = await fetch(`/api/load_board/${loadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        loadId: loadId,
        driver: selectedDriver?._id,
        dispatcher: selectedDispatcher?._id,
        vehicle: selectedVehicle?._id,
        pickupETA: pickupETA,
        pickupTime: pickupTime,
      }),
    });
    //console.log("Submitting booking data:", {
      driver: selectedDriver,
      dispatcher: selectedDispatcher,
      vehicle: selectedVehicle,
      pickupETA,
      pickupTime,
    });

    if (res.ok) {
      const result = await res.json();
      toast.success("Booking confirmed successfully!");
      router.push(`/load_board/${result.load.load_id}`);
    } else {
      const err = await res.json();
      toast.error(
        `Failed to confirm booking: ${err.message || "Unknown error"}`
      );
    }
  };

  return (
    <div className="space-y-4 ">
      <div className="flex flex-col justify-between p-4 border bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-[#022f7e] font-medium">Carrier Choice</h2>
          <div className="flex items-center space-x-2 text-[#022f7e] font-medium">
            <Label>Truck:</Label>
            <span>#{selectedVehicle?._id}</span>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center space-x-2">
          <Input type="text" placeholder="Search..." className="max-w-md" />
          <div className="flex items-center space-x-4 text-[#022f7e]">
            <Plus className="w-4 h-4" />
            <MoreVerticalIcon className="w-4 h-4" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {/* Driver Card */}
        <div className="col-span-2 border rounded-lg p-6 shadow-sm bg-white space-y-4">
          <h2 className="font-semibold text-lg text-[#022f7e]">Driver Info</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Driver</Label>
              <Select
                onValueChange={(val) =>
                  setSelectedDriver(drivers.find((d) => d._id === val) || null)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Driver" />
                </SelectTrigger>
                <SelectContent>
                  {drivers?.map((driver) => (
                    <SelectItem key={driver._id} value={driver._id}>
                      {driver.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={selectedDriver?.email || ""} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input value={selectedDriver?.phone || ""} readOnly />
            </div>
          </div>
        </div>

        {/* Dispatch Card */}
        <div className="col-span-2 border rounded-lg p-6 shadow-sm bg-white space-y-4">
          <h2 className="font-semibold text-lg text-[#022f7e]">
            Dispatch Info
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Dispatch</Label>
              <Select
                onValueChange={(val) =>
                  setSelectedDispatcher(
                    dispatchers.find((d) => d._id === val) || null
                  )
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Dispatcher" />
                </SelectTrigger>
                <SelectContent>
                  {dispatchers?.map((d) => (
                    <SelectItem key={d._id} value={d._id}>
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={selectedDispatcher?.email || ""} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input value={selectedDispatcher?.phone || ""} readOnly />
            </div>
          </div>
        </div>

        {/* Pickup Card */}
        <div className="col-span-2 border rounded-lg p-6 shadow-sm bg-white space-y-4">
          <h2 className="font-semibold text-lg text-[#022f7e]">Pickup Info</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Pickup ETA</Label>
              <Input
                type="time"
                value={pickupETA}
                onChange={(e) => setPickupETA(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Time</Label>
              <Input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Vehicle Number</Label>
              <Select
                onValueChange={(val) =>
                  setSelectedVehicle(
                    vehicles.find((v) => v._id === val) || null
                  )
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select vehicle" />
                </SelectTrigger>
                <SelectContent>
                  {vehicles?.map((v) => (
                    <SelectItem key={v._id} value={String(v._id)}>
                      {v.truckNumber}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Trailer</Label>
              <Input value={selectedVehicle?.trailerNumber || ""} readOnly />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button
          className="bg-blue-600 text-white"
          onClick={handleSubmitBooking}
        >
          Confirm Booking
        </Button>
      </div>
    </div>
  );
}
