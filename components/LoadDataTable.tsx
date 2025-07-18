"use client";

import { DataTable } from "./ui/data-table";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { useRouter } from "next/navigation";
import { columns, Load } from "./columns";
import { useState } from "react";

export default function LoadDataTable({ data }: { data: Load[] }) {
  const [sortBy, setSortBy] = useState<"date" | "name" | "">("");

  const router = useRouter();

  const goToForm = () => {
    router.push("./load_board/create-load");
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortBy === "date") {
      const parseDate = (dateStr: string) => {
        const [day, month, year] = dateStr.split("/");
        return new Date(+`20${year}`, +month - 1, +day);
      };
      return (
        parseDate(a.pickupDate).getTime() - parseDate(b.pickupDate).getTime()
      );
    } else if (sortBy === "name") {
      return a.customer.localeCompare(b.customer);
    }
    return 0; // No sorting
  });

  return (
    <div className="flex flex-col space-y-6 bg-[#fafcff] p-6 rounded-lg shadow">
      <div className="flex justify-between items-center">
        <div className=" flex items-center space-x-4">
          <h2>Available Loads</h2>
          <Button
            type="button"
            className=" flex items-center justify-center text-[#6c9ef5] bg-[#fafcff] hover:bg-[#6c9ef5] hover:text-[#fafcff]"
          >
            <span className="font-bold text-xl">+</span>
            Add Filters
          </Button>
        </div>
        <div className="flex space-x-4">
          <Select
            onValueChange={(value) => setSortBy(value as "date" | "name" | "")}
          >
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Sort by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
          <Button
            type="button"
            onClick={goToForm}
            className="text-[#6c9ef5] bg-[#fafcff] hover:bg-[#6c9ef5] hover:text-[#fafcff]"
          >
            Create Load
          </Button>
        </div>
      </div>

      <div className="w-full">
        <DataTable columns={columns} data={sortedData} />
      </div>
    </div>
  );
}
