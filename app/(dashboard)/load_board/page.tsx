"use client";
import { Load } from "@/components/load_board/columns";
import EnterInformation_Form from "@/components/load_board/EnterInformation_Form";
import LoadDataTable from "@/components/load_board/LoadDataTable";
import { fetchLoads } from "@/utils/fetchLoads";
import { useEffect, useState } from "react";

export default function LoadBoardPage() {
  const [loads, setLoads] = useState<Load[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchLoads();
        setLoads(result);
      } catch (error) {
        console.error("Error fetching loads:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="max-w-[1589px] mx-auto flex flex-col h-screen mt-5 space-y-5">
      <EnterInformation_Form />
      <div className="flex items-center justify-between mx-auto">
        <LoadDataTable data={loads} />
      </div>
    </div>
  );
}
