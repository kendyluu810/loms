"use client";
import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function SimpleCustomerTypeSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [customerTypes, setCustomerTypes] = useState<string[]>([]);

  const fetchCustomerTypes = async () => {
    const res = await fetch("/api/customer-types");
    const data = await res.json();
    setCustomerTypes(data.map((item: any) => item.name));
  };

  useEffect(() => {
    fetchCustomerTypes();
  }, []);

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
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
  );
}
