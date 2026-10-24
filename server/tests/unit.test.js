import { test } from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import { mkdtemp, readFile } from "node:fs/promises";
import { buildItinerary, exportItinerary, renderItineraryText } from "../services/itinerary.js";
import { errorHandler, requireAdmin } from "../middleware/index.js";
import { config } from "../config.js";
import Trip from "../models/Trip.js";
import Message from "../models/Message.js";

test("buildItinerary rotates interests across days", () => {
  const plan = buildItinerary({ food: ["a"], nature: ["b"] }, 3, ["food", "nature"]);
  assert.deepEqual(plan.map((d) => d.theme), ["food", "nature", "food"]);
  assert.deepEqual(plan[1].activities, ["b"]);
});

test("exportItinerary writes file via fs/promises", async () => {
  const dir = await mkdtemp(path.join(os.tmpdir(), "yw-"));
  const trip = { _id: "abc", duration: 1, interests: ["food"], itinerary: [{ day: 1, theme: "food", activities: ["Biryani"] }] };
  const { file, content } = await exportItinerary(trip, "Hyderabad", dir);
  assert.equal(await readFile(file, "utf8"), content);
  assert.match(content, /Hyderabad/);
  assert.match(renderItineraryText(trip, "X"), /Biryani/);
});

test("Trip schema validates duration and interests", () => {
  const err = new Trip({ destination: "hampi", duration: 9, interests: [] }).validateSync();
  assert.ok(err.errors.duration);
  assert.ok(err.errors.interests);
  assert.equal(new Trip({ destination: "hampi", duration: 2, interests: ["food"] }).validateSync(), undefined);
});

test("Message schema validates email and length", () => {
  const err = new Message({ name: "A", email: "bad", subject: "s", message: "short" }).validateSync();
  assert.ok(err.errors.email);
  assert.ok(err.errors.message);
});

test("errorHandler maps validation errors to 400", () => {
  const err = new Message({}).validateSync();
  let status, body;
  const res = { status(s) { status = s; return this; }, json(b) { body = b; } };
  errorHandler(err, {}, res, () => {});
  assert.equal(status, 400);
  assert.ok(body.details.name);
});

function runAdmin(headers) {
  let status, nextCalled = false;
  const req = { get: (h) => headers[h.toLowerCase()] };
  const res = { status(s) { status = s; return this; }, json() {} };
  requireAdmin(req, res, () => { nextCalled = true; });
  return { status, nextCalled };
}

test("requireAdmin enforces the API key and production lockdown", () => {
  const saved = { ...config };
  try {
    config.adminApiKey = "secret"; config.isProduction = false;
    assert.equal(runAdmin({}).status, 401);
    assert.equal(runAdmin({ "x-api-key": "wrong" }).status, 401);
    assert.ok(runAdmin({ "x-api-key": "secret" }).nextCalled);
    config.adminApiKey = ""; config.isProduction = true;
    assert.equal(runAdmin({}).status, 403);
    config.isProduction = false;
    assert.ok(runAdmin({}).nextCalled);
  } finally {
    Object.assign(config, saved);
  }
});

test("errorHandler maps CastError to 400", () => {
  let status;
  const res = { status(s) { status = s; return this; }, json() {} };
  errorHandler({ name: "CastError", path: "destination" }, {}, res, () => {});
  assert.equal(status, 400);
});
