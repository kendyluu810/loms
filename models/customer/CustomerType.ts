import mongoose, { Document } from "mongoose";

export interface ICustomerType extends Document{
    name: string;
}

const CustomerTypeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
});

export default mongoose.models.CustomerType ||
  mongoose.model<ICustomerType>("CustomerType", CustomerTypeSchema);