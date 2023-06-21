import express from "express";
import vehicleRouter from "./v1/vehicles.js";
import LocationHistoryRouter from "./v1/locationHistory.js";

const router = express.Router();

router.get("/", (req, res) => {
	res.send("API is working properly");
});
router.use("/vehicles", vehicleRouter);
router.use("/locHistory", LocationHistoryRouter);


export default router;
