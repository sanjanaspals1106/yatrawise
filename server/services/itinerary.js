import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { config } from "../config.js";

// Same rotation the frontend used: day N uses interests[N % interests.length].
export function buildItinerary(activitiesByInterest, duration, interests) {
  const plan = [];
  for (let i = 0; i < duration; i++) {
    const theme = interests[i % interests.length];
    plan.push({ day: i + 1, theme, activities: activitiesByInterest[theme] ?? [] });
  }
  return plan;
}

export function renderItineraryText(trip, destinationName) {
  const lines = [
    `YatraWise Itinerary — ${destinationName}`,
    `Duration: ${trip.duration} day(s) | Interests: ${trip.interests.join(", ")}`,
    ""
  ];
  for (const d of trip.itinerary) {
    lines.push(`Day ${d.day} (${d.theme})`);
    d.activities.forEach((a) => lines.push(`  - ${a}`));
    lines.push("");
  }
  return lines.join("\n");
}

// Asynchronous fs/promises export; returns the written file path and contents.
export async function exportItinerary(trip, destinationName, dir = config.exportDir) {
  await mkdir(dir, { recursive: true });
  const file = path.join(dir, `itinerary-${trip._id}.txt`);
  await writeFile(file, renderItineraryText(trip, destinationName), "utf8");
  const content = await readFile(file, "utf8");
  return { file, content };
}
