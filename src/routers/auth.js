import { Router } from "express";
import {
	loginController,
	logoutController,
	refreshSessionController,
	registerController,
} from "../controllers/auth.js";

import { validateBody } from "./../utils/validateBody.js";
import { ctrlWrapper } from "./../utils/ctrlWrapper.js";
import { loginSchema, registerSchema } from "../validation/auth.js";

const router = Router();

router.post(
	"/register",
	validateBody(registerSchema),
	ctrlWrapper(registerController),
);
router.post("/login", validateBody(loginSchema), ctrlWrapper(loginController));
router.post("/refresh", ctrlWrapper(refreshSessionController));
router.post("/logout", ctrlWrapper(logoutController));

export default router;
