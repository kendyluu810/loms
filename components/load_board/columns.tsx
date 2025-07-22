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

export const Loadsdata: Load[] = [
  {
    id: "#951159739",
    age: "00:01",
    customer: "LG Electronics USA",
    contact: "John Taylor (888) 865-3026",
    origin: "Hanover, Virginia",
    pickupTime: "09:00",
    pickupDate: "14/05/22",
    miles: "746mi",
    destination: "Joliet, Illinois",
    deliveryTime: "12:00",
    deliveryDate: "15/05/22",
    equipment: "Van",
    weight: "11,287",
    rate: "$3,500",
    stop: "One",
    state: "Posted",
  },

];
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
