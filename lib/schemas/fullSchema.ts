import { z } from "zod";

const timeRangeSchema = z.object({
  from: z.string(),
  to: z.string(),
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
  receiveSchedule: timeRangeSchema.optional(),
  deliveryDate: z.coerce.date(),
  deliveryTime: z.string().optional(),

  additionalStop: z.string().optional(),
  warehouseNumber: z.string().optional(),
  warehouseSchedule: timeRangeSchema.optional(),

  date: z.coerce.date().optional(),
  time: z.string().optional(),
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
// Tổng Schema Form
// -------------------------
export const loadFormSchema = z.object({
  route: routeSchema,
  shipment: shipmentSchema,
  customer: customerSchema,
});

// -------------------------
// Type cho toàn bộ form
// -------------------------
export type LoadFormValues = z.infer<typeof loadFormSchema>;
