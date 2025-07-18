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
import { Customer, customerColumns } from "@/components/customers/columns";
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

const initialData: Customer[] = [
  {
    id: "CUST1001",
    name: "Alice Smith",
    email: "alice@example.com",
    phone: "555-1234",
    deliveryMethod: "Air",
    created: "2025-07-15",
  },
  {
    id: "CUST1002",
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "555-5678",
    deliveryMethod: "Sea",
    created: "2025-07-16",
  },
  {
    id: "CUST1003",
    name: "Carol Williams",
    email: "carol@example.com",
    phone: "555-8765",
    deliveryMethod: "Land",
    created: "2025-07-17",
  },
  {
    id: "CUST1004",
    name: "David Brown",
    email: "david@example.com",
    phone: "555-4321",
    deliveryMethod: "Air",
    created: "2025-07-18",
  },
  {
    id: "CUST1005",
    name: "Eva Davis",
    email: "eva@example.com",
    phone: "555-2468",
    deliveryMethod: "Sea",
    created: "2025-07-19",
  },
  {
    id: "CUST1006",
    name: "Frank Miller",
    email: "frank@example.com",
    phone: "555-1357",
    deliveryMethod: "Land",
    created: "2025-07-20",
  },
  {
    id: "CUST1007",
    name: "Grace Wilson",
    email: "grace@example.com",
    phone: "555-9753",
    deliveryMethod: "Air",
    created: "2025-07-21",
  },
  {
    id: "CUST1008",
    name: "Henry Moore",
    email: "henry@example.com",
    phone: "555-8642",
    deliveryMethod: "Sea",
    created: "2025-07-22",
  },
  {
    id: "CUST1009",
    name: "Ivy Taylor",
    email: "ivy@example.com",
    phone: "555-7531",
    deliveryMethod: "Land",
    created: "2025-07-23",
  },
  {
    id: "CUST1010",
    name: "Jack Anderson",
    email: "jack@example.com",
    phone: "555-6420",
    deliveryMethod: "Air",
    created: "2025-07-24",
  },
  {
    id: "CUST1011",
    name: "Kathy Thomas",
    email: "kathy@example.com",
    phone: "555-5319",
    deliveryMethod: "Sea",
    created: "2025-07-25",
  },
  {
    id: "CUST1012",
    name: "Leo Jackson",
    email: "leo@example.com",
    phone: "555-4208",
    deliveryMethod: "Land",
    created: "2025-07-26",
  },
  {
    id: "CUST1013",
    name: "Mona White",
    email: "mona@example.com",
    phone: "555-3197",
    deliveryMethod: "Air",
    created: "2025-07-27",
  },
  {
    id: "CUST1014",
    name: "Nate Harris",
    email: "nate@example.com",
    phone: "555-2086",
    deliveryMethod: "Sea",
    created: "2025-07-28",
  },
  {
    id: "CUST1015",
    name: "Olivia Martin",
    email: "olivia@example.com",
    phone: "555-1975",
    deliveryMethod: "Land",
    created: "2025-07-29",
  },
];

const CustomersPage = () => {
  const [data, setData] = useState<Customer[]>(initialData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Customer | null>(null);
  const [form, setForm] = useState<Omit<Customer, "id" | "created">>({
    name: "",
    email: "",
    phone: "",
    deliveryMethod: "Air",
  });

  const columns = customerColumns(
    (id) => {
      const cust = data.find((c) => c.id === id)!;
      setEditing(cust);
      setForm({
        name: cust.name,
        email: cust.email,
        phone: cust.phone,
        deliveryMethod: cust.deliveryMethod,
      });
      setDialogOpen(true);
    },
    (id) => setData((prev) => prev.filter((c) => c.id !== id))
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

  const saveCustomer = () => {
    const now = new Date().toISOString().slice(0, 10);
    if (editing) {
      setData((prev) =>
        prev.map((c) => (c.id === editing.id ? { ...editing, ...form } : c))
      );
    } else {
      setData((prev) => [
        ...prev,
        {
          id: `CUST${Date.now()}`,
          ...form,
          created: now,
        } as Customer,
      ]);
    }
    closeDialog();
  };

  const closeDialog = () => {
    setEditing(null);
    setForm({
      name: "",
      email: "",
      phone: "",
      deliveryMethod: "Air",
    });
    setDialogOpen(false);
  };
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customers</h1>
        <Button onClick={() => setDialogOpen(true)}>+ New Customer</Button>
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
            <DialogTitle>
              {editing ? "Edit Customer" : "New Customer"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              placeholder="Name / Company"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <Select
              value={form.deliveryMethod}
              onValueChange={(v) =>
                setForm({
                  ...form,
                  deliveryMethod: v as Customer["deliveryMethod"],
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["Air", "Sea", "Road"].map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button onClick={saveCustomer}>
              {editing ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomersPage;
