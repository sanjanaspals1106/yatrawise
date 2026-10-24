import { Router } from "express";
import Trip from "../models/Trip.js";
import Destination from "../models/Destination.js";
import { validateObjectId, requireAdmin } from "../middleware/index.js";
import { tripEvents, metrics } from "../events/tripEvents.js";
import { buildItinerary, exportItinerary } from "../services/itinerary.js";

const router = Router();

router.get("/stats/metrics", requireAdmin, (req, res) => res.json(metrics));

router.get("/", requireAdmin, async (req, res, next) => {
  try {
    res.json(await Trip.find().sort({ createdAt: -1 }).lean());
  } catch (err) { next(err); }
});

router.get("/:id", validateObjectId, async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id).lean();
    if (!trip) return res.status(404).json({ error: "Trip not found" });
    res.json(trip);
  } catch (err) { next(err); }
});

router.post("/", async (req, res, next) => {
  try {
    const { destination, duration, interests, travelerName, notes } = req.body ?? {};
    const trip = new Trip({ destination, duration, interests, travelerName, notes });
    await trip.validate();

    const dest = await Destination.findOne({ id: trip.destination }).lean();
    if (!dest) return res.status(400).json({ error: "Unknown destination", details: { destination: trip.destination } });

    trip.itinerary = buildItinerary(dest.itinerary ?? {}, trip.duration, trip.interests);
    await trip.save();
    tripEvents.emit("tripCreated", trip);
    res.status(201).json(trip);
  } catch (err) { next(err); }
});

router.patch("/:id", validateObjectId, async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ error: "Trip not found" });

    for (const key of ["duration", "interests", "travelerName", "notes"]) {
      if (req.body?.[key] !== undefined) trip[key] = req.body[key];
    }
    if (req.body?.duration !== undefined || req.body?.interests !== undefined) {
      const dest = await Destination.findOne({ id: trip.destination }).lean();
      await trip.validate();
      trip.itinerary = buildItinerary(dest?.itinerary ?? {}, trip.duration, trip.interests);
    }
    await trip.save();
    res.json(trip);
  } catch (err) { next(err); }
});

router.delete("/:id", validateObjectId, async (req, res, next) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    if (!trip) return res.status(404).json({ error: "Trip not found" });
    tripEvents.emit("tripDeleted", trip);
    res.status(204).end();
  } catch (err) { next(err); }
});

// Writes the itinerary to disk with fs/promises and returns it as a download.
router.get("/:id/export", validateObjectId, async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ error: "Trip not found" });
    const dest = await Destination.findOne({ id: trip.destination }, "name").lean();
    const { file, content } = await exportItinerary(trip, dest?.name ?? trip.destination);
    tripEvents.emit("tripExported", { id: String(trip._id), file });
    res.attachment(`yatrawise-${trip.destination}-itinerary.txt`).type("text/plain").send(content);
  } catch (err) { next(err); }
});

export default router;
