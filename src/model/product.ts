import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 1 },
  description: { type: String },
  rating: { type: Number, default: 5 },
  image: { type: String, default: "https://picsum.photos/500/400" }
});

export default model("Product", productSchema, "products");
