import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    default: 18,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "cart",
    default: null,
  },
  isGitHub: {
    type: Boolean,
    default: false,
  },
  isGoogle: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["ADMIN", "PREMIUM", "USER"],
    default: "USER",
  },
});

usersSchema.pre("find", function () {
  this.populate("cart");
});

export const usersModel = mongoose.model("Users", usersSchema);
