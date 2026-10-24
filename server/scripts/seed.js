import mongoose from "mongoose";
import { config } from "../config.js";
import Destination from "../models/Destination.js";
import destinations from "../../src/data/destinations.js";
import itineraryData from "../../src/data/itineraryData.js";

// Idempotent: upserts by slug id, so re-running never duplicates.
export async function seed() {
  const ops = destinations.map((d) => ({
    updateOne: {
      filter: { id: d.id },
      update: { $set: { ...d, itinerary: itineraryData[d.id] ?? {} } },
      upsert: true
    }
  }));
  return Destination.bulkWrite(ops);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await mongoose.connect(config.mongoUri);
  const r = await seed();
  console.log(`Seeded destinations: ${r.upsertedCount} inserted, ${r.modifiedCount} updated, ${r.matchedCount} matched`);
  await mongoose.disconnect();
}
