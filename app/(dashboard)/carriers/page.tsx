"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Carrier } from "@/type";
import { toast } from "sonner";
import AddCarrierModal from "@/components/carriers/AddCarrierModal";
import EditCarrierModal from "@/components/carriers/EditCarrierModal";

export default function CarriersPage() {
  const [carriers, setCarriers] = useState<Carrier[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchCarriers = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/carriers?search=${search}&page=${page}&pageSize=${pageSize}`
      );

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setCarriers(data.carriers);
      setTotal(data.total);
    } catch (err) {
      toast.error("Failed to load carriers");
    }
  }, [search, page, pageSize]);

  useEffect(() => {
    fetchCarriers();
  }, [fetchCarriers]);
  return (
    <div className="p-4 space-y-4">
      <h2 className="font-bold text-2xl text-[#022f7e]">List of Carriers</h2>

      {/* Search + Add */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <Input
          placeholder="Search carriers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2"
        />
        <AddCarrierModal
          onAdded={() => {
            setPage(1);
            fetchCarriers();
          }}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>MC #</TableHead>
              <TableHead>DOT #</TableHead>
              {/* <TableHead>Rating</TableHead> */}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(carriers) && carriers.length > 0 ? (
              carriers.map((carrier) => (
                <TableRow key={carrier._id}>
                  <TableCell>{carrier.name}</TableCell>
                  <TableCell>{carrier.phone || "-"}</TableCell>
                  <TableCell>{carrier.email || "-"}</TableCell>
                  <TableCell>{carrier.mcNumber || "-"}</TableCell>
                  <TableCell>{carrier.dotNumber || "-"}</TableCell>
                  {/* <TableCell>{carrier.rating || 0}</TableCell> */}
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      <EditCarrierModal
                        carrier={carrier}
                        onUpdated={fetchCarriers}
                      />
                      <Button
                        variant="destructive"
                        onClick={async () => {
                          await fetch(`/api/carriers/${carrier._id}`, {
                            method: "DELETE",
                          });
                          fetchCarriers();
                          toast.success(
                            `Carrier ${carrier.name} deleted successfully`
                          );
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-6 text-gray-500"
                >
                  No carrier found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size} / page
            </option>
          ))}
        </select>
        <div className="flex items-center gap-2">
          <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </Button>
          <span className="text-sm">Page {page}</span>
          <Button
            disabled={page * pageSize >= total}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
