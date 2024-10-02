import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  orderId: String,
  userId: String,
  listOrder: [
    {
      productId: {
        type: String,
        required: true,
      },
      volume: {
        type: Number,
        required: true,
      },
    },
  ],
  orderDate: Date,
  status: { type: String, default: "newOrder" },
});
const OrderModel = mongoose.model("orders", orderSchema);
export default OrderModel;
