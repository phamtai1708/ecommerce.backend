import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SecretKey } from "../middlewares/token.js";

import dotenv from "dotenv";
dotenv.config();
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config(JSON.parse(process.env.CLOUDINARY_CONFIG));
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const userController = {
  allUser: async (req, res) => {
    try {
      const allUsers = await UserModel.find();

      res.status(200).send({
        message: "Thanh Cong",
        data: allUsers,
      });
    } catch (error) {
      res.send({
        message: error.message,
        data: null,
      });
    }
  },
  createUser: async (req, res) => {
    try {
      const { userName, email, password } = req.body;
      const findUser = await UserModel.findOne({ email: email });
      if (findUser) throw new Error("Email da duoc su dung");
      const hashedPassword = bcrypt.hashSync(password, 10);
      const createdUser = await UserModel.create({
        firstName: userName.split(" ")[0],
        lastName: userName.split(" ")[1],
        email,
        userId: crypto.randomUUID(),
        password: hashedPassword,
      });

      res.status(200).send({
        message: "Thanh Cong",
        data: createdUser,
      });
    } catch (error) {
      res.send({
        message: error.message,
        data: null,
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const currentUser = await UserModel.findOne({
        email,
      });
      if (!currentUser) throw new Error("Email or password is invalid!");
      const comparedPassword = bcrypt.compareSync(
        password,
        currentUser.password
      );
      if (!comparedPassword) throw new Error("Email or password is invalid!");
      const user = {
        userId: currentUser.userId,
        email: currentUser.email,
      };
      const accessToken = jwt.sign(user, SecretKey, {
        expiresIn: 60 * 5,
      });
      res.status(200).send({
        message: "Thanh Cong",
        data: currentUser,
        SecretKey: accessToken,
      });
    } catch (error) {
      res.send({
        message: error.message,
        data: null,
      });
    }
  },
  updateUserName: async (req, res) => {
    try {
      const { userName } = req.params;
      if (!userName.includes("=")) {
        throw new Error("Invalid format for userName");
      }
      const { userId } = req.body;
      const newName = userName.split("=")[1];
      if (!userName.split("=")[0].includes("userName")) {
        throw new Error("Invalid format for userName");
      }
      const crrUser = await UserModel.findOneAndUpdate(
        { userId },
        { firstName: newName },
        { new: true }
      );
      if (!crrUser) {
        return res.status(404).send({
          message: "User not found!",
          data: null,
        });
      }
      res.status(200).send({
        message: "Thanh Cong",
        data: crrUser,
      });
    } catch (error) {
      res.send({
        message: error.message,
        data: null,
      });
    }
  },
  updateAvatar: async (req, res) => {
    try {
      const { userId } = req.params;
      if (!userId.includes("=")) {
        throw new Error("Invalid format for userId");
      }
      const updateId = userId.split("=")[1];
      if (!userId.split("=")[0].includes("userId")) {
        throw new Error("Invalid format for userId");
      }
      const avatar = req.file;
      if (!avatar) throw new Error("Please update your avatar");
      const crrUser = await UserModel.findOne({ userId: updateId });
      if (!crrUser) {
        res.status(404).send({
          message: "User not found",
          data: null,
        });
      } else {
        if (avatar) {
          const dataUrl = `data:${
            avatar.mimetype
          };base64,${avatar.buffer.toString("base64")}`;
          const result = await cloudinary.uploader.upload(dataUrl, {
            resource_type: "auto",
          });
          if (!result || !result.url) {
            return res.status(500).send({
              message: "Failed to upload avatar",
              data: null,
            });
          }
          if (result && result.url) {
            crrUser.avatar = result.url;
          }
        }
        await crrUser.save();
        res.status(201).send({
          message: "Updated",
          data: crrUser,
        });
      }
    } catch (error) {
      res.status(500).send({
        message: error.message,
        data: null,
      });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { userId } = req.params;
      if (!userId.includes("=")) {
        throw new Error("Invalid format for userId");
      }
      const deleteId = userId.split("=")[1];
      if (!userId.split("=")[0].includes("userId")) {
        throw new Error("Invalid format for userId");
      }
      const deleteUser = await UserModel.findOne({ userId: deleteId });

      if (!deleteUser) {
        return res.status(404).send({
          message: "User not found!",
          data: null,
        });
      }
      await UserModel.findOneAndDelete({ userId: deleteId });
      res.status(200).send({
        message: "Thanh Cong",
        data: deleteUser,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        data: null,
      });
    }
  },
};

export default userController;
