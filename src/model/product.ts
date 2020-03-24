import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 1 },
  description: { type: String },
  rating: { type: Number, default: 5 }
});

export default model("Product", productSchema, "products");
