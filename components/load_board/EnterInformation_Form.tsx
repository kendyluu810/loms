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

const countryOptions = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
}));

export default function EnterInformation_Form() {
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
    age: "",
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

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleReset = () => {
    setFormData({
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
      age: "",
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
  };
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
          <Select onValueChange={(v) => handleChange("origin", v)}>
            <SelectTrigger className="w-full border border-[#d6e5ff] ">
              <SelectValue placeholder="Select Origin" />
            </SelectTrigger>
            <SelectContent>
              {countryOptions.map((country) => (
                <SelectItem key={country.value} value={country.label}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* State From */}
        <div className="flex flex-col space-y-2">
          <Label>State From</Label>
          <Select onValueChange={(v) => handleChange("stateFrom", v)}>
            <SelectTrigger className="w-full border border-[#d6e5ff] ">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              {countryOptions.map((country) => (
                <SelectItem key={country.value} value={country.label}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Radius From */}
        <div className="flex flex-col space-y-2">
          <Label>Radius (Miles)</Label>
          <Input
            type="number"
            value={formData.radiusFrom}
            onChange={(e) => handleChange("radiusFrom", e.target.value)}
          />
        </div>

        {/* Additional Stop */}
        <div className="flex flex-col space-y-2">
          <Label>Additional Stop</Label>
          <Select onValueChange={(v) => handleChange("additionalStop", v)}>
            <SelectTrigger className="w-full border border-[#d6e5ff] ">
              <SelectValue placeholder="Select Stop" />
            </SelectTrigger>
            <SelectContent>
              {countryOptions.map((country) => (
                <SelectItem key={country.value} value={country.label}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Pickup From */}
        <div className="flex flex-col space-y-2">
          <Label>Pickup From</Label>
          <Input
            type="date"
            value={formData.pickupFrom}
            onChange={(e) => handleChange("pickupFrom", e.target.value)}
          />
        </div>

        {/* Equipment Types */}
        <div className="flex flex-col space-y-2">
          <Label>Equipment Types</Label>
          <Input
            value={formData.equipmentType}
            onChange={(e) => handleChange("equipmentType", e.target.value)}
          />
        </div>

        {/* Rate */}
        <div className="flex flex-col space-y-2">
          <Label>Rate</Label>
          <Input
            type="number"
            value={formData.rate}
            onChange={(e) => handleChange("rate", e.target.value)}
          />
        </div>

        {/* Destination */}
        <div className="flex flex-col space-y-2">
          <Label>Destination</Label>
          <Select onValueChange={(v) => handleChange("destination", v)}>
            <SelectTrigger className="w-full border border-[#d6e5ff] ">
              <SelectValue placeholder="Select Destination" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Joliet">Joliet</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* State To */}
        <div className="flex flex-col space-y-2">
          <Label>State To</Label>
          <Select onValueChange={(v) => handleChange("stateTo", v)}>
            <SelectTrigger className="w-full border border-[#d6e5ff] ">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              {countryOptions.map((country) => (
                <SelectItem key={country.value} value={country.label}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Radius To */}
        <div className="flex flex-col space-y-2">
          <Label>Radius (Miles)</Label>
          <Input
            type="number"
            value={formData.radiusTo}
            onChange={(e) => handleChange("radiusTo", e.target.value)}
          />
        </div>

        {/* Age */}
        <div className="flex flex-col space-y-2">
          <Label>Age (Hour)</Label>
          <Input
            type="number"
            value={formData.age}
            onChange={(e) => handleChange("age", e.target.value)}
          />
        </div>

        {/* Pickup To */}
        <div className="flex flex-col space-y-2">
          <Label>Pickup To</Label>
          <Input
            type="date"
            value={formData.pickupTo}
            onChange={(e) => handleChange("pickupTo", e.target.value)}
          />
        </div>

        {/* Search Term */}
        <div className="flex flex-col space-y-2">
          <Label>Search Term</Label>
          <Input
            value={formData.searchTerm}
            onChange={(e) => handleChange("searchTerm", e.target.value)}
          />
        </div>

        {/* Customer */}
        <div className="flex flex-col space-y-2">
          <Label>Customer</Label>
          <Select onValueChange={(id) => handleSelectCustomer(id)}>
            <SelectTrigger className="w-full border border-[#d6e5ff] ">
              <SelectValue placeholder="Select Customer" />
            </SelectTrigger>
            <SelectContent>
              {customers.map((customer) => (
                <SelectItem key={customer._id ?? ""} value={customer._id ?? ""}>
                  {customer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Customer Phone */}
        <div className="flex flex-col space-y-2">
          <Label>Customer Phone</Label>
          <Select onValueChange={(id) => handleSelectCustomer(id)}>
            <SelectTrigger className="w-full border border-[#d6e5ff] ">
              <SelectValue placeholder="Select Customer Phone" />
            </SelectTrigger>
            <SelectContent>
              {customers.map((customer) => (
                <SelectItem key={customer._id ?? ""} value={customer._id ?? ""}>
                  {customer.phone}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Contact Email */}
        <div className="flex flex-col space-y-2">
          <Label>Contact Email</Label>
          <Select onValueChange={(id) => handleSelectCustomer(id)}>
            <SelectTrigger className="w-full border border-[#d6e5ff] ">
              <SelectValue placeholder="Select Customer Email" />
            </SelectTrigger>
            <SelectContent>
              {customers.map((customer) => (
                <SelectItem key={customer._id ?? ""} value={customer._id ?? ""}>
                  {customer.email}
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
            onChange={(e) => handleChange("minWeight", e.target.value)}
          />
        </div>

        {/* Max Weight */}
        <div className="flex flex-col space-y-2">
          <Label>Max Weight (lbs)</Label>
          <Input
            type="number"
            value={formData.maxWeight}
            onChange={(e) => handleChange("maxWeight", e.target.value)}
          />
        </div>

        {/* Min Miles */}
        <div className="flex flex-col space-y-2">
          <Label>Min Miles</Label>
          <Input
            type="number"
            value={formData.minMiles}
            onChange={(e) => handleChange("minMiles", e.target.value)}
          />
        </div>

        {/* Rate Per Mile */}
        <div className="flex flex-col space-y-2">
          <Label>Rate Per Mile</Label>
          <Input
            type="number"
            step="0.01"
            value={formData.ratePerMile}
            onChange={(e) => handleChange("ratePerMile", e.target.value)}
          />
        </div>
      </div>
    </form>
  );
}
