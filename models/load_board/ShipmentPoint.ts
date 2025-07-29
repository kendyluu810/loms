import mongoose, { Schema, Document } from "mongoose";

export interface IShipmentPoint extends Document {
  type: "pickup" | "stop" | "delivery";
  code: string;
  locationName?: string;
  eta?: string;
  status?: string; // e.g., 'pending', 'in transit', 'delivered'
  timezone?: string;
  remarks?: string;
}

export const ShipmentPointSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["pickup", "stop", "delivery"],
      required: true,
    },
    code: { type: String },
    locationName: { type: String },
    eta: { type: String },
    status: { type: String },
    timezone: { type: String },
    remarks: { type: String },
  },
  { _id: false }
);

export default mongoose.models.ShipmentPoint ||
  mongoose.model<IShipmentPoint>("ShipmentPoint", ShipmentPointSchema);
