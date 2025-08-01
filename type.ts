// Customer
export interface Customer {
  _id?: string;
  cusID?: string;
  companyName: string;
  customerType?: string;
  companyEmail: string;
  companyPhone: string;
  contactPerson?: string;
  contactPhone?: string;
  contactEmail?: string;
}
// Employee
export interface Employee {
  _id: string;
  Eid: string;
  name: string;
  phone: string;
  email: string;
  position: string; // e.g., "Manager", "Staff", "Driver", "Dispatcher", "Other"}
}

// Carrrier
export interface Carrier {
  _id: string;
  name: string;
  mcNumber?: string;
  dotNumber?: string;
  email?: string;
  phone?: string;
  address?: string;
  customer?: Customer;
  equipmentTypes?: string[];
  // rating?: number;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
// Driver
export interface Driver {
  _id: string;
  employee: Employee; // populated from ObjectId
  driverlicense: string;
  licensetype: string;
  licenseexpiry: string; // ISO string from backend (e.g. "2025-12-31T00:00:00.000Z")
}

//Vehicle
export interface Vehicle {
  _id?: string;
  truckNumber: string;
  trailerNumber: string;
  category: string;
  status: "available" | "in-transit" | "maintenance" | "reserved";
  isEmpty: boolean;
  assignedDriver?: Driver;
}

// Routes
export interface Route {
  _id?: string;
  origin: string;
  pickupNumber: string;
  pickupAddress: string;
  shipperSchedule?: {
    from: string;
    to: string;
  };
  pickupDate?: string;
  pickupTime?: string;

  destination: string;
  deliveryNumber: string;
  deliveryAddress: string;
  receiverSchedule?: {
    from: string;
    to: string;
  };
  deliveryDate?: string;
  deliveryTime?: string;

  additionalStop?: string;
  warehouseNumber?: string;
  warehouseSchedule?: {
    from: string;
    to: string;
  };

  date?: string;
  time?: string;
}
// Shipment
export interface Shipment {
  _id?: string;
  itemCategory: string;
  weight: number;
  length: number;
  rate: number;
  rateUnit: "USD" | "VND" | "Other";
  equipmentType: string;
  truckLoad: string;
  dangerousGood: boolean;
  dangerType?: string;
}
// LoadBoard
export type LoadStatus = "posted" | "in_transit" | "delivered" | "cancelled";

export interface LoadBoard {
  _id?: string;
  load_id: string;
  route: Route | string;
  shipment: Shipment | string;
  customer: Customer | string;
  carrier: Carrier | string;
  status: LoadStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LoadRow {
  load_id: string; // load_id
  customer: {
    companyName: string; // customer.companyName
    contactPerson?: string; // customer.contactPerson
    contactPhone?: string; // customer.contactPhone
  };
  carrier?: {
    name: string; // carrier.name
    mcNumber?: string; // carrier.mcNumber
    dotNumber?: string; // carrier.dotNumber
  };
  origin: string; // route.origin
  pickupTime: string; // route.pickupTime
  pickupDate?: string;
  miles?: string;
  destination: string;
  deliveryTime: string;
  deliveryDate?: string;
  equipment?: string; // shipment.equipmentType
  weight?: string; // shipment.weight
  rate?: string; // shipment.rate
  rateUnit?: string;
  stop?: string; // route.additionalStop
  status: string; // LoadStatus
  createdAt: string;
}

export interface RoutePoint {
  _id?: string;
  type: "pickup" | "stop" | "delivery";
  timezone: string;
  localTime: string;
  early: string;
  late: string;
  date: string;
  locationName: string;
  cityState: string;
  address: string;
  status: string;
  eta: string;
}

export interface ShipmentPoint {
  _id?: string;
  type: "pickup" | "stop" | "delivery";
  code: string;
  locationName?: string;
  eta?: string;
  status?: string; // e.g., 'pending', 'in transit', 'delivered'
  timezone?: string;
  remarks?: string;
}

export interface Invoice {
  _id?: string;
  loadId: string;
  customerId: string;
  carrierId: string;

  loadRate: number;
  fuelSurchargeCustomer: number;
  customerChargesTotal: number;

  carrierRate: number;
  fuelSurchargeCarrier: number;
  carrierChargesTotal: number;

  ratePerMile: number;
  miles: number;
  fuelRate: number;
  fuelSurcharge: number;

  invoiceTotal: number;
  carrierTotal: number;
  adjustedAmount?: number;
  carrierTotalPay?: number;
  remarks?: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface ExtendedLoadRow extends LoadRow {
  route: {
    pickupPoint?: RoutePoint;
    deliveryPoint?: RoutePoint;
    stopPoints?: RoutePoint[];
  };
  shipment: {
    equipmentType: string;
    pickupPoint: ShipmentPoint;
    deliveryPoint: ShipmentPoint;
    stopPoint?: ShipmentPoint;
    weight: number;
    pallets: number;
    rate: number;
  };
  customer: Customer;
  carrier?: Carrier
  invoice?: Invoice;
}
