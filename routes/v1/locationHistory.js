import express from "express";
import * as locationHistoryController from "../../controllers/locationHistory.js";
import { verifyQueryParams } from "../../middlewares/filters.js";
const router = express.Router();

router.get(
	"/",
	verifyQueryParams,
	locationHistoryController.getLocationHistory
);

export default router;
