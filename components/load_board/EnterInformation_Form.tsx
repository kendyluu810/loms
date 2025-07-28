"use client";

import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import countries from "world-countries";
import { Customer } from "@/type";
import { useLoadStore } from "@/store/useLoadStore";
import { CountrySelect } from "./countriesSelect";

export default function EnterInformation_Form({
  onApplyFilters,
}: {
  onApplyFilters: (filters: Record<string, string>) => void;
}) {
  const [formData, setFormData] = useState({
    origin: "",
    stateFrom: "",
    radiusFrom: "",
    additionalStop: "",
    pickupFrom: "",
    equipmentType: "",
    rate: "",
    destination: "",
    stateTo: "",
    radiusTo: "",
    createdAt: "",
    pickupTo: "",
    searchTerm: "",
    customer: "",
    customerType: "",
    contactPerson: "",
    minWeight: "",
    maxWeight: "",
    minMiles: "",
    ratePerMile: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filters = Object.fromEntries(
      Object.entries(formData).filter(([_, v]) => v.trim() !== "")
    );
    onApplyFilters(filters);
  };

  const handleReset = () => {
    const resetData = Object.fromEntries(
      Object.entries(formData).map(([key]) => [key, ""])
    );
    setFormData(resetData as typeof formData);
    onApplyFilters({});
  };

  const { customer, updateCustomer } = useLoadStore();

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
      updateCustomer({
        _id: selected._id,
        cusID: selected.cusID,
        companyName: selected.companyName,
        companyEmail: selected.companyEmail,
        companyPhone: selected.companyPhone,
        contactPerson: selected.contactPerson,
        contactEmail: selected.contactEmail,
        contactPhone: selected.contactPhone,
        customerType: selected.customerType || "Shipper", // default to Shipper if not set
      });
      setFormData((prev) => ({ ...prev, customer: selected._id ?? "" }));
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-[#fafcff] p-6 rounded-lg shadow max-w-full xl:max-w-[1600px] mx-auto"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-[#022f7e]">Enter Information</h2>
        <div className="flex space-x-4">
          <Button
            type="submit"
            className="text-[#6c9ef5] bg-[#fafcff] hover:bg-[#6c9ef5] hover:text-[#fafcff]"
          >
            Apply Filters
          </Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Origin */}
        <div className="flex flex-col space-y-2">
          <Label>Origin</Label>
          <CountrySelect
            value={formData.origin}
            onChange={(v) => setFormData((prev) => ({ ...prev, origin: v }))}
            placeholder="Select Origin"
          />
        </div>

        {/* State From */}
        <div className="flex flex-col space-y-2">
          <Label>State From</Label>
          <CountrySelect
            value={formData.stateFrom}
            onChange={(v) => setFormData((prev) => ({ ...prev, stateFrom: v }))}
            placeholder="Select State"
          />
        </div>

        {/* Radius From */}
        <div className="flex flex-col space-y-2">
          <Label>Radius (Miles)</Label>
          <Input
            type="number"
            value={formData.radiusFrom}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, radiusFrom: e.target.value }))
            }
          />
        </div>

        {/* Additional Stop */}
        <div className="flex flex-col space-y-2">
          <Label>Additional Stop</Label>
          <CountrySelect
            value={formData.additionalStop}
            onChange={(v) =>
              setFormData((prev) => ({ ...prev, additionalStop: v }))
            }
            placeholder="Select Stop"
          />
        </div>

        {/* Pickup From */}
        <div className="flex flex-col space-y-2">
          <Label>Pickup From</Label>
          <Input
            type="date"
            value={formData.pickupFrom}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, pickupFrom: e.target.value }))
            }
          />
        </div>

        {/* Equipment Types */}
        <div className="flex flex-col space-y-2">
          <Label>Equipment Types</Label>
          <Input
            value={formData.equipmentType}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                equipmentType: e.target.value,
              }))
            }
          />
        </div>

        {/* Rate */}
        <div className="flex flex-col space-y-2">
          <Label>Rate</Label>
          <Input
            type="number"
            value={formData.rate}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, rate: e.target.value }))
            }
          />
        </div>

        {/* Destination */}
        <div className="flex flex-col space-y-2">
          <Label>Destination</Label>
          <CountrySelect
            value={formData.destination}
            onChange={(v) =>
              setFormData((prev) => ({ ...prev, destination: v }))
            }
            placeholder="Select Destination"
          />
        </div>

        {/* State To */}
        <div className="flex flex-col space-y-2">
          <Label>State To</Label>
          <CountrySelect
            value={formData.stateTo}
            onChange={(v) => setFormData((prev) => ({ ...prev, stateTo: v }))}
            placeholder="Select State"
          />
        </div>

        {/* Radius To */}
        <div className="flex flex-col space-y-2">
          <Label>Radius (Miles)</Label>
          <Input
            type="number"
            value={formData.radiusTo}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, radiusTo: e.target.value }))
            }
          />
        </div>

        {/* createdAt */}
        <div className="flex flex-col space-y-2">
          <Label>createdAt</Label>
          <Input
            type="number"
            value={formData.createdAt}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, createdAt: e.target.value }))
            }
          />
        </div>

        {/* Pickup To */}
        <div className="flex flex-col space-y-2">
          <Label>Pickup To</Label>
          <Input
            type="date"
            value={formData.pickupTo}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, pickupTo: e.target.value }))
            }
          />
        </div>

        {/* Search Term */}
        <div className="flex flex-col space-y-2">
          <Label>Search Term</Label>
          <Input
            value={formData.searchTerm}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, searchTerm: e.target.value }))
            }
          />
        </div>

        {/* Customer */}
        <div className="flex flex-col space-y-2">
          <Label>Company Name</Label>
          <Select onValueChange={(id) => handleSelectCustomer(id)}>
            <SelectTrigger className="w-full border border-[#d6e5ff] ">
              <SelectValue placeholder="Select Company" />
            </SelectTrigger>
            <SelectContent>
              {customers.map((customer) => (
                <SelectItem key={customer._id ?? ""} value={customer._id ?? ""}>
                  {customer.companyName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Contact Person */}
        <div className="flex flex-col space-y-2">
          <Label>Contact Person</Label>
          <Select onValueChange={(id) => handleSelectCustomer(id)}>
            <SelectTrigger className="w-full border border-[#d6e5ff] ">
              <SelectValue placeholder="Select Contact Person" />
            </SelectTrigger>
            <SelectContent>
              {customers.map((customer) => (
                <SelectItem key={customer._id ?? ""} value={customer._id ?? ""}>
                  {customer.contactPerson}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/*Customer Type */}
        <div className="flex flex-col space-y-2">
          <Label>Customer Type</Label>
          <Select onValueChange={(id) => handleSelectCustomer(id)}>
            <SelectTrigger className="w-full border border-[#d6e5ff] ">
              <SelectValue placeholder="Select Customer Type" />
            </SelectTrigger>
            <SelectContent>
              {customers.map((customer) => (
                <SelectItem key={customer._id ?? ""} value={customer._id ?? ""}>
                  {customer.customerType}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Min Weight */}
        <div className="flex flex-col space-y-2">
          <Label>Min Weight (lbs)</Label>
          <Input
            type="number"
            value={formData.minWeight}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, minWeight: e.target.value }))
            }
          />
        </div>

        {/* Max Weight */}
        <div className="flex flex-col space-y-2">
          <Label>Max Weight (lbs)</Label>
          <Input
            type="number"
            value={formData.maxWeight}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, maxWeight: e.target.value }))
            }
          />
        </div>

        {/* Min Miles */}
        <div className="flex flex-col space-y-2">
          <Label>Min Miles</Label>
          <Input
            type="number"
            value={formData.minMiles}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, minMiles: e.target.value }))
            }
          />
        </div>

        {/* Rate Per Mile */}
        <div className="flex flex-col space-y-2">
          <Label>Rate Per Mile</Label>
          <Input
            type="number"
            step="0.01"
            value={formData.ratePerMile}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, ratePerMile: e.target.value }))
            }
          />
        </div>
      </div>
    </form>
  );
}
