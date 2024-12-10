import { Router } from "express";

import {
	createProductController,
	deleteProductController,
	getAllProductsController,
	getProductByIdController,
	updateProductController,
} from "../controllers/products.js";

import { authenticate } from "./../middlewares/authenticate.js";
import { validateBody } from "./../utils/validateBody.js";
import {
	createProductSchema,
	updateProductSchema,
} from "../validation/products.js";
import { ctrlWrapper } from "./../utils/ctrlWrapper.js";
import { isValidId } from "./../middlewares/isValidId.js";

const router = Router();

router.use(authenticate);

router.get("/", ctrlWrapper(getAllProductsController));

router.get("/:productId", isValidId, ctrlWrapper(getProductByIdController));

router.delete("/:productId", isValidId, ctrlWrapper(deleteProductController));

router.post(
	"/",
	validateBody(createProductSchema),
	ctrlWrapper(createProductController),
);

router.patch(
	"/:productId",
	isValidId,
	validateBody(updateProductSchema),
	ctrlWrapper(updateProductController),
);

export default router;
