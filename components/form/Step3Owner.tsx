import { EllipsisVertical, Plus, SquarePen } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function Step3Owner() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 mt-10 border p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Owner</h3>
        <div className="flex items-center space-x-6">
          <Plus />
          <SquarePen />
          <EllipsisVertical />
        </div>
      </div>

      <div className="flex flex-col space-y-8">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Customer</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Customer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"customerA"}>Customer A</SelectItem>
                <SelectItem value={"customerB"}>Customer B</SelectItem>
                <SelectItem value={"customerC"}>Customer C</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Company Email</Label>
            <Input type="email" placeholder="Enter Company Email" />
          </div>
          <div>
            <Label>Company Phone</Label>
            <Input type="tel" placeholder="Enter Company Phone" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Contact Person</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Contact Person" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"john"}>John Doe</SelectItem>
                <SelectItem value={"jane"}>Jane Smith</SelectItem>
                <SelectItem value={"bob"}>Bob Johnson</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Contact Email</Label>
            <Input type="email" placeholder="Enter Contact Email" />
          </div>
          <div>
            <Label>Contact Phone</Label>
            <Input type="tel" placeholder="Enter Contact Phone" />
          </div>
        </div>
      </div>
    </div>
  );
}
