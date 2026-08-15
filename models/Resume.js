import mongoose from "mongoose";

const LinkItemSchema = new mongoose.Schema(
  {
    label: { type: String, default: "" },
    url: { type: String, default: "" },
  },
  { _id: false }
);

const TimelineItemSchema = new mongoose.Schema(
  {
    primary: { type: String, default: "" },
    secondary: { type: String, default: "" },
    date: { type: String, default: "" },
    location: { type: String, default: "" },
    content: { type: String, default: "" },
    links: { type: [LinkItemSchema], default: [] },
  },
  { _id: false }
);

const SectionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    heading: { type: String, default: "" },
    type: {
      type: String,
      enum: ["text", "timeline"],
      default: "text",
    },
    content: { type: String, default: "" },
    items: { type: [TimelineItemSchema], default: [] },
  },
  { _id: false }
);

const ResumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      default: "My Resume",
    },
    design: {
      headerFont: { type: String, default: "TeX Gyre Pagella" },
      bodyFont: { type: String, default: "Noto Sans" },
      margin: { type: Number, default: 56 },
      sectionGap: { type: Number, default: 20 },
      itemGap: { type: Number, default: 6 },
      fontSizes: {
        title: { type: Number, default: 44 },
        subtitle: { type: Number, default: 24 },
        sectionHeader: { type: Number, default: 24 },
        itemTitle: { type: Number, default: 20 },
        itemSubtitle: { type: Number, default: 16 },
        body: { type: Number, default: 14 },
      },
    },
    basics: {
      name: { type: String, default: "" },
      title: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      location: { type: String, default: "" },
      alignment: {
        type: String,
        enum: ["left", "center", "right"],
        default: "center",
      },
      links: { type: [LinkItemSchema], default: [] },
    },
    sections: {
      type: [SectionSchema],
      default: [],
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);
