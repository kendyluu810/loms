import mongoose, { Document, Schema } from "mongoose";
import { IRoutePoint, RoutePointSchema } from "./RoutePoint";

const TimeRangeSchema = new Schema(
  {
    from: { type: String },
    to: { type: String },
  },
  { _id: false }
);

export interface IRoute extends Document {
  origin: string;
  pickupNumber?: string;
  pickupAddress: string;
  shipperSchedule?: { from: string; to: string };
  pickupDate?: Date;
  pickupTime?: string;

  destination: string;
  deliveryNumber?: string;
  deliveryAddress: string;
  receiverSchedule?: { from: string; to: string };
  deliveryDate?: Date;
  deliveryTime?: string;

  additionalStop?: string;
  warehouseNumber?: string;
  warehouseSchedule?: { from: string; to: string };

  date?: Date;
  time?: string;

  pickupPoint?: IRoutePoint;
  deliveryPoint?: IRoutePoint;
  stopPoints?: IRoutePoint[];
}

const RouteSchema = new Schema({
  origin: { type: String, required: true },
  pickupNumber: { type: String },
  pickupAddress: { type: String, required: true },
  shipperSchedule: { type: TimeRangeSchema },
  pickupDate: { type: Date },
  pickupTime: { type: String },

  destination: { type: String, required: true },
  deliveryNumber: { type: String },
  deliveryAddress: { type: String, required: true },
  receiverSchedule: { type: TimeRangeSchema },
  deliveryDate: { type: Date },
  deliveryTime: { type: String },

  additionalStop: { type: String },
  warehouseNumber: { type: String },
  warehouseSchedule: { type: TimeRangeSchema },

  date: { type: Date },
  time: { type: String },

  pickupPoint: RoutePointSchema,
  deliveryPoint: RoutePointSchema,
  stopPoints: [RoutePointSchema],
});
export default mongoose.models.Route ||
  mongoose.model<IRoute>("Route", RouteSchema);
