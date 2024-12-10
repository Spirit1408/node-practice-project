import { Router } from "express";
import authRouter from "./auth.js";
import productsRouter from "./products.js";
import { ctrlWrapper } from "./../utils/ctrlWrapper.js";
import { getServerStatus } from "../controllers/products.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/products", productsRouter);

router.get("/", ctrlWrapper(getServerStatus));

export default router;
