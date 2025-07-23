"use client";

import { DataTable } from "../ui/data-table";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { useRouter } from "next/navigation";
import { columns, Load } from "../load_board/columns";
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
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <h2 className="font-bold text-xl text-[#022f7e]">Available Loads</h2>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Select
            onValueChange={(value) => setSortBy(value as "date" | "name" | "")}
          >
            <SelectTrigger className="w-full sm:w-[200px] md:w-[250px] lg:w-[300px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
          <Button
            type="button"
            onClick={goToForm}
            className="w-full sm:w-auto text-[#022f7e] bg-[#fafcff] hover:bg-[#022f7e] hover:text-[#fafcff]"
          >
            Create Load
          </Button>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <DataTable columns={columns} data={sortedData} />
      </div>
    </div>
  );
}
