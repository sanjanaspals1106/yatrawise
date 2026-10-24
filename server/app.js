import express from "express";
import cors from "cors";
import { config } from "./config.js";
import { requestLogger, notFound, errorHandler } from "./middleware/index.js";
import destinationRoutes from "./routes/destinations.js";
import tripRoutes from "./routes/trips.js";
import contactRoutes from "./routes/contact.js";

export function createApp() {
  const app = express();
  app.use(cors({ origin: config.corsOrigin }));
  app.use(express.json({ limit: "100kb" }));
  app.use(requestLogger);

  app.get("/api/health", (req, res) => res.json({ status: "ok" }));
  app.use("/api/destinations", destinationRoutes);
  app.use("/api/trips", tripRoutes);
  app.use("/api/contact", contactRoutes);

  app.use(notFound);
  app.use(errorHandler);
  return app;
}
