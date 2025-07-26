"use client";
import EnterInformation_Form from "@/components/load_board/EnterInformation_Form";
import LoadDataTable from "@/components/load_board/LoadDataTable";
// import { Load } from "@/type";
import { useState } from "react";

export default function LoadBoardPage() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="p-4 w-full max-w-[1580px] mx-auto space-y-4">
      <div className="bg-white p-4 rounded-xl shadow-md overflow-x-auto">
        <EnterInformation_Form />
        <div className="bg-white p-4 rounded-xl shadow-md overflow-auto mt-5">
          <LoadDataTable />
        </div>
      </div>
    </div>
  );
}
