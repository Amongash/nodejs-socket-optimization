import express from "express";
import * as limiterController from "../../controllers/limiters.js";

// define a new router
const router = express.Router();

// define a new route to get a limiter by id
router.get("/:id", limiterController.getLimiterById);

export default router;
