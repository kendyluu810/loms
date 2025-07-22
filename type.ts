export type Employee = {
  _id: string;
  Eid: string;
  name: string;
  email: string;
  phone: string;
  position: "Manager" | "Driver" | "Staff";
};

export type Customer = {
  _id: string;
  Cid: string;
  name: string;
  email: string;
  phone: string;
  contactName: string; // Contact Person Name
  contactEmail: string; // Contact Person Email
  contactPhone: string; // Contact Person Phone
  deliveryMethod: "Air" | "Sea" | "Land";
};

export type Driver = {
  _id: string;
  employee: Employee; // populated employee document
  driverlicense: string;
  licensetype: string;
  licenseexpiry: string; // Date string
  vehicleid: string;
  vehicleType: string;
  vehicleNumber: string;
};

export type Route = {
  origin: string;
  pickupNumber: string;
  shipperSchedule: Date;
  pickupTime: Date;
  pickupDate: Date;
  destination: string;
  deliveryNumber: string;
  receiverSchedule: Date;
  deliveryTime: Date;
  deliveryDate: Date;
  additionalStop: string;
  warehouseNumber: string;
  warehouseSchedule: Date;
  date: Date;
  time: Date;
};

export type Shipment = {
  itemCategory: string;
  weight: number;
  length: number;
  rate: number;
  rateUnit: string;
  equipmentType: string;
  truckLoad: string;
  dangerousGoods: boolean;
  dangerType: string;
};

export type Load = {
  _id: string;
  loadNumber: string;
  customer: Customer; // populated customer document
  route: Route; // populated route document
  shipment: Shipment; // populated shipment document
  createdAt: Date;
  miles?: string;
  stop?: string;
  status?: "Available" | "Assigned" | "In Transit" | "Delivered";
};
