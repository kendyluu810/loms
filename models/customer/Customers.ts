import mongoose, { Document, Schema } from "mongoose";

function generateCusID() {
  const now = new Date();
  return `CUS${now.getFullYear()}${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}${Math.floor(
    Math.random() * 10000
  )
    .toString()
    .padStart(4, "0")}`;
}

export interface ICustomer extends Document {
  cusID: string;
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  contactPerson?: string;
  contactPhone?: string;
  contactEmail?: string;
}

const CustomerSchema: Schema = new Schema(
  {
    cusID: {
      type: String,
      unique: true,
      default: generateCusID,
    },
    companyName: { type: String, required: true },
    customerType: {
      type: String,
    },
    companyEmail: { type: String, required: true },
    companyPhone: { type: String, required: true },

    contactPerson: { type: String },
    contactPhone: { type: String },
    contactEmail: { type: String },
  },
  { timestamps: true }
);
export default mongoose.models.Customer ||
  mongoose.model<ICustomer>("Customer", CustomerSchema);
