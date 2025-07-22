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
import { Customer } from "@/type";

export default function EditCustomerModal({
  customer,
  onUpdated,
}: {
  customer: Customer;
  onUpdated: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ ...customer });

  const handleSubmit = async () => {
    await fetch(`/api/customers/${customer._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setOpen(false);
    onUpdated();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#022f7e] text-white font-semibolds">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-[#022f7e] font-bold text-2xl">
            Edit Customer
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 space-y-3">
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
              Delivery Method
            </Label>
            <select
              value={form.deliveryMethod}
              onChange={(e) =>
                setForm({
                  ...form,
                  deliveryMethod: e.target.value as Customer["deliveryMethod"],
                })
              }
            >
              <option value="Air">Air</option>
              <option value="Sea">Sea</option>
              <option value="Land">Land</option>
            </select>
          </div>
        </div>
        <Button className="mt-2 bg-[#022f7e] text-white" onClick={handleSubmit}>
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
}
