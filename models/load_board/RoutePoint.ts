import mongoose, { Schema, Document } from "mongoose";

export interface IRoutePoint extends Document {
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

export const RoutePointSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["pickup", "stop", "delivery"],
      required: true,
    },
    timezone: { type: String},
    localTime: { type: String},
    early: { type: String},
    late: { type: String},
    date: { type: String},
    locationName: { type: String},
    cityState: { type: String},
    address: { type: String},
    status: { type: String},
    eta: { type: String},
  },
  { _id: false }
);

export default mongoose.models.RoutePoint ||
  mongoose.model<IRoutePoint>("RoutePoint", RoutePointSchema);
