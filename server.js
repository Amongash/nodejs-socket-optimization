import * as dotenv from "dotenv";
import { WebSocket, WebSocketServer } from "ws";
import * as Jwt from "jsonwebtoken";
import * as vehicleService from "./services/vehicles.js";

dotenv.config();

const { PORT } = process.env;

/**
 * Sets the `isAlive` flag of a socket to `true`.
 *
 * @param {WebSocket} socket - The WebSocket socket.
 */
const heartbeat = (socket) => {
	socket.isAlive = true;
};

/**
 * Logs a ping request.
 *
 * @param {WebSocket} socket - The WebSocket socket.
 */
const ping = (socket) => {
	console.log(`Ping request`);
};

/**
 * Verifies the client connection request.
 * This function verifies the client connection request. It expects the request
 * information (info) and a callback function (cb) as parameters. The callback
 * function is called after verification, with the first argument indicating
 * whether the client is authorized (true or false). If authorization fails, the
 * callback is called with additional parameters indicating the status code
 * and error message.
 * @param {Object} info - Information about the connection request.
 * @param {Function} cb - Callback function to be called after verification.
 */
const verifyClient = (info, cb) => {
	const token = info.req.headers.token;

	if (!token) cb(false, 401, "Unauthorized");
	else {
		Jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
			if (err) {
				cb(false, 401, "Unauthorized");
			} else {
				info.req.user = decodedToken;
				cb(true);
			}
		});
	}
};

// Create a new WebSocket server instance
const websocketServer = new WebSocketServer({
	port: PORT,
	verifyClient,
});

/**
 * Event listener for a new WebSocket connection.
 *
 * @param {WebSocket} socket - The WebSocket socket for the new connection.
 */
websocketServer.on("connection", (socket) => {
	console.log(`Socket connection established on port: ${PORT}`);
	socket.isAlive = true;

	// Pong event listener
	socket.on("pong", () => {
		heartbeat(socket);
	});

	// Message event listener
	socket.on("message", async (message) => {
		try {
			console.log(`Incoming message stream: ${message}`);
			// Verify that message is not empty
			const vehicles = await vehicleService.getVehicles();
			if (socket.readyState == WebSocket.OPEN) {
				socket.send(JSON.stringify(vehicles));
			}
		} catch (error) {
			throw error;
		}
	});

	// Close event listener
	socket.on("close", () => {
		console.log(`Socket connection closed`);
	});

	// Error event listener
	socket.on("error", (err) => {
		console.log(`Socket error: ${err}`);
	});

	// Send initial message
	socket.send(JSON.stringify({ type: "session_id" }));
});

// Interval to check socket health and send pings
const isAliveInterval = setInterval(() => {
	websocketServer.clients.forEach((socket) => {
		if (socket.isAlive == false) {
			console.log(`Terminating socket connection`);
			return socket.terminate();
		}

		socket.isAlive = false;
		socket.ping(() => {
			ping(socket);
		});
	});
}, 3000);
