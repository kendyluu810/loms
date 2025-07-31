import mongoose, { Document, Schema } from "mongoose";

export interface ICarrierAssignment extends Document {
  load: mongoose.Types.ObjectId; // Reference to Load ID
  vehicle: mongoose.Types.ObjectId; // Reference to Vehicle ID
  driver: mongoose.Types.ObjectId; // Reference to Driver ID
  assignedBy: mongoose.Types.ObjectId; // Reference to User ID who assigned the carrier
  assignedAt: Date; // Timestamp of when the assignment was made
}

const CarrierAssignmentSchema = new Schema(
  {
    load: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Load",
      required: true,
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      required: true,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    assignedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.CarrierAssignment ||
  mongoose.model<ICarrierAssignment>(
    "CarrierAssignment",
    CarrierAssignmentSchema
  );
