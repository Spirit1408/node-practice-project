import createHttpError from "http-errors";

import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getProductById,
	updateProduct,
} from "../services/products.js";

export const getServerStatus = (req, res) => {
	res.json({ message: "Server is running smoothly" });
};

export const getAllProductsController = async (req, res) => {
	const products = await getAllProducts();

	res.json({
		status: 200,
		message: "Successfully found all products",
		data: products,
	});
};

export const getProductByIdController = async (req, res, next) => {
	const { productId } = req.params;
	const product = await getProductById(productId);

	if (!product) {
		next(createHttpError(404, "Product with this id not found"));
		return;
	}

	res.json({
		status: 200,
		message: `Successfully found product with id ${productId}`,
		data: product,
	});
};

export const deleteProductController = async (req, res, next) => {
	const { productId } = req.params;

	const deletedProduct = await deleteProduct(productId);

	if (!deletedProduct) {
		next(createHttpError(404, "Product not found"));
		return;
	}

	res.sendStatus(204);
};

export const createProductController = async (req, res) => {
	const newProduct = await createProduct(req.body);

	res.status(201).json({
		status: 201,
		message: "Product created successfully!",
		data: newProduct,
	});
};

export const updateProductController = async (req, res, next) => {
	const { productId } = req.params;
	const updatedProduct = await updateProduct(productId, req.body);

	if (!updateProduct) {
		next(createHttpError(404, "Product not found"));
		return;
	}

	res.json({
		status: 200,
		message: "Product updated successfully!",
		data: updatedProduct,
	});
};
