import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
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
  {
    id: "#485553339",
    age: "00:30",
    customer: "Coca-Cola Company USA",
    contact: "Tom Keifer (765) 112-3006",
    origin: "Wichita, Kansas",
    pickupTime: "10:00",
    pickupDate: "14/05/22",
    miles: "1876mi",
    destination: "Jackson, Michigan",
    deliveryTime: "09:00",
    deliveryDate: "15/05/22",
    equipment: "Flatbed",
    weight: "50,000",
    rate: "$15,500",
    stop: "Two",
    state: "Error",
  },
  {
    id: "#123456789",
    age: "01:15",
    customer: "Amazon Logistics",
    contact: "Sarah Lee (555) 123-4567",
    origin: "Dallas, Texas",
    pickupTime: "08:30",
    pickupDate: "14/05/22",
    miles: "1200mi",
    destination: "Denver, Colorado",
    deliveryTime: "14:00",
    deliveryDate: "15/05/22",
    equipment: "Reefer",
    weight: "20,000",
    rate: "$7,200",
    stop: "One",
    state: "Posted",
  },
  {
    id: "#987654321",
    age: "02:45",
    customer: "Walmart Distribution",
    contact: "Mike Brown (444) 987-6543",
    origin: "Atlanta, Georgia",
    pickupTime: "07:00",
    pickupDate: "14/05/22",
    miles: "900mi",
    destination: "Orlando, Florida",
    deliveryTime: "16:00",
    deliveryDate: "15/05/22",
    equipment: "Dry Van",
    weight: "30,000",
    rate: "$5,800",
    stop: "Two",
    state: "Posted",
  },
  {
    id: "#246810121",
    age: "03:20",
    customer: "PepsiCo",
    contact: "Linda Green (333) 246-8101",
    origin: "Phoenix, Arizona",
    pickupTime: "11:00",
    pickupDate: "14/05/22",
    miles: "1500mi",
    destination: "Seattle, Washington",
    deliveryTime: "18:00",
    deliveryDate: "15/05/22",
    equipment: "Flatbed",
    weight: "40,000",
    rate: "$10,000",
    stop: "One",
    state: "Error",
  },
  {
    id: "#135791113",
    age: "04:05",
    customer: "Target Stores",
    contact: "James White (222) 135-7911",
    origin: "Chicago, Illinois",
    pickupTime: "13:00",
    pickupDate: "14/05/22",
    miles: "600mi",
    destination: "Minneapolis, Minnesota",
    deliveryTime: "10:00",
    deliveryDate: "15/05/22",
    equipment: "Van",
    weight: "25,000",
    rate: "$4,200",
    stop: "Two",
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
