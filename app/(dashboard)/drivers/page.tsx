"use client";

import { useEffect, useState } from "react";

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
import { Driver } from "@/type";
import AddDriverModal from "@/components/driver/AddDriverModal";
import EditDriverModal from "@/components/driver/EditDriverModal";
import { toast } from "sonner";

const DriverPage = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const totalPage = Math.ceil(total / pageSize);

  const fetchDrivers = async () => {
    const res = await fetch(
      `/api/drivers?search=${search}&page=${page}&pageSize=${pageSize}`
    );
    const data = await res.json();
    setDrivers(data.drivers);
    setTotal(data.total);
  };

  useEffect(() => {
    fetchDrivers();
  }, [search, page, pageSize]);

  return (
    <div className="flex flex-col min-h-screen p-4 space-y-4">
      <h2 className="font-bold text-2xl text-[#022f7e]">List of Drivers</h2>
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Input
          type="text"
          placeholder="Search drivers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:max-w-sm"
        />
        <AddDriverModal onAdded={fetchDrivers} />
      </div>
      {/* Driver Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden lg:table-cell">Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="hidden md:table-cell">License</TableHead>
              <TableHead className="hidden md:table-cell">Type</TableHead>
              <TableHead className="hidden md:table-cell">Expiry</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {drivers && drivers.length > 0 ? (
              drivers.map((driver) => (
                <TableRow key={driver._id}>
                  <TableCell>{driver.employee?.name}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {driver.employee?.email}
                  </TableCell>
                  <TableCell>{driver.employee?.phone}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {driver.driverlicense}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {driver.licensetype}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {driver.licenseexpiry}
                  </TableCell>
                  <TableCell className="flex flex-col md:flex-row gap-2">
                    <EditDriverModal driver={driver} onEdit={fetchDrivers} />
                    <Button
                      variant="destructive"
                      onClick={async () => {
                        await fetch(`/api/drivers/${driver._id}`, {
                          method: "DELETE",
                        });
                        fetchDrivers();
                        toast.success(
                          `Driver ${driver.employee?.name} deleted successfully`
                        );
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <div className="text-xl text-gray-500 font-bold space-y-4 gap-4 text-center">
                No drivers found
              </div>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4">
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
        <div className="flex items-center space-x-2">
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
};

export default DriverPage;
