import { Router } from "express";
import OrderController from "../controllers/order.js";
import orderMiddleware from "../middlewares/order.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config(JSON.parse(process.env.CLOUDINARY_CONFIG));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const OrderRouter = Router();
OrderRouter.get("", OrderController.allOrder);
OrderRouter.post("/create", OrderController.createOrder);
OrderRouter.put("/update", OrderController.updateOrder);
OrderRouter.put("/cancel", OrderController.cancelOrder);
export default OrderRouter;
