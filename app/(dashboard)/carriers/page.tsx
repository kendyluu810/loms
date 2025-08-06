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
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(`Failed to load carriers: ${err.message}`);
      } else {
        toast.error("Failed to load carriers: Unknown error");
      }
    }
  }, [search, page, pageSize]);

  useEffect(() => {
    fetchCarriers();
  }, [fetchCarriers]);
  return (
    <div className="p-4 space-y-4 sm:space-y-6">
      <h2 className="font-bold text-xl sm:text-2xl text-[#022f7e]">
        List of Carriers
      </h2>

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

      {/* Table  Desktop*/}
      <div className="hidden sm:block overflow-x-auto rounded-lg border">
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

      {/* Mobile list view */}
      <div className="block sm:hidden space-y-4">
        {Array.isArray(carriers) && carriers.length > 0 ? (
          carriers.map((carrier) => (
            <div key={carrier._id} className="p-4 border rounded shadow-sm">
              <p>
                <strong>Name:</strong> {carrier.name}
              </p>
              <p>
                <strong>Phone:</strong> {carrier.phone || "-"}
              </p>
              <p>
                <strong>Email:</strong> {carrier.email || "-"}
              </p>
              <p>
                <strong>MC #:</strong> {carrier.mcNumber || "-"}
              </p>
              <p>
                <strong>DOT #:</strong> {carrier.dotNumber || "-"}
              </p>
              <div className="mt-2 flex gap-3 space-x-2">
                <EditCarrierModal carrier={carrier} onUpdated={fetchCarriers} />
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
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">No carrier found</div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 w-full">
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="border rounded px-2 py-1 w-full sm:w-auto"
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size} / page
            </option>
          ))}
        </select>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between">
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
