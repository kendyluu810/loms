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
  status: "posted" | "in_transit" | "delivered" | "cancelled";
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
    status: {
      type: String,
      enum: ["posted", "in_transit", "delivered", "cancelled"],
      default: "posted",
    },
  },
  { timestamps: true }
);
export default mongoose.models.Load ||
  mongoose.model<ILoad>("Load", LoadBoardSchema);
