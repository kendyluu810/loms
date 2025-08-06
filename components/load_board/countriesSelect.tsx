// components/CountrySelect.tsx
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import countries, { Country } from "world-countries";

export function CountrySelect({
  value,
  onChange,
  placeholder = "Select country",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const countryOptions = countries.map((country: Country) => ({
    value: country.cca2,
    label: country.name.common,
  }));

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {countryOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
