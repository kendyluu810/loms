import { useLoadStore } from "@/store/useLoadStore";
import { Carrier, Customer } from "@/type";
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
  const { customer, updateCustomer, carrier, updateCarrier } = useLoadStore();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [carriers, setCarriers] = useState<Carrier[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [customerRes, carrierRes] = await Promise.all([
        fetch("/api/customers/"),
        fetch("/api/carriers"),
      ]);
      const customerData = await customerRes.json();
      const carrierData = await carrierRes.json();
      setCustomers(customerData.customers || []);
      setCarriers(carrierData.carriers || []);
    };
    fetchData();
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

  const handleSelectCarrier = (_id: string) => {
    const selected = carriers.find((c) => c._id === _id);
    if (selected) {
      updateCarrier({
        _id: selected._id,
        name: selected.name,
        mcNumber: selected.mcNumber,
        dotNumber: selected.dotNumber,
        email: selected.email,
        phone: selected.phone,
        address: selected.address,
      });
    }
  };
  return (
    <>
      <div className=" mx-auto space-y-6 mt-10 border p-6 rounded-lg shadow-md">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-[#022f7e]">Customer</h3>
          </div>
          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">
              Select Customer
            </Label>
            <Select onValueChange={(id) => handleSelectCustomer(id)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a customer" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((customer) => (
                  <SelectItem
                    key={customer._id ?? ""}
                    value={customer._id ?? ""}
                  >
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
      </div>
      <div className=" mx-auto space-y-6 mt-10 border p-6 rounded-lg shadow-md">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-[#022f7e]">Carrier</h3>
          </div>
          <div className="space-y-3">
            <Label className="text-[#022f7e] font-semibold">
              Select Carrier
            </Label>
            <Select onValueChange={(id) => handleSelectCarrier(id)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a carrier" />
              </SelectTrigger>
              <SelectContent>
                {carriers.map((carrier) => (
                  <SelectItem key={carrier._id ?? ""} value={carrier._id ?? ""}>
                    {carrier.name} - {carrier.mcNumber || "N/A"} -{" "}
                    {carrier.dotNumber || "N/A"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <Input
              readOnly
              value={carrier.mcNumber || ""}
              placeholder="MC Number"
            />
            <Input
              readOnly
              value={carrier.dotNumber || ""}
              placeholder="DOT Number"
            />
            <Input readOnly value={carrier.email || ""} placeholder="Email" />
            <Input readOnly value={carrier.phone || ""} placeholder="Phone" />
            <Input
              readOnly
              value={carrier.address || ""}
              placeholder="Address"
            />
          </div>
        </div>
      </div>
    </>
  );
}
