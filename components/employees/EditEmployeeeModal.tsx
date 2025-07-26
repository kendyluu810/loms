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
import { SimplePositionSelect } from "./SimplePositionSelect";

type Employee = {
  _id: string;
  name: string;
  phone: string;
  email: string;
  position: string;
};

export default function EditEmployeeModal({
  employee,
  onUpdated,
}: {
  employee: Employee;
  onUpdated: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ ...employee });

  const handleSubmit = async () => {
    await fetch(`/api/employees/${employee._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setOpen(false);
    onUpdated();
    toast.success(`Employee ${employee.name} updated successfully`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#3461ff] text-white hover:bg-white hover:text-[#3461ff]">
          Edit
        </Button>
      </DialogTrigger>
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
              onChange={(value) => setForm({ ...form, position: value })}
            />
          </div>
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
