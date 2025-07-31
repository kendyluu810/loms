"use client";

import { Employee } from "@/type";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";

export default function AddDriverModal({ onAdded }: { onAdded: () => void }) {
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [form, setForm] = useState({
    Eid: "",
    driverlicense: "",
    licensetype: "",
    licenseexpiry: "",
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await fetch(`/api/employees?position=Driver`);
      const data = await res.json();
      setEmployees(data.employees);
    };
    fetchEmployees();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (value: string) => {
    setForm({ ...form, Eid: value });
  };

  const handleSubmit = async () => {
    await fetch("/api/drivers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    setOpen(false);
    setForm({
      Eid: "",
      driverlicense: "",
      licensetype: "",
      licenseexpiry: "",
    });
    onAdded();
    toast.success("Driver added successfully");
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#3461ff] text-white hover:bg-white hover:text-[#3461ff]">
          Add Driver
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl h-fit overflow-y-auto px-4">
        <DialogHeader>
          <DialogTitle className="text-[#022f7e] font-bold text-2xl">
            Add New Driver
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-3 md:space-y-0">
          <div className="space-x-4 space-y-4">
            <Label className="text-[#022f7e] font-semibold">
              Select Employee
            </Label>
            <Select onValueChange={handleSelect}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={`e.g. ${form.Eid}`} />
              </SelectTrigger>
              <SelectContent>
                {employees.map((emp) => (
                  <SelectItem key={emp._id} value={emp._id}>
                    {emp.name} ({emp.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-x-4 space-y-4">
            <Label className="text-[#022f7e] font-semibold">
              Driver License
            </Label>
            <Input
              name="driverlicense"
              placeholder="Driver License"
              value={form.driverlicense}
              onChange={handleChange}
            />
          </div>
          <div className="space-x-4 space-y-4">
            <Label className="text-[#022f7e] font-semibold">License Type</Label>
            <Input
              name="licensetype"
              placeholder="License Type"
              value={form.licensetype}
              onChange={handleChange}
            />
          </div>
          <div className="space-x-4 space-y-4">
            <Label className="text-[#022f7e] font-semibold">
              License Expiry
            </Label>
            <Input
              type="date"
              name="licenseexpiry"
              placeholder="License Expiry"
              value={form.licenseexpiry}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button
            className="bg-[#3461ff] text-white hover:bg-white hover:text-[#3461ff]"
            onClick={handleSubmit}
          >
            Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
