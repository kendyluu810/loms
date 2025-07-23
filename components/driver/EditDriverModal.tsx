"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Driver, Employee } from "@/type";
import { Label } from "../ui/label";

export default function EditDriverModal({
  driver,
  onEdit,
}: {
  driver: Driver;
  onEdit: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [form, setForm] = useState({
    Eid: driver.employee?._id || "",
    driverlicense: driver.driverlicense || "",
    licensetype: driver.licensetype || "",
    licenseexpiry: driver.licenseexpiry
      ? driver.licenseexpiry.slice(0, 10)
      : "",
    vehicleid: driver.vehicleid || "",
    vehicleType: driver.vehicleType || "",
    vehicleNumber: driver.vehicleNumber || "",
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await fetch("/api/employees?position=driver");
      const data = await res.json();
      setEmployees(data.employees);
    };
    fetchEmployees();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelect = (value: string) => {
    setForm({ ...form, Eid: value });
  };

  const handleSubmit = async () => {
    await fetch(`/api/drivers/${driver._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setOpen(false);
    onEdit();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#3461ff] text-white" variant="outline">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto px-4">
        <DialogHeader>
          <DialogTitle className="text-[#022f7e] font-bold text-2xl">
            Edit Driver
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
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
          <div className="space-y-2">
            <Label className="text-[#022f7e] font-semibold">License Type</Label>
            <Input
              name="licensetype"
              placeholder="License Type"
              value={form.licensetype}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
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
          <div className="space-y-2">
            <Label className="text-[#022f7e] font-semibold">Vehicle ID</Label>
            <Input
              name="vehicleid"
              placeholder="Vehicle ID"
              value={form.vehicleid}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[#022f7e] font-semibold">Vehicle Type</Label>
            <Input
              name="vehicleType"
              placeholder="Vehicle Type"
              value={form.vehicleType}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[#022f7e] font-semibold">
              Vehicle Number
            </Label>
            <Input
              name="vehicleNumber"
              placeholder="Vehicle Number"
              value={form.vehicleNumber}
              onChange={handleChange}
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
