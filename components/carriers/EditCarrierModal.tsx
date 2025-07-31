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
import { Carrier } from "@/type";

export default function EditCarrierModal({
  carrier,
  onUpdated,
}: {
  carrier: Carrier;
  onUpdated: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ ...carrier });

  const handleSubmit = async () => {
    await fetch(`/api/carriers/${carrier._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setOpen(false);
    onUpdated();
    toast.success(`Carrier ${form.name} updated successfully`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#3461ff] text-white font-semibold hover:bg-white hover:text-[#3461ff]">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl h-fit">
        <DialogHeader>
          <DialogTitle className="text-[#022f7e] font-bold text-2xl">
            Edit Carrier
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
          <div className="space-y-2">
            <Label className="text-[#022f7e] font-semibold">Name</Label>
            <Input
              placeholder="Carrier Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[#022f7e] font-semibold">MC Number</Label>
            <Input
              placeholder="MC Number"
              value={form.mcNumber || ""}
              onChange={(e) => setForm({ ...form, mcNumber: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[#022f7e] font-semibold">DOT Number</Label>
            <Input
              placeholder="DOT Number"
              value={form.dotNumber || ""}
              onChange={(e) => setForm({ ...form, dotNumber: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[#022f7e] font-semibold">Email</Label>
            <Input
              placeholder="Email"
              value={form.email || ""}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[#022f7e] font-semibold">Phone</Label>
            <Input
              placeholder="Phone"
              value={form.phone || ""}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[#022f7e] font-semibold">Address</Label>
            <Input
              placeholder="Address"
              value={form.address || ""}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>
          <div className="space-y-4">
            <Label className="text-[#022f7e] font-semibold">
              Equipment Types
            </Label>
            <Input
              placeholder="Van, Reefer, Flatbed..."
              value={form.equipmentTypes ? form.equipmentTypes.join(", ") : ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  equipmentTypes: e.target.value
                    .split(",")
                    .map((type) => type.trim())
                    .filter((type) => type.length > 0),
                })
              }
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
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
