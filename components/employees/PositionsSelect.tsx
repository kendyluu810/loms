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

type Position = {
  name: string;
};

export function PositionSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [positions, setPositions] = useState<string[]>([]);
  const [newPosition, setNewPosition] = useState("");

  const fetchPositions = async () => {
    const res = await fetch("/api/positions");
    const data: Position[] = await res.json();
    setPositions(data.map((pos) => pos.name));
  };

  const addPosition = async () => {
    if (!newPosition.trim()) return;
    const res = await fetch("/api/positions", {
      method: "POST",
      body: JSON.stringify({ name: newPosition }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      toast.success("Added new position");
      setNewPosition("");
      fetchPositions();
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  return (
    <div className="space-y-2">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
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
      <div className="flex gap-2">
        <Input
          placeholder="Add new position"
          value={newPosition}
          onChange={(e) => setNewPosition(e.target.value)}
        />
        <Button type="button" onClick={addPosition}>
          Add
        </Button>
      </div>
    </div>
  );
}
