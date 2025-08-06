"use client";
import EnterInformation_Form from "@/components/load_board/EnterInformation_Form";
import LoadDataTable from "@/components/load_board/LoadDataTable";
import { mapLoadToRow } from "@/lib/loadBoardUtils";
import { LoadRow } from "@/type";
import { useState } from "react";
import { toast } from "sonner";

export default function LoadBoardPage() {
  const [loadRows, setLoadRows] = useState<LoadRow[]>([]);
  const applyFilter = async (filters: Record<string, string>) => {
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await fetch(`/api/load_board?${query}`);
      const { data } = await res.json();
      const rows = data.map(mapLoadToRow);
      setLoadRows(rows);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Failed to apply filter: ${error.message}`);
      } else {
        toast.error("Failed to apply filter: Unknown error");
      }
    }
  };
  return (
    <div className="p-4 w-full max-w-screen-2xl mx-auto space-y-4">
      <div className="bg-white p-4 md:p-6 lg:p-8 rounded-xl shadow-md overflow-x-auto">
        <EnterInformation_Form onApplyFilters={applyFilter} />
        <div className="bg-white p-4 md:p-6 lg:p-8 rounded-xl shadow-md overflow-auto mt-5">
          <LoadDataTable data={loadRows} setData={setLoadRows} />
        </div>
      </div>
    </div>
  );
}
