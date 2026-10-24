import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "id is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[a-z0-9-]+$/, "id must be a lowercase slug"]
    },
    name: { type: String, required: [true, "name is required"], trim: true, maxlength: 80 },
    image: { type: String, trim: true },
    description: { type: String, required: [true, "description is required"], trim: true, maxlength: 500 },
    bestTime: { type: String, required: [true, "bestTime is required"], trim: true },
    category: { type: [String], default: [] },
    // activities per interest, e.g. { heritage: [...], food: [...] }
    itinerary: { type: Map, of: [String], default: {} }
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Destination", destinationSchema);
