import OrderModel from "../models/order.js";
import ProductModel from "../models/product.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const OrderController = {
  allOrder: async (req, res) => {
    try {
      const allOrder = await OrderModel.find();

      res.status(200).send({
        message: "Thanh Cong",
        data: allOrder,
      });
    } catch (error) {
      res.send({
        message: error.message,
        data: null,
      });
    }
  },
  createOrder: async (req, res) => {
    try {
      const { userId, listOrder } = req.body;

      // Kiểm tra dữ liệu đầu vào
      if (!userId) throw new Error("Vui lòng nhập userId");

      if (!listOrder) throw new Error("Vui lòng nhập danh sách sản phẩm.");

      if (!Array.isArray(listOrder) || listOrder.length === 0)
        throw new Error("Dữ liệu đơn hàng không hợp lệ.");

      // Kiểm tra các sản phẩm
      for (const item of listOrder) {
        if (!item.productId || !item.volume) {
          throw new Error(" Thông tin sản phẩm không hợp lệ.");
        }
        // Kiểm tra xem sản phẩm có tồn tại trong hệ thống hay không
        const orderr = await ProductModel.findOne({
          productId: item.productId,
        });
        if (!orderr) {
          throw new Error(`Sản phẩm với ID ${item.productId} không tồn tại.`);
        }
      }

      // Tạo đơn hàng mới
      const newOrder = await OrderModel.create({
        userId: userId,
        listOrder: listOrder.map((item) => ({
          productId: item.productId,
          volume: item.volume,
        })),
        orderId: crypto.randomUUID(),
        orderDate: new Date(),
      });

      res.status(200).send({
        message: "Thanh Cong",
        data: newOrder,
      });
    } catch (error) {
      res.send({
        message: error.message,
        data: null,
      });
    }
  },
  updateOrder: async (req, res) => {
    try {
      const { orderId, status } = req.body;
      if (!orderId) throw new Error("Chưa nhập ID order cần update");
      let crrOrder = await OrderModel.findOne({ orderId });
      if (!crrOrder) throw new Error("orderId not found");
      if (!status) throw new Error("chưa cập nhật status mới cho order");

      crrOrder = await OrderModel.findOneAndUpdate(
        { orderId },
        { status: status },
        { new: true }
      );
      res.status(200).send({
        message: "Thanh Cong",
        data: crrOrder,
      });
    } catch (error) {
      res.send({
        message: error.message,
        data: null,
      });
    }
  },
  cancelOrder: async (req, res) => {
    try {
      const { orderId } = req.body;
      if (!orderId) throw new Error("Chưa nhập ID order cần huỷ");

      const crrOrder = await OrderModel.findOneAndUpdate(
        { orderId },
        { status: "cancel" },
        { new: true }
      );
      if (!crrOrder) throw new Error("orderId not found");
      res.status(200).send({
        message: "Thanh Cong",
        data: crrOrder,
      });
    } catch (error) {
      res.send({
        message: error.message,
        data: null,
      });
    }
  },
};

export default OrderController;
