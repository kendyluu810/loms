"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Vehicle } from "@/type";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  vehicle: Vehicle;
  onUpdated: () => void;
}

export default function EditVehicleModal({
  open,
  setOpen,
  vehicle,
  onUpdated,
}: Props) {
  const [form, setForm] = useState(vehicle);

  useEffect(() => {
    setForm(vehicle);
  }, [vehicle]);

  const handleChange = (field: keyof Vehicle, value: string | boolean) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    const res = await fetch(`/api/vehicles/${form.truckNumber}`, {
      method: "PUT",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      toast.success("Vehicle updated");
      onUpdated();
      setOpen(false);
    } else {
      toast.error("Failed to update vehicle");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg h-fit">
        <DialogHeader>
          <DialogTitle className="text-[#022f7e] font-bold text-2xl">
            Edit Vehicle
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-4">
            <Label className="text-[#022f7e] font-semibold">Truck Number</Label>
            <Input value={form.truckNumber} disabled />
          </div>
          <div className="space-y-4">
            <Label className="text-[#022f7e] font-semibold">
              Trailer Number
            </Label>
            <Input
              value={form.trailerNumber}
              onChange={(e) => handleChange("trailerNumber", e.target.value)}
            />
          </div>
          <div className="space-y-4">
            <Label className="text-[#022f7e] font-semibold">Category</Label>
            <Input
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
            />
          </div>
          <div className="space-y-4">
            <Label className="text-[#022f7e] font-semibold">Status</Label>
            <Select
              value={form.status}
              onValueChange={(value) => handleChange("status", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="in-transit">In Transit</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={form.isEmpty}
              onCheckedChange={(val) => handleChange("isEmpty", !!val)}
            />
            <Label>Is Empty</Label>
          </div>

          <Button
            className="w-full mt-2 bg-[#3461ff] text-white hover:bg-white hover:text-[#3461ff]"
            onClick={handleSubmit}
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
