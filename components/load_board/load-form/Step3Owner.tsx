import { useLoadStore } from "@/store/useLoadStore";
import { Customer } from "@/type";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useEffect, useState } from "react";

export default function Step3Owner() {
  const { customer, updateCustomer } = useLoadStore();
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const res = await fetch(`/api/customers/`);
      const data = await res.json();
      setCustomers(data.customers || []);
    };
    fetchCustomers();
  }, []);

  const handleSelectCustomer = (_id: string) => {
    const selected = customers.find((c) => c._id === _id);
    if (selected) {
      updateCustomer({
        _id: selected._id,
        cusID: selected._id,
        companyName: selected.companyName,
        companyEmail: selected.companyEmail,
        companyPhone: selected.companyPhone,
        contactPerson: selected.contactPerson,
        contactEmail: selected.contactEmail,
        contactPhone: selected.contactPhone,
      });
    }
  };
  return (
    <div className=" mx-auto space-y-6 mt-10 border p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-[#022f7e]">Owner</h3>
      </div>
      <div className="space-y-3">
        <Label className="text-[#022f7e] font-semibold">Select Customer</Label>
        <Select onValueChange={(id) => handleSelectCustomer(id)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a customer" />
          </SelectTrigger>
          <SelectContent>
            {customers.map((customer) => (
              <SelectItem key={customer._id ?? ""} value={customer._id ?? ""}>
                {customer.companyName} - {customer.companyEmail}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <Input
          readOnly
          value={customer.companyEmail || ""}
          placeholder="Company Email"
        />
        <Input
          readOnly
          value={customer.companyPhone || ""}
          placeholder="Company Phone"
        />
        <Input
          readOnly
          value={customer.contactPerson || ""}
          placeholder="Contact Person"
        />
        <Input
          readOnly
          value={customer.contactEmail || ""}
          placeholder="Contact Email"
        />
        <Input
          readOnly
          value={customer.contactPhone || ""}
          placeholder="Contact Phone"
        />
      </div>
    </div>
  );
}
