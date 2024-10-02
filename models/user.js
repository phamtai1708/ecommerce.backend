import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  avatar: { type: String, default: "" },
  userId: String,
  password: String,
  infomation: {
    gender: {
      type: String,
      default: "",
    },
    weight: {
      type: String,
      default: "",
    },
    height: {
      type: String,
      default: "",
    },
  },
  role: {
    type: String,
    default: "member",
  },
  address: {
    type: String,
    default: "",
  },
  wishlist: { type: Array, default: "" },
  cart: { type: Array, default: "" },
  favorite: { type: Array, default: "" },
});
const UserModel = mongoose.model("users", userSchema);
export default UserModel;
