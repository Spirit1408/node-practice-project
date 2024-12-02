import fs from "node:fs/promises";
import { PATH_DB } from "../constants/path.js";

export const removeDescProterty = async () => {
	const existingData = await fs.readFile(PATH_DB, "utf-8");

	const convertedData = existingData ? JSON.parse(existingData) : [];

	const updatedData = convertedData.map(({ description, ...rest }) => rest);

	return await fs.writeFile(PATH_DB, JSON.stringify(updatedData, null, 2));
};

removeDescProterty();
