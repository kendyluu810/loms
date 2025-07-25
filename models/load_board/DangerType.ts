import mongoose, { Document, Schema } from "mongoose";

export interface IDangerType extends Document {
  name: string;
}

const DangerTypeSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

export default mongoose.models.DangerType ||
  mongoose.model<IDangerType>("DangerType", DangerTypeSchema);
