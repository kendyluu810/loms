import mongoose, { Document, Schema } from "mongoose";

export interface IVehicle extends Document {
  truckNumber: string;
  trailerNumber: string;
  category: string;
  status: "available" | "in-transit" | "maintenance" | "reserved";
  isEmpty: boolean;
  assignedDriver?: mongoose.Types.ObjectId; // Reference to Driver ID
}
const VehicleSchema = new Schema(
  {
    truckNumber: { type: String, required: true },
    trailerNumber: { type: String, required: true },
    category: { type: String, required: true },
    status: {
      type: String,
      enum: ["available", "in-transit", "maintenance", "reserved"],
      default: "available",
    },
    isEmpty: { type: Boolean, default: true },
    assignedDriver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Vehicle ||
  mongoose.model<IVehicle>("Vehicle", VehicleSchema);
