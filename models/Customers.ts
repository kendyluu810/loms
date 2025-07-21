import mongoose, { Document, Schema } from "mongoose";

export interface ICustomer extends Document {
  Cid: string;
  name: string;
  email: string;
  phone: string;
  deliveryMethod: string;
}

const CustomerSchema: Schema = new Schema(
  {
    Cid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
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
