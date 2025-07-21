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
import AddCustomerModal from "@/components/customers/AddCustomerModal";
import EditCustomerModal from "@/components/customers/EditCustomerModal";
import { Input } from "@/components/ui/input";

type Customer = {
  _id: string;
  Cid: string;
  name: string;
  email: string;
  phone: string;
  deliveryMethod: "Air" | "Sea" | "Land";
};
export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const totalPage = Math.ceil(total / pageSize);

  const fetchCustomers = async () => {
    const res = await fetch(
      `/api/customers?search=${search}&page=${page}&pageSize=${pageSize}`
    );
    const data = await res.json();
    setCustomers(data.customers);
    setTotal(data.total);
  };

  useEffect(() => {
    fetchCustomers();
  }, [search, page, pageSize]);

  return (
    <div className="flex flex-col h-screen p-4 space-y-4">
      <h2 className="font-bold text-2xl">List of Customers</h2>
      <div className="flex justify-between space-x-4 space-y-4">
        <Input
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <AddCustomerModal onAdded={fetchCustomers} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cid</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Delivery Method</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers &&
            customers.map((customer) => (
              <TableRow key={customer._id}>
                <TableCell>{customer.Cid}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.deliveryMethod}</TableCell>
                <TableCell className=" flex gap-2 space-x-2 items-center">
                  <EditCustomerModal
                    customer={customer}
                    onUpdated={fetchCustomers}
                  />
                  <Button
                    variant="destructive"
                    onClick={async () => {
                      await fetch(`/api/customers/${customer._id}`, {
                        method: "DELETE",
                      });
                      fetchCustomers();
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
