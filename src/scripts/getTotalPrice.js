import fs from "node:fs/promises";
import { PATH_DB } from "../constants/path.js";

export const getTotalPrice = async () => {
	const existingData = await fs.readFile(PATH_DB, "utf-8");

	const convertedData = existingData ? JSON.parse(existingData) : [];

	const totalPrice = convertedData.reduce(
		(total, product) => total + Number(product.price),
		0,
	);

    console.log(totalPrice);
};

getTotalPrice();
