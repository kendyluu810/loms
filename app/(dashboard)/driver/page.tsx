"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import { Driver, driverColumns } from "@/components/driver/columns";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialData: Driver[] = [
  {
    id: "1",
    name: "John Doe",
    phone: "123-456-7890",
    email: "john.doe@example.com",
    driverLicense: "D1234567",
    licenseType: "CDL",
    licenseExpire: "2025-12-31",
    vehicleId: "V123456",
    employeeType: "Full-time",
    created: "2023-01-01",
  },
  {
    id: "2",
    name: "Jane Smith",
    phone: "234-567-8901",
    email: "jane.smith@example.com",
    driverLicense: "D2345678",
    licenseType: "B",
    licenseExpire: "2024-11-30",
    vehicleId: "V234567",
    employeeType: "Part-time",
    created: "2023-02-15",
  },
  {
    id: "3",
    name: "Michael Johnson",
    phone: "345-678-9012",
    email: "michael.johnson@example.com",
    driverLicense: "D3456789",
    licenseType: "C",
    licenseExpire: "2026-01-15",
    vehicleId: "V345678",
    employeeType: "Contractor",
    created: "2023-03-10",
  },
  {
    id: "4",
    name: "Emily Davis",
    phone: "456-789-0123",
    email: "emily.davis@example.com",
    driverLicense: "D4567890",
    licenseType: "CDL",
    licenseExpire: "2025-07-20",
    vehicleId: "V456789",
    employeeType: "Full-time",
    created: "2023-04-05",
  },
  {
    id: "5",
    name: "William Brown",
    phone: "567-890-1234",
    email: "william.brown@example.com",
    driverLicense: "D5678901",
    licenseType: "B",
    licenseExpire: "2024-09-18",
    vehicleId: "V567890",
    employeeType: "Part-time",
    created: "2023-05-12",
  },
  {
    id: "6",
    name: "Olivia Wilson",
    phone: "678-901-2345",
    email: "olivia.wilson@example.com",
    driverLicense: "D6789012",
    licenseType: "C",
    licenseExpire: "2026-03-22",
    vehicleId: "V678901",
    employeeType: "Contractor",
    created: "2023-06-08",
  },
  {
    id: "7",
    name: "James Martinez",
    phone: "789-012-3456",
    email: "james.martinez@example.com",
    driverLicense: "D7890123",
    licenseType: "CDL",
    licenseExpire: "2025-05-14",
    vehicleId: "V789012",
    employeeType: "Full-time",
    created: "2023-07-19",
  },
  {
    id: "8",
    name: "Sophia Anderson",
    phone: "890-123-4567",
    email: "sophia.anderson@example.com",
    driverLicense: "D8901234",
    licenseType: "B",
    licenseExpire: "2024-08-25",
    vehicleId: "V890123",
    employeeType: "Part-time",
    created: "2023-08-23",
  },
  {
    id: "9",
    name: "Benjamin Thomas",
    phone: "901-234-5678",
    email: "benjamin.thomas@example.com",
    driverLicense: "D9012345",
    licenseType: "C",
    licenseExpire: "2026-02-10",
    vehicleId: "V901234",
    employeeType: "Contractor",
    created: "2023-09-30",
  },
  {
    id: "10",
    name: "Charlotte Jackson",
    phone: "012-345-6789",
    email: "charlotte.jackson@example.com",
    driverLicense: "D0123456",
    licenseType: "CDL",
    licenseExpire: "2025-10-05",
    vehicleId: "V012345",
    employeeType: "Full-time",
    created: "2023-10-14",
  },
  {
    id: "11",
    name: "Daniel White",
    phone: "123-456-7891",
    email: "daniel.white@example.com",
    driverLicense: "D1234568",
    licenseType: "B",
    licenseExpire: "2024-12-12",
    vehicleId: "V123457",
    employeeType: "Part-time",
    created: "2023-11-21",
  },
  {
    id: "12",
    name: "Amelia Harris",
    phone: "234-567-8902",
    email: "amelia.harris@example.com",
    driverLicense: "D2345679",
    licenseType: "C",
    licenseExpire: "2026-04-17",
    vehicleId: "V234568",
    employeeType: "Contractor",
    created: "2023-12-03",
  },
  {
    id: "13",
    name: "Matthew Clark",
    phone: "345-678-9013",
    email: "matthew.clark@example.com",
    driverLicense: "D3456790",
    licenseType: "CDL",
    licenseExpire: "2025-06-28",
    vehicleId: "V345679",
    employeeType: "Full-time",
    created: "2024-01-09",
  },
  {
    id: "14",
    name: "Mia Lewis",
    phone: "456-789-0124",
    email: "mia.lewis@example.com",
    driverLicense: "D4567891",
    licenseType: "B",
    licenseExpire: "2024-10-30",
    vehicleId: "V456790",
    employeeType: "Part-time",
    created: "2024-02-16",
  },
  {
    id: "15",
    name: "David Lee",
    phone: "567-890-1235",
    email: "david.lee@example.com",
    driverLicense: "D5678902",
    licenseType: "C",
    licenseExpire: "2026-05-11",
    vehicleId: "V567891",
    employeeType: "Contractor",
    created: "2024-03-22",
  },
  {
    id: "16",
    name: "Abigail Walker",
    phone: "678-901-2346",
    email: "abigail.walker@example.com",
    driverLicense: "D6789013",
    licenseType: "CDL",
    licenseExpire: "2025-08-19",
    vehicleId: "V678902",
    employeeType: "Full-time",
    created: "2024-04-27",
  },
  {
    id: "17",
    name: "Joseph Hall",
    phone: "789-012-3457",
    email: "joseph.hall@example.com",
    driverLicense: "D7890124",
    licenseType: "B",
    licenseExpire: "2024-07-13",
    vehicleId: "V789013",
    employeeType: "Part-time",
    created: "2024-05-30",
  },
  {
    id: "18",
    name: "Ella Young",
    phone: "890-123-4568",
    email: "ella.young@example.com",
    driverLicense: "D8901235",
    licenseType: "C",
    licenseExpire: "2026-06-24",
    vehicleId: "V890124",
    employeeType: "Contractor",
    created: "2024-06-18",
  },
  {
    id: "19",
    name: "Samuel King",
    phone: "901-234-5679",
    email: "samuel.king@example.com",
    driverLicense: "D9012346",
    licenseType: "CDL",
    licenseExpire: "2025-11-02",
    vehicleId: "V901235",
    employeeType: "Full-time",
    created: "2024-07-25",
  },
  {
    id: "20",
    name: "Grace Wright",
    phone: "012-345-6790",
    email: "grace.wright@example.com",
    driverLicense: "D0123457",
    licenseType: "B",
    licenseExpire: "2024-06-09",
    vehicleId: "V012346",
    employeeType: "Part-time",
    created: "2024-08-12",
  },
  {
    id: "21",
    name: "Henry Scott",
    phone: "123-456-7892",
    email: "henry.scott@example.com",
    driverLicense: "D1234569",
    licenseType: "C",
    licenseExpire: "2026-07-30",
    vehicleId: "V123458",
    employeeType: "Contractor",
    created: "2024-09-03",
  },
];

