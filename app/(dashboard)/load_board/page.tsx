"use client";
import EnterInformation_Form from "@/components/load_board/EnterInformation_Form";
import LoadDataTable from "@/components/load_board/LoadDataTable";
import { Load } from "@/type";
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
    <div className="p-4 w-full max-w-[1580px] mx-auto space-y-4">
      <div className="bg-white p-4 rounded-xl shadow-md overflow-x-auto">
        <EnterInformation_Form />
        <div className="bg-white p-4 rounded-xl shadow-md overflow-auto mt-5">
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : (
            <LoadDataTable data={loads} onDelete={function (loadNumber: string): void {
                throw new Error("Function not implemented.");
              } } />
          )}
        </div>
      </div>
    </div>
  );
}
