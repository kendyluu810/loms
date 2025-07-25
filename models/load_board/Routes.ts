import mongoose, { Document } from "mongoose";

export interface IRoute extends Document {
  origin: string;
  pickupNumber: string;
  shipperSchedule: Date;
  addressPickup: string;
  addressDelivery: string;
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
  timeline?: {
    step: string;
    location: string;
    time: Date;
    status: "done" | "in-progress" | "pending";
  }[];
}

const RouteSchema = new mongoose.Schema(
  {
    origin: { type: String, required: true },
    pickupNumber: { type: String, required: true },
    shipperSchedule: { type: Date, required: true },
    addressPickup: { type: String, required: true },
    pickupTime: { type: Date, required: true },
    pickupDate: { type: Date, required: true },
    destination: { type: String, required: true },
    deliveryNumber: { type: String, required: true },
    receiverSchedule: { type: Date, required: true },
    addressDelivery: { type: String, required: true },
    deliveryTime: { type: Date, required: true },
    deliveryDate: { type: Date, required: true },
    additionalStop: { type: String },
    warehouseNumber: { type: String, required: true },
    warehouseSchedule: { type: Date, required: true },
    date: { type: Date, required: true },
    time: { type: Date, required: true },
    timeline: [
      {
        step: { type: String, required: true },
        location: { type: String, required: true },
        time: { type: Date, required: true },
        status: {
          type: String,
          enum: ["done", "in-progress", "pending"],
          default: "pending",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Route ||
  mongoose.model<IRoute>("Route", RouteSchema);
