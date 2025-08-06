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

  const fetchCustomers = useCallback(async () => {
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
      console.error(err); // hoặc bỏ dòng này nếu không cần
    }
  }, [search, page, pageSize]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return (
    <div className="p-4 space-y-4 sm:space-y-6">
      <h2 className="font-bold text-xl sm:text-2xl text-[#022f7e]">
        List of Customers
      </h2>
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
      {/* Customers Table Desktop */}
      <div className="hidden sm:block overflow-x-auto rounded-lg border">
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
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="text-center py-6 text-gray-500 font-semibold"
                >
                  No customer found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Mobile Card View (<sm) */}
      <div className="sm:hidden space-y-6">
        {customers.length > 0 ? (
          customers.map((customer) => (
            <div key={customer._id} className="border rounded-lg p-4 shadow-sm">
              <p>
                <strong>Cid:</strong> {customer.cusID}
              </p>
              <p>
                <strong>Company:</strong> {customer.companyName}
              </p>
              <p>
                <strong>Email:</strong> {customer.companyEmail}
              </p>
              <p>
                <strong>Phone:</strong> {customer.companyPhone}
              </p>
              <p>
                <strong>Contact:</strong> {customer.contactPerson}
              </p>
              <p>
                <strong>Contact Email:</strong> {customer.contactEmail}
              </p>
              <p>
                <strong>Contact Phone:</strong> {customer.contactPhone}
              </p>
              <p>
                <strong>Type:</strong> {customer.customerType}
              </p>
              <div className="mt-2 flex flex-wrap gap-3 space-x-2">
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
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No customer found</p>
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
