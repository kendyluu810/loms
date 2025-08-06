"use client";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import TrackingListItem from "./TrackingListItem";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { ExtendedLoadRow } from "@/type";

export default function TrackingList({
  loads,
  loading,
  onSelect,
}: {
  loads: ExtendedLoadRow[];
  loading: boolean;
  onSelect: (load: ExtendedLoadRow) => void;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const totalPages = Math.ceil(loads.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = loads.slice(startIdx, startIdx + itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="p-2 bg-white rounded-md shadow-md border flex flex-col h-fit">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-[#022f7e]">
          Available Tracking
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm">Per Page:</span>
          <Select
            value={String(itemsPerPage)}
            onValueChange={(value) => {
              setItemsPerPage(Number(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-24 h-8">
              <SelectValue placeholder="Items per page" />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 50].map((value) => (
                <SelectItem key={value} value={String(value)}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <ScrollArea className="flex-1 space-y-2">
        {loading ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : currentItems.length === 0 ? (
          <p className="text-sm text-gray-500">No loads found.</p>
        ) : (
          currentItems.map((load) => (
            <TrackingListItem key={load._id} load={load} onSelect={onSelect} />
          ))
        )}
      </ScrollArea>

      <div className="flex justify-between items-center pt-2 mt-2 border-t">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
