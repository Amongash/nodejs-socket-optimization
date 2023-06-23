import axios from "axios";
import dotenv from "dotenv";
import redisClient from "../helpers/redis.js";
dotenv.config();

const SERVICE_URL = process.env.SERVICE_URL || "http://localhost:3000";

const getOperator = async (operatorId) => {
	return axios
		.get(`${SERVICE_URL}/operator/${operatorId}`, {
			headers: {
				Authorization: `Bearer ${process.env.SERVICE_TOKEN}`,
			},
		})
		.then((res) => res.data)
		.catch((err) => {
			throw new Error(
				err.response.data.message || "failed to get operator details",
				err.response.code || 404
			);
		});
};

const getVendor = async (vendorId) => {
	return axios
		.get(`${SERVICE_URL}/vendor/${vendorId}`, {
			headers: {
				Authorization: `Bearer ${process.env.SERVICE_TOKEN}`,
			},
		})
		.then((res) => res.data)
		.catch((err) => {
			throw new Error(
				err.response.data.message || "failed to get operator details",
				err.response.code || 404
			);
		});
};

const getLimiter = async (limiterId) => {
	// check if limiter info is in redis
	const limiterInfo = await redisClient.get(limiterId);
	if (limiterInfo) {
		return JSON.parse(limiterInfo);
	}
	return axios
		.get(`${SERVICE_URL}/limiters-tracking/${limiterId}`, {
			headers: {
				Authorization: `Bearer ${process.env.SERVICE_TOKEN}`,
			},
		})
		.then(async (res) => {
			await redisClient.set(
				`${res.data.device_id}`,
				`${JSON.stringify(res.data)}`,
				"EX",
				86400
			);
			return res.data;
		})
		.catch((err) => {
			console.log(
				err.response.data.message || "failed to get operator details",
				err.response.code || 404
			);

			return redisClient.set(
				`last_request_time_${deviceId}`,
				new Date().toString(),
				"EX",
				3600
			);
		});
};

export { getOperator, getVendor, getLimiter };
