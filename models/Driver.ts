import mongoose, { Document, Schema } from "mongoose";

export interface IDriver extends Document {
  employee: mongoose.Types.ObjectId;
  driverlicense: string;
  licensetype: string;
  licenseexpiry: Date;
  vehicleid: string;
  vehicleType: string;
  vehicleNumber: string;
}

const DriverSchema: Schema = new Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    driverlicense: { type: String, required: true },
    licensetype: { type: String, required: true },
    licenseexpiry: { type: Date, required: true },
    vehicleid: { type: String, required: true },
    vehicleType: { type: String, required: true },
    vehicleNumber: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Driver ||
  mongoose.model<IDriver>("Driver", DriverSchema);
