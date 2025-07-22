import mongoose, { Document, Schema } from "mongoose";

export interface ICustomer extends Document {
  Cid: string;
  name: string;
  email: string;
  phone: string;
  contactName: string; // Contact Person Name
  contactEmail: string; // Contact Person Email
  contactPhone: string; // Contact Person Phone
  deliveryMethod: string;
}

const CustomerSchema: Schema = new Schema(
  {
    Cid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    contactName: { type: String, required: true }, // Contact Person Name
    contactEmail: { type: String, required: true }, // Contact Person Email
    contactPhone: { type: String, required: true }, // Contact Person Phone
    deliveryMethod: {
      type: String,
      enum: ["Air", "Sea", "Land"],
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.models.Customer ||
  mongoose.model<ICustomer>("Customer", CustomerSchema);
