import mongoose from "mongoose";

export const INTERESTS = ["heritage", "food", "nature", "shopping"];

const daySchema = new mongoose.Schema(
  {
    day: Number,
    theme: String,
    activities: [String]
  },
  { _id: false }
);

const tripSchema = new mongoose.Schema(
  {
    destination: { type: String, required: [true, "destination is required"], trim: true, lowercase: true },
    duration: {
      type: Number,
      required: [true, "duration is required"],
      min: [1, "duration must be at least 1 day"],
      max: [7, "duration cannot exceed 7 days"],
      validate: { validator: Number.isInteger, message: "duration must be a whole number" }
    },
    interests: {
      type: [{ type: String, enum: { values: INTERESTS, message: "invalid interest: {VALUE}" } }],
      validate: { validator: (v) => v.length > 0, message: "select at least one interest" }
    },
    travelerName: { type: String, trim: true, maxlength: 80 },
    notes: { type: String, trim: true, maxlength: 500 },
    itinerary: { type: [daySchema], default: [] }
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Trip", tripSchema);
