import mongoose, { Document, Schema } from "mongoose";

export interface IPosition extends Document {
  name: string;
}

const PositionSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

export default mongoose.models.Position ||
  mongoose.model<IPosition>("Position", PositionSchema);
