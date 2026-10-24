import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required."], trim: true, maxlength: 80 },
    email: {
      type: String,
      required: [true, "Email is required."],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address."]
    },
    subject: { type: String, required: [true, "Subject is required."], trim: true, maxlength: 150 },
    message: {
      type: String,
      required: [true, "Message is required."],
      trim: true,
      minlength: [10, "Message must contain at least 10 characters."],
      maxlength: 2000
    }
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Message", messageSchema);
