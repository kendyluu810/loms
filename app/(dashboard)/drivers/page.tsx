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
    <div className="flex flex-col h-screen p-4 space-y-4">
      <h2 className="font-bold text-2xl text-[#022f7e]">List of Drivers</h2>
      <div className="flex justify-between space-x-4 space-y-4">
        <Input
          type="text"
          placeholder="Search drivers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <AddDriverModal onAdded={fetchDrivers} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Drive License</TableHead>
            <TableHead>License Type</TableHead>
            <TableHead>License Expiry</TableHead>
            <TableHead>Vehicle ID</TableHead>
            <TableHead>Vehicle Type</TableHead>
            <TableHead>Vehicle Number</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {drivers.map((driver) => (
            <TableRow key={driver._id}>
              <TableCell>{driver.employee?.name}</TableCell>
              <TableCell>{driver.employee?.email}</TableCell>
              <TableCell>{driver.employee?.phone}</TableCell>
              <TableCell>{driver.driverlicense}</TableCell>
              <TableCell>{driver.licensetype}</TableCell>
              <TableCell>{driver.licenseexpiry}</TableCell>
              <TableCell>{driver.vehicleid}</TableCell>
              <TableCell>{driver.vehicleType}</TableCell>
              <TableCell>{driver.vehicleNumber}</TableCell>
              <TableCell className="flex space-x-2">
                <EditDriverModal driver={driver} onEdit={fetchDrivers} />
                <Button
                  variant="destructive"
                  onClick={async () => {
                    await fetch(`/api/drivers/${driver._id}`, {
                      method: "DELETE",
                    });
                    fetchDrivers();
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center mt-4">
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size} / page
            </option>
          ))}
        </select>
        <div>
          <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </Button>
          <span className="px-2">Page {page}</span>
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
