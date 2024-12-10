import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { env } from "./utils/env.js";

import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";

import mainRouter from "./routers/main.js";

const PORT = Number(env("PORT", 3000));

export const setupServer = () => {
	const app = express();

	app.use(express.json(), cors(), cookieParser());

	app.use(mainRouter);

	app.use("*", notFoundHandler);

	app.use(errorHandler);

	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
};
