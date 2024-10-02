import { Router } from "express";
import UserRouter from "./user.js";
import ProductRouter from "./product.js";
import OrderRouter from "./order.js";

const RootRouterV1 = Router();

RootRouterV1.use("/users", UserRouter);
RootRouterV1.use("/products", ProductRouter);
RootRouterV1.use("/orders", OrderRouter);
export { RootRouterV1 };
