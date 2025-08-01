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
import { CustomerTypeSelect } from "./CustomerTypeSelect";

export default function AddCustomerModal({ onAdded }: { onAdded: () => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    companyName: "",
    customerType: "shipper",
    companyEmail: "",
    companyPhone: "",
    contactPerson: "",
    contactPhone: "",
    contactEmail: "",
  });

  const handleSubmit = async () => {
    await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setOpen(false);
    setForm({
      companyName: "",
      customerType: "shipper",
      companyEmail: "",
      companyPhone: "",
      contactPerson: "",
      contactPhone: "",
      contactEmail: "",
    });
    onAdded();
    toast.success("Customer added successfully");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#3461ff] text-white font-semibold hover:bg-white hover:text-[#3461ff] border border-[#3461ff] flex items-center">
          Add Customer
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl h-fit">
        <DialogHeader>
          <DialogTitle className="text-[#022f7e] font-bold text-2xl">
            Add Customer
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
          <div className="space-y-4">
            <Label className="text-[#022f7e] font-semibold">Company Name</Label>
            <Input
              placeholder="Company Name"
              value={form.companyName}
              onChange={(e) =>
                setForm({ ...form, companyName: e.target.value })
              }
            />
          </div>
          <div className="space-y-4">
            <Label className="text-[#022f7e] font-semibold">
              Company Phone
            </Label>
            <Input
              placeholder="Company Phone"
              value={form.companyPhone}
              onChange={(e) =>
                setForm({ ...form, companyPhone: e.target.value })
              }
            />
          </div>
          <div className="space-y-4">
            <Label className="text-[#022f7e] font-semibold">
              Company Email
            </Label>
            <Input
              placeholder="Company Email"
              value={form.companyEmail}
              onChange={(e) =>
                setForm({ ...form, companyEmail: e.target.value })
              }
            />
          </div>
          <div className="space-y-4">
            <Label className="text-[#022f7e] font-semibold">Contact Name</Label>
            <Input
              placeholder="Name"
              value={form.contactPerson}
              onChange={(e) =>
                setForm({ ...form, contactPerson: e.target.value })
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
            <CustomerTypeSelect
              value={form.customerType}
              onChange={(value) => setForm({ ...form, customerType: value })}
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
