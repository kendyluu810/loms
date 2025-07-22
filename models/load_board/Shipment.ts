import mongoose, { Document } from "mongoose";

export interface IShipment extends Document {
  itemCategory: string;
  weight: number;
  length: number;
  rate: number;
  rateUnit: string;
  equipmentType: string;
  truckLoad: string;
  dangerousGoods: boolean;
  dangerType: string;
}

const ShipmentSchema = new mongoose.Schema(
  {
    itemCategory: { type: String, required: true },
    weight: { type: Number, required: true },
    length: { type: Number, required: true },
    rate: { type: Number, required: true },
    rateUnit: { type: String, required: true },
    equipmentType: { type: String, required: true },
    truckLoad: { type: String, required: true },
    dangerousGoods: { type: Boolean, default: false },
    dangerType: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Shipment = mongoose.model<IShipment>("Shipment", ShipmentSchema);