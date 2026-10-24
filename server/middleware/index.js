import { timingSafeEqual } from "node:crypto";
import mongoose from "mongoose";
import { config } from "../config.js";

export function requestLogger(req, res, next) {
  const start = process.hrtime.bigint();
  res.on("finish", () => {
    const ms = Number(process.hrtime.bigint() - start) / 1e6;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${ms.toFixed(1)}ms`);
  });
  next();
}

export function validateObjectId(req, res, next) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  next();
}

// Guards write/admin endpoints. With ADMIN_API_KEY set, requests need a matching
// x-api-key header; without it they are open only outside production.
export function requireAdmin(req, res, next) {
  if (!config.adminApiKey) {
    if (config.isProduction) return res.status(403).json({ error: "Admin access is not configured" });
    return next();
  }
  const given = Buffer.from(String(req.get("x-api-key") ?? ""));
  const expected = Buffer.from(config.adminApiKey);
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    return res.status(401).json({ error: "Invalid or missing API key" });
  }
  next();
}

export function notFound(req, res) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err.name === "ValidationError") {
    const details = Object.fromEntries(Object.entries(err.errors).map(([k, v]) => [k, v.message]));
    return res.status(400).json({ error: "Validation failed", details });
  }
  if (err.name === "CastError") {
    return res.status(400).json({ error: `Invalid value for ${err.path}` });
  }
  if (err.code === 11000) {
    return res.status(409).json({ error: "Duplicate value", details: err.keyValue });
  }
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Malformed JSON body" });
  }
  console.error(err);
  res.status(err.status || 500).json({ error: err.status ? err.message : "Internal server error" });
}
