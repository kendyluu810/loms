"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "../ui/label";
import { toast } from "sonner";

export default function AddCarrierModal({ onAdded }: { onAdded: () => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    mcNumber: "",
    dotNumber: "",
    email: "",
    phone: "",
    address: "",
    equipmentTypes: "", // comma-separated string, will be split into array
  });

  const handleSubmit = async () => {
    const payload = {
      ...form,
      equipmentTypes: form.equipmentTypes
        ? form.equipmentTypes.split(",").map((s) => s.trim())
        : [],
    };

    //console.log("payload", payload);

    const res = await fetch("/api/carriers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      toast.error("Failed to add carrier");
      return;
    }

    setOpen(false);
    setForm({
      name: "",
      mcNumber: "",
      dotNumber: "",
      email: "",
      phone: "",
      address: "",
      equipmentTypes: "",
    });
    onAdded();
    toast.success("Carrier added successfully");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#3461ff] text-white font-semibold hover:bg-white hover:text-[#3461ff]">
          Add Carrier
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl h-fit">
        <DialogHeader>
          <DialogTitle className="text-[#022f7e] font-bold text-2xl">
            Add Carrier
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
          <div className="space-y-4">
            <Label className="text-[#022f7e] font-semibold">Name</Label>
            <Input
              placeholder="Carrier Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="space-y-4">
            <Label className="text-[#022f7e] font-semibold">Phone</Label>
            <Input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="space-y-4">
            <Label className="text-[#022f7e] font-semibold">Email</Label>
            <Input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="space-y-4">
            <Label className="text-[#022f7e] font-semibold">MC Number</Label>
            <Input
              placeholder="MC Number"
              value={form.mcNumber}
              onChange={(e) => setForm({ ...form, mcNumber: e.target.value })}
            />
          </div>
          <div className="space-y-4">
            <Label className="text-[#022f7e] font-semibold">DOT Number</Label>
            <Input
              placeholder="DOT Number"
              value={form.dotNumber}
              onChange={(e) => setForm({ ...form, dotNumber: e.target.value })}
            />
          </div>
          <div className="space-y-4">
            <Label className="text-[#022f7e] font-semibold">Address</Label>
            <Input
              placeholder="Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>
          {/* <div className="space-y-4">
            <Label className="text-[#022f7e] font-semibold">Rating</Label>
            <Input
              placeholder="0 - 5"
              type="number"
              min={0}
              max={5}
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
            />
          </div> */}
          <div className="space-y-4">
            <Label className="text-[#022f7e] font-semibold">
              Equipment Types
            </Label>
            <Input
              placeholder="Van, Reefer, Flatbed..."
              value={form.equipmentTypes}
              onChange={(e) =>
                setForm({ ...form, equipmentTypes: e.target.value })
              }
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end sm:justify-end">
          <Button
            className="bg-[#3461ff] text-white hover:bg-white hover:text-[#3461ff]"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
