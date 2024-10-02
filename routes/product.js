import { Router } from "express";
import productController from "../controllers/product.js";
import productMiddleware from "../middlewares/product.js";

import dotenv from "dotenv";
dotenv.config();
import { validateToken } from "../middlewares/token.js";

import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config(JSON.parse(process.env.CLOUDINARY_CONFIG));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const ProductRouter = Router();

ProductRouter.get("", productController.allProduct);
ProductRouter.post(
  "/create",
  upload.array("files"),
  productMiddleware.createProduct,
  productController.createProduct
);
ProductRouter.put("/update/:value", productController.updateProduct);
ProductRouter.delete("/delete", productController.deleteProduct);
export default ProductRouter;
