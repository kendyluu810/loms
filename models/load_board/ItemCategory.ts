import mongoose, { Document, Schema } from "mongoose";

export interface IItemCategory extends Document {
  name: string;
}

const ItemCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
});

export default mongoose.models.ItemCategory ||
  mongoose.model<IItemCategory>("ItemCategory", ItemCategorySchema);
