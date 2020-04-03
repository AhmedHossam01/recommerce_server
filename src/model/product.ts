import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 1 },
  description: { type: String, required: true },
  rating: { type: Number, default: 5 },
  image: {
    type: String,
    required: true
  }
});

export default model("Product", productSchema, "products");
