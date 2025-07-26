import mongoose, { Document } from "mongoose";

export interface IShipment extends Document {
  itemCategory: string;
  weight: number;
  length: number;
  rate: number;
  rateUnit: "USD" | "VND" | "Other"; // Enum for rate unit
  equipmentType: string;
  truckLoad: string;
  dangerousGood?: boolean; // Optional field, default is false
  dangerType?: string; // Optional field
}

const ShipmentSchema = new mongoose.Schema(
  {
    itemCategory: String,
    weight: Number,
    length: Number,
    rate: Number,
    rateUnit: {
      type: String,
      enum: ["USD", "VND", "Other"],
      default: "USD",
    },
    equipmentType: String,
    truckLoad: String,
    dangerousGood: { type: Boolean, default: false },
    dangerType: String,
  },
  { timestamps: true }
);

export default mongoose.models.Shipment ||
  mongoose.model<IShipment>("Shipment", ShipmentSchema);
