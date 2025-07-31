import mongoose, { Document, Schema } from "mongoose";

export interface ICarrier extends Document {
  _id: string;
  name: string;
  mcNumber?: string;
  dotNumber?: string;
  email?: string;
  phone?: string;
  address?: string;
  customer?: mongoose.Types.ObjectId; // gán Carrier cho Customer
  equipmentTypes?: string[];
  // rating?: number;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const CarrierSchema = new Schema(
  {
    name: { type: String, required: true },
    mcNumber: { type: String, unique: true, sparse: true },
    dotNumber: { type: String, unique: true, sparse: true },
    email: { type: String, lowercase: true },
    phone: { type: String },
    address: { type: String },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    equipmentTypes: [{ type: String }],
    // rating: { type: Number, min: 0, max: 5 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Carrier ||
  mongoose.model<ICarrier>("Carrier", CarrierSchema);
