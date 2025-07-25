import mongoose, { Document, Schema } from "mongoose";
import "../customer/Customers"
import "./Routes";
import "./Shipment";
import "./Shipment";

export interface ILoad extends Document {
  loadNumber: string;
  customer: mongoose.Types.ObjectId;
  route: mongoose.Types.ObjectId;
  shipment: mongoose.Types.ObjectId;
  driver: mongoose.Types.ObjectId;
  createdAt: Date;
  miles?: string;
  stop?: string;
  status?: string;
}

const LoadBoardSchema: Schema = new Schema(
  {
    loadNumber: { type: String, required: true, unique: true },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    // Route
    route: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Route",
      required: true,
    },

    // shipment
    shipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shipment",
      required: true,
    },
    // driver
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      required: false, // nếu có thể null
    },
    createdAt: { type: Date, default: Date.now },

    miles: { type: String },
    stop: { type: String },
    status: {
      type: String,
      enum: ["Available", "Assigned", "In Transit", "Delivered"],
    },
  },
  { timestamps: true }
);
export default mongoose.models.Load ||
  mongoose.model<ILoad>("Load", LoadBoardSchema);
