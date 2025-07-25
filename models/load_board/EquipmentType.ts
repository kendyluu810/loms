import mongoose, { Document, Schema } from "mongoose";

export interface IEquipmentType extends Document {
  name: string;
}

const EquipmentTypeSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

export default mongoose.models.EquipmentType ||
  mongoose.model<IEquipmentType>("EquipmentType", EquipmentTypeSchema);
