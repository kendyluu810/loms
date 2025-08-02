import mongoose, { Document, Schema } from "mongoose";
import { IRoute } from "./Routes";
import { IShipment } from "./Shipment";

function generateLoadID() {
  const now = new Date();
  return `LOAD${now.getFullYear()}${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}${Math.floor(
    Math.random() * 10000
  )
    .toString()
    .padStart(4, "0")}`;
}

export interface ILoad extends Document {
  load_id: string;
  route: mongoose.Types.ObjectId | IRoute;
  shipment: mongoose.Types.ObjectId | IShipment;
  customer: mongoose.Types.ObjectId;
  carrier?: mongoose.Types.ObjectId;
  status: "posted" | "in_transit" | "delivered" | "cancelled";
  invoice: mongoose.Types.ObjectId;
  driver: mongoose.Types.ObjectId;
  dispatcher: mongoose.Types.ObjectId;
  vehicle: mongoose.Types.ObjectId;
  pickupETA: String;
  pickupTime: String;
  createdAt?: Date;
  updatedAt?: Date;
}

const LoadBoardSchema: Schema = new Schema(
  {
    load_id: {
      type: String,
      unique: true,
      default: generateLoadID,
    },
    route: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Route",
      required: true,
    },
    shipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shipment",
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    carrier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Carrier",
    },
    status: {
      type: String,
      enum: ["posted", "in_transit", "delivered", "cancelled"],
      default: "posted",
    },
    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
    },
    dispatcher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dispatcher",
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
    },
    pickupETA: String,
    pickupTime: String,
  },
  { timestamps: true }
);
export default mongoose.models.Load ||
  mongoose.model<ILoad>("Load", LoadBoardSchema);
