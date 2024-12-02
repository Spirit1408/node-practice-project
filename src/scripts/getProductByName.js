import fs from "node:fs/promises";
import { PATH_DB } from "../constants/path.js";

export const getProductsByName = async (name) => {
	const existingData = await fs.readFile(PATH_DB, "utf-8");

	const convertedData = existingData ? JSON.parse(existingData) : [];

	const foundedData = convertedData.filter((product) =>
		product.name.toLowerCase().includes(name.toLowerCase()),
	);

	foundedData.length > 0
		? foundedData.length === 1
			? console.log(foundedData[0])
			: console.log(foundedData)
		: console.log("Product not found");
};

getProductsByName("table");
