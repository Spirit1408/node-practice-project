import fs from "node:fs/promises";
import { PATH_DB } from "../constants/path.js";

export const getProductsByMinPrice = async (minPrice) => {
	const existingData = await fs.readFile(PATH_DB, "utf-8");

	const convertedData = existingData ? JSON.parse(existingData) : [];

	console.log(convertedData.filter((product) => product.price >= minPrice));
};

getProductsByMinPrice(400);
