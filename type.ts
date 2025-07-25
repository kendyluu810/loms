export type CustomerType =
  | "Shipper"
  | "Receiver"
  | "Broker"
  | "Partner"
  | "Other";

export interface Customer {
  _id?: string;
  cusID?: string;
  companyName: string;
  customerType: CustomerType;
  companyEmail: string;
  companyPhone: string;
  contactPerson?: string;
  contactPhone?: string;
  contactEmail?: string;
}

export type RouteTimelineStep = {
  step: string;
  location: string;
  time: string; // ISO date
  status: "done" | "in-progress" | "pending";
};

export type Route = {
  _id: string;
  origin: string;
  pickupNumber: string;
  shipperSchedule: string;
  addressPickup: string;
  pickupTime: string;
  pickupDate: string;
  destination: string;
  deliveryNumber: string;
  receiverSchedule: string;
  addressDelivery: string;
  deliveryTime: string;
  deliveryDate: string;
  additionalStop: string;
  warehouseNumber: string;
  warehouseSchedule: string;
  date: string;
  time: string;
  timeline?: RouteTimelineStep[];
};

export type Shipment = {
  _id: string;
  itemCategory: string;
  weight: number;
  length: number;
  rate: number;
  rateUnit: "USD" | "EUR" | "VND";
  equipmentType: string;
  truckLoad: string;
  dangerousGoods: boolean;
  dangerType: string;
};

export type Employee = {
  _id: string;
  Eid: string;
  name: string;
  phone: string;
  email: string;
  position: string;
};

export type Driver = {
  _id: string;
  employee: Employee;
  driverlicense: string;
  licensetype: string;
  licenseexpiry: string;
  vehicleid: string;
  vehicleType: string;
  vehicleNumber: string;
};

export type Load = {
  _id: string;
  loadNumber: string;
  customer: {
    name: string;
    contactName: string;
    contactPhone: string;
  };
  route?: Route;
  shipment?: Shipment;
  driver?: Driver;
  miles?: string;
  stop?: string;
  status?: "Posted" | "Assigned" | "In Transit" | "Delivered";
  createdAt: string;
  updatedAt: string;
};
