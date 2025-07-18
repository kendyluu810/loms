import { EllipsisVertical, SquarePen } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function Step2Shipments() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 mt-10 border p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Shipments</h3>
        <div className="flex items-center space-x-6">
          <SquarePen />
          <EllipsisVertical />
        </div>
      </div>

      <div className="flex flex-col space-y-8">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <Label>Item Category</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Item Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"Electronics"}>Electronics</SelectItem>
                <SelectItem value={"Furniture"}>Furniture</SelectItem>
                <SelectItem value={"Clothing"}>Clothing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Weight (kg)</Label>
            <Input placeholder="Enter Weight (kg)" />
          </div>
          <div>
            <Label>Length (cm)</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Length (cm)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"100"}>100</SelectItem>
                <SelectItem value={"200"}>200</SelectItem>
                <SelectItem value={"300"}>300</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Rate ($)</Label>
            <div className="flex items-center space-x-2">
              <Input placeholder="Enter Rate ($)" />
              <Select>
                <SelectTrigger className="w-fit">
                  <SelectValue defaultValue={"usd"} placeholder="USD" />
                </SelectTrigger>
                <SelectContent className="w-fit">
                  <SelectItem value={"usd"}>USD</SelectItem>
                  <SelectItem value={"eur"}>EUR</SelectItem>
                  <SelectItem value={"gbp"}>GBP</SelectItem>
                  <SelectItem value={"vnd"}>VND</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <Label>Equipment Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Equipment Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"van"}>Van</SelectItem>
                <SelectItem value={"truck"}>Truck</SelectItem>
                <SelectItem value={"container"}>Container</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Truck Load</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Truck Load" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"full"}>Full</SelectItem>
                <SelectItem value={"partial"}>Partial</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Dangerous Good</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Dangerous Good" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"yes"}>Yes</SelectItem>
                <SelectItem value={"no"}>No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Danger Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Danger Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"explosive"}>Explosive</SelectItem>
                <SelectItem value={"flammable"}>Flammable</SelectItem>
                <SelectItem value={"toxic"}>Toxic</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
