export const ctrlWrapper = (controller) => async (req, res, next) => {
	try {
		await controller(req, res, next);
	} catch (e) {
		next(e);
	}
};
