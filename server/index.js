import mongoose from "mongoose";
import { config } from "./config.js";
import { createApp } from "./app.js";

try {
  await mongoose.connect(config.mongoUri);
  console.log("MongoDB connected");
} catch (err) {
  console.error(`MongoDB connection failed (${err.message}). Set MONGODB_URI in .env.`);
  process.exit(1);
}

createApp().listen(config.port, () => console.log(`API listening on http://localhost:${config.port}`));