const DriverPage = () => {
  const [data, setData] = useState<Driver[]>(initialData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Driver | null>(null);
  const [form, setForm] = useState<Omit<Driver, "id" | "created">>({
    name: "",
    phone: "",
    email: "",
    driverLicense: "",
    licenseType: "CDL",
    licenseExpire: "",
    vehicleId: "",
    employeeType: "Full-time",
  });

  const columns = driverColumns(
    (id) => {
      const driver = data.find((d) => d.id === id)!;
      setEditing(driver);
      setForm({
        name: driver.name,
        phone: driver.phone,
        email: driver.email,
        driverLicense: driver.driverLicense,
        licenseType: driver.licenseType,
        licenseExpire: driver.licenseExpire,
        vehicleId: driver.vehicleId,
        employeeType: driver.employeeType,
      });
      setDialogOpen(true);
    },
    (id) => setData((prev) => prev.filter((d) => d.id !== id))
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
  });

  const saveDriver = () => {
    const now = new Date().toISOString().slice(0, 10);
    if (editing) {
      setData((prev) =>
        prev.map((d) => (d.id === editing.id ? { ...editing, ...form } : d))
      );
    } else {
      setData((prev) => [
        ...prev,
        {
          id: `DRV${Date.now()}`,
          ...form,
          created: now,
        } as Driver,
      ]);
    }
    closeDialog();
  };

  const closeDialog = () => {
    setEditing(null);
    setForm({
      name: "",
      phone: "",
      email: "",
      driverLicense: "",
      licenseType: "CDL",
      licenseExpire: "",
      vehicleId: "",
      employeeType: "Full-time",
    });
    setDialogOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Drivers</h1>
        <Button onClick={() => setDialogOpen(true)}>+ New Driver</Button>
      </div>

      <div className="rounded border overflow-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableHead key={h.id}>
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination & Page Size */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm">Rows per page:</span>
          <Select
            value={String(table.getState().pagination.pageSize)}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Rows per page" />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 50].map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex space-x-2">
            <Button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Prev
            </Button>
            <Button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Driver" : "New Driver"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 space-y-4 py-4">
            <div className="space-y-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="space-y-4">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div className="space-y-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="space-y-4">
              <Label htmlFor="driverLicense">Driver License</Label>
              <Input
                id="driverLicense"
                placeholder="Driver License"
                value={form.driverLicense}
                onChange={(e) =>
                  setForm({ ...form, driverLicense: e.target.value })
                }
              />
            </div>
            <div className="space-y-4">
              <Label htmlFor="licenseType">License Type</Label>
              <Select
                value={form.licenseType}
                onValueChange={(v) =>
                  setForm({
                    ...form,
                    licenseType: v as Driver["licenseType"],
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["CDL", "B", "C"].map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-4">
              <Label htmlFor="licenseExpire">License Expire</Label>
              <Input
                id="licenseExpire"
                type="date"
                placeholder="License Expire"
                value={form.licenseExpire}
                onChange={(e) =>
                  setForm({ ...form, licenseExpire: e.target.value })
                }
              />
            </div>
            <div className="space-y-4">
              <Label htmlFor="vehicleId">Vehicle ID</Label>
              <Input
                id="vehicleId"
                placeholder="Vehicle ID"
                value={form.vehicleId}
                onChange={(e) =>
                  setForm({ ...form, vehicleId: e.target.value })
                }
              />
            </div>
            <div className="space-y-4">
              <Label htmlFor="employeeType">Employee Type</Label>
              <Select
                value={form.employeeType}
                onValueChange={(v) =>
                  setForm({
                    ...form,
                    employeeType: v as Driver["employeeType"],
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["Full-time", "Part-time", "Contractor"].map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={saveDriver}>
              {editing ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DriverPage;
