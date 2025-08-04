import mongoose, { Document, Schema } from "mongoose";

export interface IDriver extends Document {
  employee: mongoose.Types.ObjectId;
  driverlicense: string;
  licensetype: string;
  licenseexpiry: Date;
}

const DriverSchema: Schema = new Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    driverlicense: { type: String, required: true },
    licensetype: { type: String, required: true },
    licenseexpiry: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Driver ||
  mongoose.model<IDriver>("Driver", DriverSchema);
