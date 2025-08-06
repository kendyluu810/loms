"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type CustomerType = {
  name: string;
};
export function CustomerTypeSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [customerTypes, setCustomerTypes] = useState<string[]>([]);
  const [newCustomerType, setNewCustomerType] = useState("");

  const fetchCustomerTypes = async () => {
    const res = await fetch("/api/customer-types");
    const data: CustomerType[] = await res.json();
    setCustomerTypes(data.map((type) => type.name));
  };

  const addCustomerType = async () => {
    if (!newCustomerType.trim()) return;
    const res = await fetch("/api/customer-types", {
      method: "POST",
      body: JSON.stringify({ name: newCustomerType }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      toast.success("Added new customer type");
      setNewCustomerType("");
      fetchCustomerTypes();
    }
  };

  useEffect(() => {
    fetchCustomerTypes();
  }, []);

  return (
    <div className="space-y-2">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select position" />
        </SelectTrigger>
        <SelectContent>
          {customerTypes.map((cus) => (
            <SelectItem key={cus} value={cus}>
              {cus}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex gap-2">
        <Input
          placeholder="Add new customer type"
          value={newCustomerType}
          onChange={(e) => setNewCustomerType(e.target.value)}
        />
        <Button type="button" onClick={addCustomerType}>
          Add
        </Button>
      </div>
    </div>
  );
}
