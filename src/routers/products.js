import { Router } from "express";

import {
	createProductController,
	deleteProductController,
	getAllProductsController,
	getProductByIdController,
	getServerStatus,
	updateProductController,
} from "../controllers/products.js";

import { ctrlWrapper } from "./../utils/ctrlWrapper.js";

const router = Router();

router.get("/", ctrlWrapper(getServerStatus));

router.get("/products", ctrlWrapper(getAllProductsController));

router.get("/products/:productId", ctrlWrapper(getProductByIdController));

router.delete("/products/:productId", ctrlWrapper(deleteProductController));

router.post("/products", ctrlWrapper(createProductController));

router.patch("/products/:productId", ctrlWrapper(updateProductController));

export default router;
