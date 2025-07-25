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

export function TruckLoadSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const { truckLoads, addTruckLoad, removeTruckLoad } = useShipmentOptions();
  const [open, setOpen] = useState(false);
  const [newValue, setNewValue] = useState("");

  const handleAdd = async () => {
    const trimmed = newValue.trim();
    if (!trimmed || truckLoads.includes(trimmed)) return;
    await addTruckLoad(trimmed);
    onChange(trimmed);
    setNewValue("");
    setOpen(false);
  };

  const handleDelete = async (item: string, e: React.MouseEvent) => {
    e.stopPropagation(); // tránh làm trigger select
    await removeTruckLoad(item);
    if (value === item) onChange(""); // reset nếu đang chọn item bị xóa
  };

  return (
    <>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select truck load type" />
        </SelectTrigger>
        <SelectContent>
          {truckLoads.map((item) => (
            <div
              key={item}
              className="flex justify-between items-center px-2 py-1 hover:bg-muted"
            >
              <SelectItem value={item} className="flex-1">
                {item}
              </SelectItem>
              <Button
                variant="ghost"
                size="icon"
                className="ml-2 w-5 h-5"
                onClick={(e) => {
                  handleDelete(item, e);
                }}
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
            <DialogTitle>Add new truck load type</DialogTitle>
          </DialogHeader>
          <Input
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Enter truck load"
          />
          <DialogFooter>
            <Button onClick={handleAdd}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
