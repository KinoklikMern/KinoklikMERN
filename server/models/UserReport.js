import mongoose from "mongoose";

const UserReportSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["bug", "feature_request"],
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 120,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 3000,
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // Denormalized at submit time so admin context survives user deletion
  submitterEmail: {
    type: String,
    required: true,
  },
  submitterName: {
    type: String,
    required: true,
  },
  submitterRole: {
    type: String,
    default: "",
  },
  // The client-side route where the report was submitted from
  pageUrl: {
    type: String,
    trim: true,
    default: "",
  },
  screenshots: {
    type: [String],
    default: [],
  },
  ipAddress: {
    type: String,
    default: "",
  },
  // Admin workflow
  status: {
    type: String,
    enum: ["open", "in_progress", "resolved", "closed"],
    default: "open",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high", "critical"],
    default: "medium",
  },
  adminNotes: {
    type: String,
    trim: true,
    maxlength: 2000,
    default: "",
  },
  resolvedAt: {
    type: Date,
    default: null,
  },
  responses: [
    {
      message: { type: String, required: true },
      sentByName: { type: String, required: true },
      sentAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

// Admin dashboard: filter by type, status, sort by date
UserReportSchema.index({ type: 1, status: 1 });
UserReportSchema.index({ createdAt: -1 });
UserReportSchema.index({ submittedBy: 1 });

const UserReport = mongoose.model("UserReport", UserReportSchema);

export default UserReport;
