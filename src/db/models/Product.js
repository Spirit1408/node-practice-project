import e from "cors";
import { Schema, model } from "mongoose";

const productSchema = new Schema(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true },
		category: {
			type: String,
			required: true,
			enum: ["electronics", "clothing", "books", "other"],
			default: "other",
		},
		description: { type: String },
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

export const ProductsCollection = model("product", productSchema);
