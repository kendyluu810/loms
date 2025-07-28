"use client";

import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";
import CreateLoadModal from "./load-form/CreateLoadModal";
import { DataTable } from "../ui/data-table";
import { columns } from "./columns";
import { LoadRow } from "@/type";
import { mapLoadToRow } from "@/lib/loadBoardUtils";

export default function LoadDataTable({
  data,
  setData,
}: {
  data: LoadRow[];
  setData: React.Dispatch<React.SetStateAction<LoadRow[]>>;
}) {
  const [sortBy, setSortBy] = useState<"date" | "name" | "">("");
  const [loadRows, setLoadRows] = useState<LoadRow[]>([]);
  const [openModal, setOpenModal] = useState(false); // State mở modal

  useEffect(() => {
    const fetchLoads = async () => {
      try {
        const res = await fetch("/api/load_board");
        const { data } = await res.json();
        const rows = data.map(mapLoadToRow);
        setLoadRows(rows);
      } catch (err) {
        console.error("Failed to fetch loads", err);
      }
    };

    fetchLoads();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/load_board/${id}`, { method: "DELETE" });
      setLoadRows((prev) => prev.filter((l) => l.load_id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

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
            onClick={() => setOpenModal(true)}
            className="w-full sm:w-auto text-[#022f7e] bg-[#fafcff] hover:bg-[#022f7e] hover:text-[#fafcff]"
          >
            Create Load
          </Button>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <DataTable columns={columns(handleDelete)} data={loadRows} />
      </div>

      {/* ✅ Modal */}
      <CreateLoadModal open={openModal} onOpenChange={setOpenModal} />
    </div>
  );
}
