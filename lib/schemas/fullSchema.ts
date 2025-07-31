import { z } from "zod";

const timeRangeSchema = z.object({
  from: z.string(),
  to: z.string(),
});

// -------------------------
// RoutePoint Schema
// -------------------------
export const routePointSchema = z.object({
  type: z.enum(["pickup", "stop", "delivery"]),
  timezone: z.string().optional(),
  localTime: z.string().optional(),
  early: z.string().optional(),
  late: z.string().optional(),
  date: z.string().optional(),
  locationName: z.string().optional(),
  cityState: z.string().optional(),
  address: z.string().optional(),
  status: z.string().optional(),
  eta: z.string().optional(),
});
// -------------------------
// Route Schema
// -------------------------
export const routeSchema = z.object({
  origin: z.string().min(1),
  pickupNumber: z.string().optional(),
  pickupAddress: z.string().min(1),
  shipperSchedule: timeRangeSchema.optional(),
  pickupDate: z.coerce.date(),
  pickupTime: z.string().optional(),

  destination: z.string().min(1),
  deliveryNumber: z.string().optional(),
  deliveryAddress: z.string().min(1),
  receiverSchedule: timeRangeSchema.optional(),
  deliveryDate: z.coerce.date(),
  deliveryTime: z.string().optional(),

  additionalStop: z.string().optional(),
  warehouseNumber: z.string().optional(),
  warehouseSchedule: timeRangeSchema.optional(),

  date: z.coerce.date().optional(),
  time: z.string().optional(),

  pickupPoint: routePointSchema.optional(),
  deliveryPoint: routePointSchema.optional(),
  stopPoints: z.array(routePointSchema).optional(),
});

// -------------------------
// ShipmentPoint Schema
// -------------------------
export const shipmentPointSchema = z.object({
  type: z.enum(["pickup", "stop", "delivery"]),
  code: z.string(),
  locationName: z.string().optional(),
  eta: z.string().optional(),
  status: z.string().optional(), // e.g., 'pending', 'in transit', 'delivered'
  timezone: z.string().optional(),
  remarks: z.string().optional(),
});

// -------------------------
// Shipment Schema
// -------------------------
export const shipmentSchema = z.object({
  itemCategory: z.string().min(1),
  weight: z.number().min(0),
  length: z.number().min(0),
  rate: z.number().min(0),
  rateUnit: z.string().min(1),

  equipmentType: z.string().min(1),
  truckLoad: z.string().min(1),
  dangerousGood: z.boolean().optional(),
  dangerType: z.string().optional(),

  pickupPoint: shipmentPointSchema.optional(),
  stopPoint: shipmentPointSchema.optional(),
  deliveryPoint: shipmentPointSchema.optional(),
});

// -------------------------
// Customer Schema
// -------------------------
export const customerSchema = z.object({
  cusID: z.string().optional(),
  companyName: z.string().min(1),
  companyEmail: z.string().email(),
  companyPhone: z.string().min(5),
  contactPerson: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().optional(),
  customerType: z.string().optional(), // Optional field for customer type
});

// -------------------------
// Carrier Schema
// -------------------------
export const carrierSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1),
  mcNumber: z.string().optional(),
  dotNumber: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().min(5).optional(),
  address: z.string().optional(),
  customer: z.string().optional(), // Reference to Customer ID
  equipmentTypes: z.array(z.string()).optional(),
  active: z.boolean().default(true),
});

// -------------------------
// Tổng Schema Form
// -------------------------
export const loadFormSchema = z.object({
  route: routeSchema,
  shipment: shipmentSchema,
  customer: customerSchema,
  carrier: carrierSchema,
});

// -------------------------
// Type cho toàn bộ form
// -------------------------
export type LoadFormValues = z.infer<typeof loadFormSchema>;
