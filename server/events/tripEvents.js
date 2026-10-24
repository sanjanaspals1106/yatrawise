import { EventEmitter } from "node:events";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { config } from "../config.js";

// Custom EventEmitter: the trips route emits, listeners react independently.
class TripEmitter extends EventEmitter {}
export const tripEvents = new TripEmitter();

export const metrics = { tripsCreated: 0, tripsDeleted: 0, tripsExported: 0 };

async function logEvent(name, payload) {
  try {
    await mkdir(config.logDir, { recursive: true });
    const line = JSON.stringify({ at: new Date().toISOString(), event: name, ...payload }) + "\n";
    await appendFile(path.join(config.logDir, "trip-events.log"), line);
  } catch (err) {
    console.error("Failed to write event log:", err.message);
  }
}

tripEvents.on("tripCreated", (trip) => {
  metrics.tripsCreated++;
  logEvent("tripCreated", { id: String(trip._id), destination: trip.destination, duration: trip.duration });
});

tripEvents.on("tripDeleted", (trip) => {
  metrics.tripsDeleted++;
  logEvent("tripDeleted", { id: String(trip._id) });
});

tripEvents.on("tripExported", (info) => {
  metrics.tripsExported++;
  logEvent("tripExported", info);
});
