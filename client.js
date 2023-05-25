import { WebSocket } from "ws";
import * as dotenv from "dotenv";

dotenv.config();

const IP = process.env.IP || "127.0.0.1";
const PORT = process.env.PORT || "80";
const webSocketUrl = `ws://${IP}:${PORT}`;
const timeoutDelay = process.env.TIMEOUT_DELAY || 5000;

/**
 * Establishes a WebSocket connection to the specified URL with optional headers.
 */
const ws = new WebSocket(webSocketUrl, {
	headers: {
		token: process.env.TOKEN,
	},
});

/**
 * Sets the heartbeat mechanism for the WebSocket connection.
 *
 * @param {WebSocket} ws - The WebSocket connection object.
 * @param {number} delay - The delay in milliseconds before terminating the connection.
 */
const heartbeat = (ws, delay) => {
	clearTimeout(ws.pingTimeout);

	ws.pingTimeout = setTimeout(() => {
		ws.terminate();
	}, delay);
};

/**
 * Sends a ping to the WebSocket server.
 */
const ping = () => {
	console.log(`Send ping to server`);
	heartbeat(ws, timeoutDelay);
};

/**
 * Event listeners for the WebSocket connection.
 */
ws.on("ping", ping)
	.on("open", ping)
	.on("close", () => {
		clearTimeout(ws.pingTimeout);
	});
