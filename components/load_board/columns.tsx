import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";

export type Load = {
  id: string;
  age: string;
  customer: string;
  contact: string;
  origin: string;
  pickupTime: string;
  pickupDate: string;
  miles: string;
  destination: string;
  deliveryTime: string;
  deliveryDate: string;
  equipment: string;
  weight: string;
  rate: string;
  stop: string;
  state: string;
};

export const columns: ColumnDef<Load>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  },
  {
    accessorKey: "id",
    header: "Load#",
    cell: ({ row }) => (
      <div className="text-blue-600 underline cursor-pointer">
        {row.getValue("id")}
      </div>
    ),
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => (
      <div>
        <div className="text-blue-600 underline cursor-pointer">
          {row.getValue("customer")}
        </div>
        <div className="text-sm">{row.original.contact}</div>
      </div>
    ),
  },
  {
    accessorKey: "origin",
    header: "Origin",
  },
  {
    accessorKey: "pickupTime",
    header: "Pickup",
    cell: ({ row }) => (
      <div>
        <div>{row.getValue("pickupTime")}</div>
        <div className="text-sm">{row.original.pickupDate}</div>
      </div>
    ),
  },
  {
    accessorKey: "miles",
    header: "Miles",
  },
  {
    accessorKey: "destination",
    header: "Destination",
  },
  {
    accessorKey: "deliveryTime",
    header: "Delivery",
    cell: ({ row }) => (
      <div>
        <div>{row.getValue("deliveryTime")}</div>
        <div className="text-sm">{row.original.deliveryDate}</div>
      </div>
    ),
  },
  {
    accessorKey: "equipment",
    header: "Equipment",
    cell: ({ row }) => (
      <div>{row.getValue("equipment") || "N/A"}</div> 
    ),
  },
  {
    accessorKey: "weight",
    header: "Weight",
  },
  {
    accessorKey: "rate",
    header: "Rate",
  },
  {
    accessorKey: "stop",
    header: "Stop",
  },
  {
    accessorKey: "state",
    header: "State",
    cell: ({ row }) => (
      <Badge
        variant={row.getValue("state") === "Posted" ? "default" : "destructive"}
      >
        {row.getValue("state")}
      </Badge>
    ),
  },
];
