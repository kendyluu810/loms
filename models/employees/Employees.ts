import mongoose, { Schema, Document } from "mongoose";

export interface IEmployee extends Document {
  Eid: string;
  name: string;
  phone: string;
  email: string;
  position: string;
}

const EmployeeSchema: Schema = new Schema(
  {
    Eid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    position: {
      type: String,
      required: true,
      enum: ["Manager", "Staff", "Driver", "Dispatcher", "Other"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Employee ||
  mongoose.model<IEmployee>("Employee", EmployeeSchema);
