"use client";

import AddEmployeeModal from "@/components/employees/AddEmployeeModal";
import EditEmployeeModal from "@/components/employees/EditEmployeeeModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Employee } from "@/type";
import { useEffect, useState } from "react";

export default function EmployeePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const totalPage = Math.ceil(total / pageSize);

  const fecthEmployees = async () => {
    const res = await fetch(
      `/api/employees?search=${search}&page=${page}&pageSize=${pageSize}`
    );
    const data = await res.json();
    setEmployees(data.employees);
    setTotal(data.total);
  };

  useEffect(() => {
    fecthEmployees();
  }, [search, page, pageSize]);

  return (
    <div className="flex flex-col h-screen p-4 space-y-4">
      <h2 className="font-bold text-2xl text-[#022f7e]">List of Employees</h2>
      <div className="flex justify-between space-x-4 space-y-4">
        <Input
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <AddEmployeeModal onAdded={fecthEmployees} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Eid</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee._id}>
              <TableCell>{employee.Eid}</TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.phone}</TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell className=" flex gap-2 space-x-2 items-center">
                <EditEmployeeModal
                  employee={employee}
                  onUpdated={fecthEmployees}
                />
                <Button
                  variant="destructive"
                  onClick={async () => {
                    await fetch(`/api/employees/${employee._id}`, {
                      method: "DELETE",
                    });
                    fecthEmployees();
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
}
