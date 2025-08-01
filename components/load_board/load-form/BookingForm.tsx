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

export default function BookingForm() {
  const router = useRouter();
  const [drivers, setDrivers] = useState<any[]>([]);
  const [dispatchers, setDispatchers] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);

  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const [selectedDispatcher, setSelectedDispatcher] = useState<any>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [driverRes, dispatcherRes, vehicleRes] = await Promise.all([
        fetch("/api/employees?position=Driver"),
        fetch("/api/employees?position=Dispatcher"),
        fetch("/api/vehicles"),
      ]);


      const driverData = await driverRes.json();
      const dispatcherData = await dispatcherRes.json();
      const vehicleData = await vehicleRes.json();

      setDrivers(driverData?.data || []);
      setDispatchers(dispatcherData?.data || []);
      setVehicles(vehicleData.vehicles || []);
    };

    fetchData();
  }, []);

  const handleDriverChange = async (driverId: string) => {
    const res = await fetch(`/api/employees/${driverId}`);
    const data = await res.json();
    setSelectedDriver(data);
  };

  const handleDispatcherChange = async (dispatcherId: string) => {
    const res = await fetch(`/api/employees/${dispatcherId}`);
    const data = await res.json();
    setSelectedDispatcher(data);
  };

  const handleVehicleChange = async (_id: string) => {
    const res = await fetch(`/api/vehicles/${_id}`);
    const data = await res.json();
    setSelectedVehicle(data);
  };

  return (
    <div className="space-y-4 ">
      <div className="flex flex-col justify-between p-4 border bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-[#022f7e] font-medium">Carrier Choice</h2>
          <div className="flex items-center space-x-2 text-[#022f7e] font-medium">
            <Label>Truck:</Label>
            <span>#9824</span>
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
              <Select onValueChange={handleDriverChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Driver" />
                </SelectTrigger>
                <SelectContent>
                  {drivers.map((driver) => (
                    <SelectItem key={driver._id} value={driver._id}>
                      {driver.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={selectedDriver?.email || ""} disabled />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input value={selectedDriver?.phone || ""} disabled />
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
              <Select onValueChange={handleDispatcherChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Dispatcher" />
                </SelectTrigger>
                <SelectContent>
                  {dispatchers.map((d) => (
                    <SelectItem key={d._id} value={d._id}>
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={selectedDispatcher?.email || ""} disabled />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input value={selectedDispatcher?.phone || ""} disabled />
            </div>
          </div>
        </div>

        {/* Pickup Card */}
        <div className="col-span-2 border rounded-lg p-6 shadow-sm bg-white space-y-4">
          <h2 className="font-semibold text-lg text-[#022f7e]">Pickup Info</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Pickup ETA</Label>
              <Input type="time" defaultValue="09:00" />
            </div>
            <div className="space-y-2">
              <Label>Time</Label>
              <Input type="time" defaultValue="09:00" />
            </div>
            <div className="space-y-2">
              <Label>Vehicle Number</Label>
              <Select onValueChange={(value) => handleVehicleChange(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select vehicle" />
                </SelectTrigger>
                <SelectContent>
                  {vehicles.map((v) => (
                    <SelectItem key={v._id} value={String(v._id)}>
                      {v.truckNumber}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Trailer</Label>
              <Input value={selectedVehicle?.trailerNumber || ""} disabled />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button className="bg-blue-600 text-white">Confirm Booking</Button>
      </div>
    </div>
  );
}
