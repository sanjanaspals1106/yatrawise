import { Router } from "express";
import Destination from "../models/Destination.js";
import { requireAdmin } from "../middleware/index.js";

const router = Router();
const ALLOWED = ["id", "name", "image", "description", "bestTime", "category", "itinerary"];
const pick = (body) => Object.fromEntries(Object.entries(body ?? {}).filter(([k]) => ALLOWED.includes(k)));

router.get("/", async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = new RegExp(`^${String(req.query.category).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i");
    res.json(await Destination.find(filter, "-itinerary").sort({ name: 1 }).lean());
  } catch (err) { next(err); }
});

router.get("/:id", async (req, res, next) => {
  try {
    const dest = await Destination.findOne({ id: req.params.id.toLowerCase() }, "-itinerary").lean();
    if (!dest) return res.status(404).json({ error: "Destination not found" });
    res.json(dest);
  } catch (err) { next(err); }
});

router.post("/", requireAdmin, async (req, res, next) => {
  try {
    res.status(201).json(await Destination.create(pick(req.body)));
  } catch (err) { next(err); }
});

router.patch("/:id", requireAdmin, async (req, res, next) => {
  try {
    const body = pick(req.body);
    delete body.id;
    const dest = await Destination.findOneAndUpdate({ id: req.params.id.toLowerCase() }, body, {
      new: true, runValidators: true
    });
    if (!dest) return res.status(404).json({ error: "Destination not found" });
    res.json(dest);
  } catch (err) { next(err); }
});

router.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    const dest = await Destination.findOneAndDelete({ id: req.params.id.toLowerCase() });
    if (!dest) return res.status(404).json({ error: "Destination not found" });
    res.status(204).end();
  } catch (err) { next(err); }
});

export default router;
