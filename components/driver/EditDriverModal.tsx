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
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Driver</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <div className="space-x-4 space-y-4">
            <Label>Select Employee</Label>
            <Select onValueChange={handleSelect}>
              <SelectTrigger>
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
            <Label>Driver License</Label>
            <Input
              name="driverlicense"
              placeholder="Driver License"
              value={form.driverlicense}
              onChange={handleChange}
            />
          </div>
          <div className="space-x-4 space-y-4">
            <Label>License Type</Label>
            <Input
              name="licensetype"
              placeholder="License Type"
              value={form.licensetype}
              onChange={handleChange}
            />
          </div>
          <div className="space-x-4 space-y-4">
            <Label>License Expiry</Label>
            <Input
              type="date"
              name="licenseexpiry"
              placeholder="License Expiry"
              value={form.licenseexpiry}
              onChange={handleChange}
            />
          </div>
          <div className="space-x-4 space-y-4">
            <Label>Vehicle ID</Label>
            <Input
              name="vehicleid"
              placeholder="Vehicle ID"
              value={form.vehicleid}
              onChange={handleChange}
            />
          </div>
          <div className="space-x-4 space-y-4">
            <Label>Vehicle Type</Label>
            <Input
              name="vehicleType"
              placeholder="Vehicle Type"
              value={form.vehicleType}
              onChange={handleChange}
            />
          </div>
          <div className="space-x-4 space-y-4">
            <Label>Vehicle Number</Label>
            <Input
              name="vehicleNumber"
              placeholder="Vehicle Number"
              value={form.vehicleNumber}
              onChange={handleChange}
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
