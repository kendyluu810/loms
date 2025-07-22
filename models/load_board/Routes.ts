import mongoose, { Document } from "mongoose";

export interface IRoute extends Document {
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
}

const RouteSchema = new mongoose.Schema(
  {
    origin: { type: String, required: true },
    pickupNumber: { type: String, required: true },
    shipperSchedule: { type: Date, required: true },
    pickupTime: { type: Date, required: true },
    pickupDate: { type: Date, required: true },
    destination: { type: String, required: true },
    deliveryNumber: { type: String, required: true },
    receiverSchedule: { type: Date, required: true },
    deliveryTime: { type: Date, required: true },
    deliveryDate: { type: Date, required: true },
    additionalStop: { type: String, required: true },
    warehouseNumber: { type: String, required: true },
    warehouseSchedule: { type: Date, required: true },
    date: { type: Date, required: true },
    time: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Route ||
  mongoose.model<IRoute>("Route", RouteSchema);
