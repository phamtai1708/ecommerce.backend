import ProductModel from "../models/Product.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const ProductController = {
  allProduct: async (req, res) => {
    try {
      const allProduct = await ProductModel.find();

      res.status(200).send({
        message: "Thanh Cong",
        data: allProduct,
      });
    } catch (error) {
      res.send({
        message: error.message,
        data: null,
      });
    }
  },
  createProduct: async (req, res) => {
    try {
      const {
        productName,
        description,
        import_price,
        max_price,
        min_price,
        residual,
        colors,
        sizes,
      } = req.body;
      const files = req.files;
      if (!files || files.length === 0) {
        throw new Error("no image upload");
      }
      const dataUrl = [];
      for (let file of files) {
        const urlString = `data:${file.mimetype};base64,${file.buffer.toString(
          "base64"
        )}`;
        const result = await cloudinary.uploader.upload(urlString, {
          resource_type: "auto",
        });
        if (!result || !result.url) {
          return res.status(500).send({
            message: "Failed to upload image",
            data: null,
          });
        }
        if (result && result.url) {
          dataUrl.push(result.url);
        }
      }
      const newProduct = await ProductModel.create({
        productName: productName,
        description: description,
        images: dataUrl,
        productId: crypto.randomUUID(),
        import_price: import_price,
        max_price: max_price,
        min_price: min_price,
        sold: Math.floor(Math.random() * 99) + 1,
        residual: residual,
        star: 5,
        colors: colors,
        sizes: sizes,
      });
      res.status(200).send({
        message: "Thanh Cong",
        data: newProduct,
      });
    } catch (error) {
      res.send({
        message: error.message,
        data: null,
      });
    }
  },
  updateProduct: async (req, res) => {
    try {
      // Kiểm tra xem có dữ liệu nhập vào từ params không
      const { value } = req.params;

      if (!value) throw new Error("chưa nhập dữ liệu cần update");
      if (!value.includes("=")) {
        throw new Error("Invalid format for value to update");
      }
      // Kiểm tra id sản phầm cần update
      const { productId } = req.body;

      if (!productId) throw new Error("Chưa nhập id sản phẩm cần update");
      let productUD = await ProductModel.findOne({ productId: productId });
      if (!productUD) throw new Error("Product not found");

      const listValue = value.split("&&");
      console.log(listValue);

      for (const item of listValue) {
        const [key, newValue] = item.split("=");
        console.log(key);
        const updateObj = { [key]: newValue };
        await ProductModel.findOneAndUpdate(
          { productId: productId },
          updateObj,
          { new: true }
        );
      }
      productUD = await ProductModel.findOne({ productId: productId });
      res.status(200).send({
        message: "Cập nhật thành công",
        data: productUD,
      });
    } catch (error) {
      res.send({
        message: error.message,
        data: null,
      });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { productId } = req.body;
      if (!productId) throw new Error("Chưa nhập id sản phẩm cần update");
      const productDelete = await ProductModel.findOneAndDelete({
        productId: productId,
      });
      if (!productDelete) throw new Error("Product not found");

      res.status(200).send({
        message: "Cập nhật thành công",
        data: productDelete,
      });
    } catch (error) {
      res.send({
        message: error.message,
        data: null,
      });
    }
  },
};

export default ProductController;
