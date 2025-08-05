import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import { ConfirmDeleteDialog } from "../dialogs/ConfirmDeleteDialog";
import { LoadRow } from "@/type"; // đảm bảo import LoadRow
import { formatDistanceToNow } from "date-fns";

export const columns = (
  onDelete: (id: string) => void
): ColumnDef<LoadRow>[] => [
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
    accessorKey: "load_id",
    header: "Load#",
    cell: ({ row }) => {
      const router = useRouter();
      return (
        <div
          className="text-blue-600 underline cursor-pointer"
          onClick={() => router.push(`/load_board/${row.getValue("load_id")}`)}
        >
          {row.getValue("load_id")}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt");
      const timeAgo = formatDistanceToNow(
        new Date(createdAt as string | number | Date),
        {
          addSuffix: true,
        }
      );
      return <div className="text-sm text-gray-500">{timeAgo}</div>;
    },
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const { companyName, contactPerson, contactPhone } =
        row.original.customer;

      return (
        <div>
          <div className="font-medium">{companyName}</div>
          <div className="text-sm text-muted-foreground">
            ({contactPerson} - {contactPhone})
          </div>
        </div>
      );
    },
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
    cell: ({ row }) => {
      const status = row.getValue("status");

      const getStatusStyle = (status: string) => {
        switch (status?.toLowerCase()) {
          case "pending":
            return "bg-yellow-100 text-yellow-800 border border-yellow-300";
          case "in progress":
            return "bg-blue-100 text-blue-800 border border-blue-300";
          case "delivered":
            return "bg-green-100 text-green-800 border border-green-300";
          case "cancelled":
            return "bg-red-100 text-red-800 border border-red-300";
          default:
            return "bg-gray-100 text-gray-800 border border-gray-300";
        }
      };

      const formatStatus = (status: string) =>
        status
          .replace(/_/g, " ") // "in_progress" → "in progress"
          .replace(/\b\w/g, (c) => c.toUpperCase()); // "in progress" → "In Progress"

      return (
        <span
          className={`text-xs px-2 py-1 rounded font-medium ${getStatusStyle(
            status as string
          )}`}
        >
          {formatStatus(status as string)}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <ConfirmDeleteDialog
        onConfirm={() => onDelete(row.original.load_id)}
        itemName={row.original.load_id}
      />
    ),
  },
];
