import express from "express";
import vehicleRouter from "./v1/vehicles.js";
import locationHistoryRouter from "./v1/locationHistory.js";
import violationRouter from "./v1/violations.js";
import limiterRouter from "./v1/limiters.js";

const router = express.Router();

router.get("/", (req, res) => {
	res.send("API is working properly");
});
router.use("/vehicles", vehicleRouter);
router.use("/locHistory", locationHistoryRouter);
router.use("/violations", violationRouter);
router.use("/limiters", limiterRouter);

export default router;
