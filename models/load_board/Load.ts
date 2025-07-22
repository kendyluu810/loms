import mongoose, { Document, Schema } from "mongoose";

export interface ILoad extends Document {
  loadNumber: string;
  customer: mongoose.Types.ObjectId;
  route: mongoose.Types.ObjectId;
  shipment: mongoose.Types.ObjectId;
  createdAt: Date;
  miles?: string;
  stop?: string;
  status?: "Available" | "Assigned" | "In Transit" | "Delivered";
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
    createdAt: { type: Date, default: Date.now },

    miles: { type: String },
    stop: { type: String, default: "One Stop" },
    status: {
      type: String,
      enum: ["Available", "Assigned", "In Transit", "Delivered"],
      default: "Available",
    },
  },
  { timestamps: true }
);
export default mongoose.models.Load || mongoose.model("Load", LoadBoardSchema);
