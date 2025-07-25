import mongoose, { Document, Schema } from "mongoose";

export interface ITruckLoad extends Document {
  name: string;
}

const TruckLoadSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

export default mongoose.models.TruckLoad ||
  mongoose.model<ITruckLoad>("TruckLoad", TruckLoadSchema);
