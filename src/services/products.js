import { ProductsCollection } from "./../db/models/Product.js";

export const getAllProducts = () => ProductsCollection.find();

export const getProductById = (id) => ProductsCollection.findById(id);

export const deleteProduct = (id) => ProductsCollection.findByIdAndDelete(id);

export const createProduct = async (product) => {
	const newProduct = await ProductsCollection.create({
		name: product.name,
		price: product.price,
		category: product.category,
		description: product.description,
	});

	return newProduct;
};

export const updateProduct = async (id, data) => {
	const updatedProduct = await ProductsCollection.findByIdAndUpdate(
		id,
		{
			$set: data,
		},
		{ new: true },
	);

	return updatedProduct;
};
