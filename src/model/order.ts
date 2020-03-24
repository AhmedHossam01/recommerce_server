import { model, Schema } from "mongoose";

const orderSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  orderedStock: { type: Number, default: 1 }
});

export default model("Order", orderSchema, "orders");
