"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Pencil, MoreVerticalIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function BookingForm() {
  const { register } = useForm();
  const router = useRouter();

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
          <Input type="text" placeholder="Enter Carrier Name" className="max-w-md" />
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
              <Input placeholder="Denis Villeneuve" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input placeholder="driver@lgp.com" />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input placeholder="(360) 800-2399" />
            </div>
          </div>
        </div>

        {/* Dispatch Card */}
        <div className="col-span-2 border rounded-lg p-6 shadow-sm bg-white space-y-4">
          <h2 className="font-semibold text-lg text-[#022f7e]">Dispatch Info</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Dispatch</Label>
              <Input placeholder="Phillip Arnolff" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input placeholder="dispatch@lgp.com" />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input placeholder="(360) 800-2399" />
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
              <Label>Truck Empty</Label>
              <Input defaultValue="No" />
            </div>
            <div className="space-y-2">
              <Label>Trailer</Label>
              <Input defaultValue="FG66244" />
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
