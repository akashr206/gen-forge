import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    emailVerified: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model recompilation in Next.js hot reload
export default mongoose.models.User || mongoose.model("User", UserSchema);
