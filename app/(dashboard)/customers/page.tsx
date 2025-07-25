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
import { Customer } from "@/type";
import { toast } from "sonner";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const totalPage = Math.ceil(total / pageSize);

  const fetchCustomers = async () => {
    try {
      const res = await fetch(
        `/api/customers?search=${search}&page=${page}&pageSize=${pageSize}`
      );

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setCustomers(data.customers);
      setTotal(data.total);
    } catch (err) {
      toast.error("Failed to load customers");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [search, page, pageSize]);

  return (
    <div className="p-4 space-y-4">
      <h2 className="font-bold text-2xl text-[#022f7e]">List of Customers</h2>
      {/* Search + Add */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <Input
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2"
        />
        <AddCustomerModal onAdded={fetchCustomers} />
      </div>
      {/* Customers Table */}
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cid</TableHead>
              <TableHead>Company Name</TableHead>
              <TableHead>Company Email</TableHead>
              <TableHead>Company Phone</TableHead>
              <TableHead>Contact Name</TableHead>
              <TableHead>Contact Email</TableHead>
              <TableHead>Contact Phone</TableHead>
              <TableHead>Customer Type</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers && customers.length > 0 ? (
              customers.map((customer) => (
                <TableRow key={customer.cusID}>
                  <TableCell>{customer.cusID}</TableCell>
                  <TableCell>{customer.companyName}</TableCell>
                  <TableCell>{customer.companyEmail}</TableCell>
                  <TableCell>{customer.companyPhone}</TableCell>
                  <TableCell>{customer.contactPerson}</TableCell>
                  <TableCell>{customer.contactEmail}</TableCell>
                  <TableCell>{customer.contactPhone}</TableCell>
                  <TableCell>{customer.customerType}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
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
                          toast.success(
                            `Customer ${customer.companyName} deleted successfully`
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
              <div className="text-xl text-gray-500 font-bold space-y-4 gap-4 text-center">
                No customer found
              </div>
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
