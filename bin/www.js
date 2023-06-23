/**
 * Module dependencies.
 */
import dotenv from "dotenv";
import http from "http";
import debugLib from "debug";
import app from "../app.js";
dotenv.config();

const debug = debugLib("your-project-name:server");

app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), () => {
	console.log(`Server running on port ${app.get("port")}`);
});
