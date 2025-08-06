"use client";

import AddEmployeeModal from "@/components/employees/AddEmployeeModal";
import EditEmployeeModal from "@/components/employees/EditEmployeeeModal";
import { ViewDriverModal } from "@/components/employees/ViewDriverModal";
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
import { deleteEmployee, fetchEmployees } from "@/lib/api/employees";
import { Employee } from "@/type";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export default function EmployeePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selected, setSelected] = useState<Employee | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewDriver, setViewDriver] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const loadData = useCallback(async () => {
    const res = await fetchEmployees({ search, page, pageSize });
    setEmployees(res.data);
    setTotal(res.total);
  }, [search, page, pageSize]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleEdit = (employee: Employee) => {
    setSelected(employee);
    setEditModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteEmployee(id);
    loadData();
  };

  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      <h2 className="font-bold text-2xl text-[#022f7e]">
        Employees Management
      </h2>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <Input
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:w-1/2"
        />
        <AddEmployeeModal onAdded={loadData} />
      </div>

      <div className="overflow-x-auto">
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
            {employees && employees.length > 0 ? (
              employees.map((employee) => (
                <TableRow key={employee._id}>
                  <TableCell>{employee.Eid}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.phone}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell className="px-4 py-2 flex gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleEdit(employee)}
                    >
                      <Pencil size={16} />
                    </Button>
                    {employee.position === "Driver" && (
                      <Button
                        size="icon"
                        variant="secondary"
                        onClick={() => setViewDriver(employee._id)}
                      >
                        <Eye size={16} />
                      </Button>
                    )}
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleDelete(employee._id!)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                  No employees found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

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
          <span className="text-sm">
            Page {page} of {Math.ceil(total / pageSize)}
          </span>
          <Button
            disabled={page * pageSize >= total}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Modals */}
      {selected && (
        <EditEmployeeModal
          open={editModalOpen}
          employee={selected}
          drivers={[]} // có thể cập nhật nếu cần
          onClose={() => setEditModalOpen(false)}
          onUpdated={loadData}
        />
      )}
      {viewDriver && (
        <ViewDriverModal
          employeeId={viewDriver}
          onClose={() => setViewDriver(null)}
        />
      )}
    </div>
  );
}
