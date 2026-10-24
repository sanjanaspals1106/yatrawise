import { Router } from "express";
import Message from "../models/Message.js";
import { requireAdmin } from "../middleware/index.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body ?? {};
    const saved = await Message.create({ name, email, subject, message });
    res.status(201).json({ id: saved._id, message: "Thank you! Your message has been submitted successfully." });
  } catch (err) { next(err); }
});

router.get("/", requireAdmin, async (req, res, next) => {
  try {
    res.json(await Message.find().sort({ createdAt: -1 }).lean());
  } catch (err) { next(err); }
});

export default router;
