import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  deliveryMethod: "Air" | "Sea" | "Land";
  created: string;
};

const formatDate = (d: string) => new Date(d).toLocaleTimeString();

// Columns with action buttons
export const customerColumns = (
  onEdit: (id: string) => void,
  onDelete: (id: string) => void
): ColumnDef<Customer>[] => [
  { accessorKey: "id", header: "Customer ID" },
  { accessorKey: "name", header: "Name/Company" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "phone", header: "Phone" },
  {
    accessorKey: "deliveryMethod",
    header: "Delivery Method",
    cell: ({ getValue }) => {
      const method = getValue<string>();
      return <Badge variant="secondary">{method}</Badge>;
    },
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => <div>{formatDate(row.getValue("created"))}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button size="sm" onClick={() => onEdit(row.original.id)}>
          Edit
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => onDelete(row.original.id)}
        >
          Delete
        </Button>
      </div>
    ),
  },
];
