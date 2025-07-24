"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "../ui/label";

export default function AddCustomerModal({ onAdded }: { onAdded: () => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    customerType: "Shipper" ,
  });

  const handleSubmit = async () => {
    await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setOpen(false);
    setForm({
      name: "",
      phone: "",
      email: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      customerType: "Shipper",
    });
    onAdded();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#3461ff] text-white font-semibold">
          Add Customer
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-[#022f7e] font-bold text-2xl">
            Add Customer
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
          <div className="space-y-4">
            <Label className="text-[#022f7e] font-semibold">Name</Label>
            <Input
              placeholder="Name"
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
            <Label className="text-[#022f7e] font-semibold">Contact Name</Label>
            <Input
              placeholder="Name"
              value={form.contactName}
              onChange={(e) =>
                setForm({ ...form, contactName: e.target.value })
              }
            />
          </div>
          <div className="space-y-4">
            <Label className="text-[#022f7e] font-semibold">
              Contact Phone
            </Label>
            <Input
              placeholder="Phone"
              value={form.contactPhone}
              onChange={(e) =>
                setForm({ ...form, contactPhone: e.target.value })
              }
            />
          </div>
          <div className="space-y-4">
            <Label className="text-[#022f7e] font-semibold">
              Contact Email
            </Label>
            <Input
              placeholder="Email"
              value={form.contactEmail}
              onChange={(e) =>
                setForm({ ...form, contactEmail: e.target.value })
              }
            />
          </div>
          <div className="space-y-4">
            <Label className="text-[#022f7e] font-semibold">
              Customer Type
            </Label>
            <Select
              value={form.customerType}
              onValueChange={(value) =>
                setForm({ ...form, customerType: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select customer type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Shipper">Shipper</SelectItem>
                <SelectItem value="Receiver">Receiver</SelectItem>
              </SelectContent>
            </Select>
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
