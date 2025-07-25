import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import { ConfirmDeleteDialog } from "../dialogs/ConfirmDeleteDialog";
export type Load = {
  loadNumber: string;
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
  rateUnit: string;
  stop: string;
  state: string;
};

export const columns = (onDelete: (id: string) => void): ColumnDef<Load>[] => [
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
    accessorKey: "loadNumber",
    header: "Load#",
    cell: ({ row }) => {
      const router = useRouter();
      const load = row.original;
      return (
        <div
          className="text-blue-600 underline cursor-pointer"
          onClick={() => router.push(`/load_board/${load.loadNumber}`)}
        >
          {load.loadNumber}
        </div>
      );
    },
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
    cell: ({ row }) => <div>{row.getValue("equipment") || "N/A"}</div>,
  },
  {
    accessorKey: "weight",
    header: "Weight",
  },
  {
    accessorKey: "rate",
    header: "Rate",
    cell: ({ row }) => (
      <div>
        <div>{row.getValue("rate")}</div>
        <div className="text-sm">{row.original.rateUnit}</div>
      </div>
    ),
  },
  {
    accessorKey: "stop",
    header: "Stop",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={
          row.getValue("status") === "Posted" ? "secondary" : "destructive"
        }
      >
        {row.getValue("status")}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const load = row.original;

      return (
        <ConfirmDeleteDialog
          onConfirm={() => onDelete(load.loadNumber)}
          itemName={load.loadNumber}
        />
      );
    },
  },
];
