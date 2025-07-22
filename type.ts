export type Employee = {
  _id: string;
  Eid: string;
  name: string;
  email: string;
  phone: string;
  position: "Manager" | "Driver" | "Staff";
};

export type Customer = {
  _id?: string;
  Cid?: string;
  name?: string;
  email?: string;
  phone?: string;
  contactName?: string; // Contact Person Name
  contactEmail?: string; // Contact Person Email
  contactPhone?: string; // Contact Person Phone
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

export type RouteData = {
  origin?: string;
  pickupNumber?: string;
  shipperSchedule?: string;
  pickupTime?: string;
  pickupDate?: string;
  destination?: string;
  deliveryNumber?: string;
  receiverSchedule?: string;
  deliveryTime?: string;
  deliveryDate?: string;
  additionalStop?: string;
  warehouseNumber?: string;
  warehouseSchedule?: string;
  date?: string;
  time?: string;
};

export type ShipmentData = {
  itemCategory?: string;
  weight?: number;
  length?: number;
  rate?: number;
  rateUnit?: string;
  equipmentType?: string;
  truckLoad?: string;
  dangerousGoods?: boolean;
  dangerType?: string;
};
