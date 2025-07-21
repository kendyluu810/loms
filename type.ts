export type Load_Data = {
  title: string;
  origin: string;
  pickupNumber: string;
  shipperSchedule: Date;
  pickupDate: Date;
  pickupTime: Date;
  destination: string;
  deliveryNumber: string;
  receiverSchedule: Date;
  deliveryDate: Date;
  deliveryTime: Date;
  additionalStop: string;
  warehoouseNumber: string;
  warehouseSchedule: Date;
  dateAS: Date;
  time: Date;
  itemCategory: string;
  weight: string;
  length: string;
  rate: string;
  equipmentType: string;
  truckLoad: string;
  dangerousGoods: boolean;
  dangerType: boolean;
  customer: string;
  companyEmail: string;
  companyPhone: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
};

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
