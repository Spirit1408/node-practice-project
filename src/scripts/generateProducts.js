import { createFakeProduct } from "./../utils/createFakeProduct.js";
import fs from "node:fs/promises";
import { PATH_DB } from "../constants/path.js";

export const generateProducts = async (amount) => {
	const existingData = await fs.readFile(PATH_DB, "utf-8");

	const convertedData = existingData ? JSON.parse(existingData) : [];

	const newData = Array.from({ length: amount }, createFakeProduct);

	convertedData.push(...newData);

	return await fs.writeFile(PATH_DB, JSON.stringify(convertedData, null, 2));
};

generateProducts(10);