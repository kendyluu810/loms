import { useLoadStore } from "@/store/useLoadStore";
import { Customer } from "@/type";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";

export default function Step3Owner() {
  const { owner, updateOwner } = useLoadStore();
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const res = await fetch("/api/customers");
      const data = await res.json();
      setCustomers(data.customers || []);
    };
    fetchCustomers();
  }, []);

  const handleSelectCustomer = (_id: string) => {
    const selected = customers.find((c) => c._id === _id);
    if (selected) {
      updateOwner({
        _id: selected._id,
        Cid: selected.Cid,
        name: selected.name,
        email: selected.email,
        phone: selected.phone,
        contactName: selected.contactName,
        contactEmail: selected.contactEmail,
        contactPhone: selected.contactPhone,
      });
    }
  };
  return (
    <div className="max-w-7xl mx-auto space-y-6 mt-10 border p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-[#022f7e]">Owner</h3>
      </div>

      <div className="flex flex-col space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border p-4 rounded-md ">
          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">Customer</Label>
            <Select onValueChange={(id) => handleSelectCustomer(id)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Customer" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((customer) => (
                  <SelectItem
                    key={customer._id ?? ""}
                    value={customer._id ?? ""}
                  >
                    {customer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">
              Company Email
            </Label>
            <Select onValueChange={(id) => handleSelectCustomer(id)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Company Email" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((customer) => (
                  <SelectItem
                    key={customer._id ?? ""}
                    value={customer._id ?? ""}
                  >
                    {customer.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">
              Company Phone
            </Label>
            <Select onValueChange={(id) => handleSelectCustomer(id)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Company Phone" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((customer) => (
                  <SelectItem
                    key={customer._id ?? ""}
                    value={customer._id ?? ""}
                  >
                    {customer.phone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border p-4 rounded-md">
          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">
              Contact Person
            </Label>
            <Select onValueChange={(id) => handleSelectCustomer(id)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Contact Person" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((customer) => (
                  <SelectItem
                    key={customer._id ?? ""}
                    value={customer._id ?? ""}
                  >
                    {customer.contactName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">
              Contact Email
            </Label>
            <Select onValueChange={(id) => handleSelectCustomer(id)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Contact Email" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((customer) => (
                  <SelectItem
                    key={customer._id ?? ""}
                    value={customer._id ?? ""}
                  >
                    {customer.contactEmail}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">
              Contact Phone
            </Label>
            <Select onValueChange={(id) => handleSelectCustomer(id)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Contact Phone" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((customer) => (
                  <SelectItem
                    key={customer._id ?? ""}
                    value={customer._id ?? ""}
                  >
                    {customer.contactPhone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
