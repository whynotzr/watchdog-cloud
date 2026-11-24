import http from "node:http";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { env } from "./config/env.js";
import { monitorsRouter } from "./routes/monitors.js";
import { startMonitorWorker } from "./queues/monitorQueue.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/monitors", monitorsRouter);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

startMonitorWorker(io);

server.listen(env.PORT, () => {
  console.log(`📡 Watchdog Cloud running on http://localhost:${env.PORT}`);
});
