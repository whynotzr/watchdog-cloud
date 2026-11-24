import { Queue, Worker } from "bullmq";
import { Redis } from "ioredis";
import type { Server as SocketServer } from "socket.io";
import { env } from "../config/env.js";
import { pingEndpoint } from "../services/pinger.js";
import { dispatchIncidentAlert } from "../services/notifier.js";

const connection = new Redis(env.REDIS_URL, { maxRetriesPerRequest: null });

export const monitorQueue = new Queue("endpoint-monitors", { connection });

export function startMonitorWorker(io: SocketServer) {
  return new Worker(
    "endpoint-monitors",
    async (job) => {
      const { url } = job.data as { url: string };
      const result = await pingEndpoint(url);
      io.emit("monitor:update", result);

      if (!result.ok) {
        await dispatchIncidentAlert(result);
      }
      return result;
    },
    { connection, concurrency: 10 }
  );
}
