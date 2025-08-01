"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Customer, ExtendedLoadRow } from "@/type";
import { MoreVertical, Pencil, Save } from "lucide-react";
import RouteCard from "./GeneralTabsForm/RouteCard";
import ShipmentCard from "./GeneralTabsForm/ShipmentCard";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GeneralTabsProps {
  load: ExtendedLoadRow;
  onUpdateLoad: (updatedLoad: ExtendedLoadRow) => void;
}

export default function GeneralTabs({ load, onUpdateLoad }: GeneralTabsProps) {
  const [editing, setEditing] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string>(
    load.customer?._id || ""
  );

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch("/api/customers");
        const data = await res.json();

        if (Array.isArray(data)) {
          setCustomers(data);
        } else if (Array.isArray(data.customers)) {
          setCustomers(data.customers);
        } else {
          setCustomers([]);
        }
      } catch (err) {
        toast.error("Failed to load customers");
        setCustomers([]);
      }
    };
    fetchCustomers();
  }, []);

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/load_board/${load.load_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer: selectedCustomer }),
      });

      if (!res.ok) throw new Error("Failed to update customer");
      const updated = customers.find((c) => c._id === selectedCustomer);
      if (updated) {
        const updatedLoad = { ...load, customer: updated };
        onUpdateLoad(updatedLoad); // ✅ gọi về LoadDetails để cập nhật lại UI
      }

      toast.success("Customer updated");
      setEditing(false);
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const selectedCustomerObj =
    (Array.isArray(customers) &&
      customers.find((c) => c._id === selectedCustomer)) ||
    load.customer;

  return (
    <div className="space-y-4">
      {/* ROUTE CARD */}
      <RouteCard load={load} onUpdateLoad={onUpdateLoad} />
      {/* SHIPMENT CARD */}
      <ShipmentCard load={load} setLoad={onUpdateLoad} />
      {/* CONTACTS CARD */}
      <Card className="border rounded-lg shadow-sm h-fitx">
        <CardHeader className="border-b flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-[#022f7e]">
            Customer
          </CardTitle>
          <div className="flex items-center space-x-2 ">
            {editing ? (
              <Save
                className="text-green-600 cursor-pointer w-4 h-4"
                onClick={handleSave}
              />
            ) : (
              <Pencil
                className="text-[#022f7e] cursor-pointer w-4 h-4"
                onClick={() => setEditing(true)}
              />
            )}
            <MoreVertical className="text-[#022f7e] cursor-pointer w-4 h-4" />
          </div>
        </CardHeader>
        <CardContent>
          {editing ? (
            <div className="grid grid-cols-1 gap-4">
              <div className="text-sm font-medium">Select Customer</div>
              <Select
                value={selectedCustomer}
                onValueChange={setSelectedCustomer}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem
                      key={customer._id ?? ""}
                      value={customer._id ?? ""}
                    >
                      {customer.companyName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <div className="font-semibold text-gray-600">
                  Company Contact
                </div>
                <div className="text-blue-700">
                  @{selectedCustomerObj?.companyName}
                </div>
                <div>{selectedCustomerObj?.companyPhone}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-600">
                  Contact Person
                </div>
                <div className="text-blue-700">
                  {selectedCustomerObj?.contactPerson}
                </div>
                <div>{selectedCustomerObj?.contactPhone}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
