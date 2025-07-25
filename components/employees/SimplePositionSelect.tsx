"use client";
import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function SimplePositionSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [positions, setPositions] = useState<string[]>([]);

  const fetchPositions = async () => {
    const res = await fetch("/api/positions");
    const data = await res.json();
    setPositions(data.map((item: any) => item.name));
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select position" />
      </SelectTrigger>
      <SelectContent>
        {positions.map((pos) => (
          <SelectItem key={pos} value={pos}>
            {pos}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
