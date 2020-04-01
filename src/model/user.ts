import { model, Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  orderes: [{ type: Schema.Types.ObjectId, ref: "Order" }]
});

export default model("User", userSchema, "users");
