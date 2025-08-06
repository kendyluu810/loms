"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { SimplePositionSelect } from "./SimplePositionSelect";
import { Driver, Employee } from "@/type";

interface EditEmployeeModalProps {
  employee: Employee;
  drivers: Driver[];
  onUpdated: () => void;
  onClose?: () => void;
  open: boolean;
}
export default function EditEmployeeModal({
  employee,
  onUpdated,
  onClose,
  open,
}: EditEmployeeModalProps) {
  const [form, setForm] = useState({ ...employee });
  const [driverInfo, setDriverInfo] = useState<Partial<Driver>>({});
  const [isDriver, setIsDriver] = useState(form.position === "Driver");

  useEffect(() => {
    if (open && form.position === "Driver") {
      fetch(`/api/drivers/by-employee/${form._id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?._id) {
            setDriverInfo({
              driverlicense: data.driverlicense,
              licensetype: data.licensetype,
              licenseexpiry: data.licenseexpiry?.slice(0, 10),
            });
          }
        });
    }
  }, [open, form.position, form._id]);

  const handleSubmit = async () => {
    await fetch(`/api/employees/${form._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (form.position === "Driver") {
      await fetch(`/api/drivers/upsert-by-employee/${form._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...driverInfo,
          employee: form._id,
        }),
      });
    } else {
      await fetch(`/api/drivers/by-employee/${form._id}`, {
        method: "DELETE",
      });
    }
    toast.success(`Employee ${form.name} updated successfully`);
    onUpdated();
    onClose?.();
  };

  if (!employee) return null;

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose?.()}>
      <DialogContent className="max-w-5xl h-fit">
        <DialogHeader>
          <DialogTitle className="text-[#022f7e] font-bold text-2xl">
            Edit Employee
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
            <SimplePositionSelect
              value={form.position}
              onChange={(value) => {
                setForm({ ...form, position: value });
                setIsDriver(value === "Driver");
              }}
            />
          </div>
          {isDriver && (
            <>
              <div className="space-y-4">
                <Label>Driver License</Label>
                <Input
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
                  value={driverInfo.licensetype}
                  onChange={(e) =>
                    setDriverInfo({
                      ...driverInfo,
                      licensetype: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-4">
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
            className="mt-2 bg-[#3461ff] text-white hover:bg-white hover:text-[#3461ff]"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
