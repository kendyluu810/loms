import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export type Driver = {
  id: string;
  name: string;
  phone: string;
  email: string;
  driverLicense: string;
  licenseType: "CDL" | "B" | "C";
  licenseExpire: string;
  vehicleId: string;
  employeeType: "Full-time" | "Part-time" | "Contractor";
  created: string;
};

const formatDate = (d: string) => new Date(d).toLocaleTimeString();

export const driverColumns = (
  onEdit: (id: string) => void,
  onDelete: (id: string) => void
): ColumnDef<Driver>[] => [
  { accessorKey: "id", header: "Driver ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "driverLicense", header: "Driver License" },
  {
    accessorKey: "licenseType",
    header: "License Type",
    cell: ({ getValue }) => (
      <Badge variant="secondary">{getValue<string>()}</Badge>
    ),
  },
  {
    accessorKey: "licenseExpire",
    header: "License Expire",
    cell: ({ row }) => <div>{formatDate(row.getValue("licenseExpire"))}</div>,
  },
  { accessorKey: "vehicleId", header: "Vehicle ID" },
  {
    accessorKey: "employeeType",
    header: "Employee Type",
    cell: ({ getValue }) => (
      <Badge variant="secondary">{getValue<string>()}</Badge>
    ),
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
