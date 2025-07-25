"use client";

import { useShipmentOptions } from "@/store/useShipmentOptions";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Trash2 } from "lucide-react";

export function DangerTypeSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const { dangerTypes, addDangerType, removeDangerType } = useShipmentOptions();
  const [open, setOpen] = useState(false);
  const [newValue, setNewValue] = useState("");

  const handleAdd = async () => {
    const trimmed = newValue.trim();
    if (!trimmed || dangerTypes.includes(trimmed)) return;
    await addDangerType(trimmed);
    onChange(trimmed);
    setNewValue("");
    setOpen(false);
  };

  const handleDelete = async (item: string, e: React.MouseEvent) => {
    e.stopPropagation(); // tránh làm trigger select
    await removeDangerType(item);
    if (value === item) onChange(""); // reset nếu đang chọn item bị xóa
  };
  return (
    <>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select danger type" />
        </SelectTrigger>
        <SelectContent>
          {dangerTypes.map((item) => (
            <div
              key={item}
              className="flex justify-between items-center px-2 py-1 hover:bg-muted"
            >
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => handleDelete(item, e)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          ))}
          <div className="p-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpen(true)}
              className="w-full"
            >
              + Add more
            </Button>
          </div>
        </SelectContent>
      </Select>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new danger type</DialogTitle>
          </DialogHeader>
          <Input
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Enter danger type"
          />
          <DialogFooter>
            <Button onClick={handleAdd}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
