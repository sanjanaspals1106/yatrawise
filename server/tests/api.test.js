import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";
import request from "supertest";

// Integration tests need a reachable MongoDB; set TEST_MONGODB_URI (never reuses the dev DB by default).
const uri = process.env.TEST_MONGODB_URI || "mongodb://127.0.0.1:27017/yatrawise_test";
process.env.LOG_DIR = "server/logs-test";
process.env.EXPORT_DIR = "server/exports-test";

let app, connected = false;

before(async () => {
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 1500 });
    connected = true;
    await mongoose.connection.dropDatabase();
    const { createApp } = await import("../app.js");
    const { seed } = await import("../scripts/seed.js");
    await seed();
    await seed();
    app = createApp();
  } catch { /* skipped below */ }
});

after(async () => {
  if (connected) await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

const t = (name, fn) => test(name, async (ctx) => (connected ? fn() : ctx.skip("MongoDB not reachable")));

t("seed is idempotent", async () => {
  const res = await request(app).get("/api/destinations");
  assert.equal(res.body.length, 6);
});

t("destination CRUD", async () => {
  const body = { id: "udaipur", name: "Udaipur", description: "Beaches", bestTime: "Nov-Feb", category: ["Nature"] };
  assert.equal((await request(app).post("/api/destinations").send(body)).status, 201);
  assert.equal((await request(app).post("/api/destinations").send(body)).status, 409);
  assert.equal((await request(app).post("/api/destinations").send({ id: "x" })).status, 400);
  const patched = await request(app).patch("/api/destinations/udaipur").send({ name: "Udaipur!" });
  assert.equal(patched.body.name, "Udaipur!");
  assert.equal((await request(app).get("/api/destinations/udaipur")).status, 200);
  assert.equal((await request(app).delete("/api/destinations/udaipur")).status, 204);
  assert.equal((await request(app).get("/api/destinations/udaipur")).status, 404);
});

t("trip lifecycle with events and export", async () => {
  const bad = await request(app).post("/api/trips").send({ destination: "hampi", duration: 10, interests: ["food"] });
  assert.equal(bad.status, 400);
  assert.equal((await request(app).post("/api/trips").send({ destination: "nowhere", duration: 2, interests: ["food"] })).status, 400);

  const before = (await request(app).get("/api/trips/stats/metrics")).body.tripsCreated;
  const created = await request(app).post("/api/trips").send({ destination: "hampi", duration: 3, interests: ["heritage", "food"] });
  assert.equal(created.status, 201);
  assert.equal(created.body.itinerary.length, 3);
  assert.equal((await request(app).get("/api/trips/stats/metrics")).body.tripsCreated, before + 1);

  const id = created.body._id;
  const patched = await request(app).patch(`/api/trips/${id}`).send({ duration: 2 });
  assert.equal(patched.body.itinerary.length, 2);

  const exp = await request(app).get(`/api/trips/${id}/export`);
  assert.equal(exp.status, 200);
  assert.match(exp.text, /Day 1/);

  assert.equal((await request(app).get("/api/trips/not-an-id")).status, 400);
  assert.equal((await request(app).delete(`/api/trips/${id}`)).status, 204);
  assert.equal((await request(app).get(`/api/trips/${id}`)).status, 404);
});

t("malformed field types return 400, not 500", async () => {
  const res = await request(app).post("/api/trips").send({ destination: { $ne: 1 }, duration: 2, interests: ["food"] });
  assert.equal(res.status, 400);
});

t("contact form validation and save", async () => {
  assert.equal((await request(app).post("/api/contact").send({ name: "A", email: "bad" })).status, 400);
  const ok = await request(app).post("/api/contact").send({ name: "A", email: "a@b.co", subject: "Hi", message: "Hello there friend" });
  assert.equal(ok.status, 201);
});
