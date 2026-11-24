import { Router } from "express";
import { z } from "zod";
import { monitorQueue } from "../queues/monitorQueue.js";

export const monitorsRouter = Router();

const createMonitorSchema = z.object({
  url: z.string().url(),
  intervalMs: z.number().int().min(10000).max(3600000).default(60000)
});

monitorsRouter.post("/", async (req, res) => {
  const parsed = createMonitorSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const { url, intervalMs } = parsed.data;
  await monitorQueue.add(
    `check:${url}`,
    { url },
    { repeat: { every: intervalMs }, removeOnComplete: 50, removeOnFail: 50 }
  );

  return res.status(201).json({ status: "scheduled", url, intervalMs });
});

monitorsRouter.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "watchdog-cloud" });
});
