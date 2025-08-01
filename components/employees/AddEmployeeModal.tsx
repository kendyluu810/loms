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
import { PositionSelect } from "./PositionsSelect";

export default function AddEmployeeModal({ onAdded }: { onAdded: () => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    position: "",
  });

  const [driverInfo, setDriverInfo] = useState({
    driverlicense: "",
    licensetype: "",
    licenseexpiry: "",
  });

  const handleSubmit = async () => {
    const res = await fetch("/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const newEmp = await res.json();
    if (form.position === "Driver") {
      await fetch("/api/drivers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...driverInfo,
          employee: newEmp._id,
        }),
      });
    }
    setOpen(false);
    setForm({ name: "", phone: "", email: "", position: "" });
    setDriverInfo({
      driverlicense: "",
      licensetype: "",
      licenseexpiry: "",
    });
    onAdded();
    toast.success("Employee added successfully");
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#3461ff] text-white hover:bg-white hover:text-[#3461ff]">
          Add Employee
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl h-fit">
        <DialogHeader>
          <DialogTitle className="text-[#022f7e] font-bold text-2xl">
            Add Employee
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-4">
            <Label>Name</Label>
            <Input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="space-y-4">
            <Label>Phone</Label>
            <Input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="space-y-4">
            <Label>Email</Label>
            <Input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="space-y-4">
            <Label>Position</Label>
            <PositionSelect
              value={form.position}
              onChange={(value) => setForm({ ...form, position: value })}
            />
          </div>
          {form.position === "Driver" && (
            <>
              <div className="space-y-4">
                <Label>Driver License</Label>
                <Input
                  placeholder="Driver License"
                  value={driverInfo.driverlicense}
                  onChange={(e) =>
                    setDriverInfo({
                      ...driverInfo,
                      driverlicense: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-4">
                <Label>License Type</Label>
                <Input
                  placeholder="License Type"
                  value={driverInfo.licensetype}
                  onChange={(e) =>
                    setDriverInfo({
                      ...driverInfo,
                      licensetype: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label>License Expiry</Label>
                <Input
                  type="date"
                  value={driverInfo.licenseexpiry}
                  onChange={(e) =>
                    setDriverInfo({
                      ...driverInfo,
                      licenseexpiry: e.target.value,
                    })
                  }
                />
              </div>
            </>
          )}
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
