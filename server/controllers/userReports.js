import UserReport from "../models/UserReport.js";
import User from "../models/User.js";
import { uploadReportScreenshotToS3 } from "../s3.js";
import axios from "axios";
import { generateMailTransport } from "../utils/mail.js";

const extractIp = (req) => {
  const forwarded = req.headers["x-forwarded-for"];
  const raw = forwarded ? forwarded.split(",")[0].trim() : req.socket.remoteAddress || "";
  return raw;
};

const requireAdmin = async (userId) => {
  const user = await User.findById(userId).select("role").lean();
  return user?.role === "Admin";
};

// POST /userreports/upload
// Authenticated users only - uploads a single screenshot to S3 under user-reports/
export const uploadScreenshot = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file provided" });

  const result = await uploadReportScreenshotToS3(req.file);
  if (!result) return res.status(500).json({ message: "Upload failed" });

  res.status(200).json({ key: result.Key });
};

// POST /userreports
// Authenticated users only
export const createReport = async (req, res) => {
  const { type, title, description, pageUrl, screenshots, recaptchaToken } = req.body;

  if (process.env.RECAPTCHA_SECRET_KEY) {
    const captchaRes = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      { params: { secret: process.env.RECAPTCHA_SECRET_KEY, response: recaptchaToken } }
    );
    if (!captchaRes.data.success) {
      return res.status(400).json({ message: "reCAPTCHA verification failed" });
    }
  }

  const user = await User.findById(req.user.id).select("email firstName lastName role").lean();
  if (!user) return res.status(404).json({ message: "User not found" });

  const report = await UserReport.create({
    type,
    title,
    description,
    pageUrl: pageUrl || "",
    screenshots: screenshots || [],
    submittedBy: req.user.id,
    submitterEmail: user.email,
    submitterName: `${user.firstName} ${user.lastName}`,
    submitterRole: user.role,
    ipAddress: extractIp(req),
  });

  const ticketId = report._id.toString().slice(-6).toUpperCase();
  const typeLabel = type === "bug" ? "bug report" : "feature request";

  try {
    const transport = generateMailTransport();
    await transport.sendMail({
      from: '"KinoKlik Support" <support@kinoklik.ca>',
      to: user.email,
      subject: `We received your ${typeLabel} — Ticket #${ticketId}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;border-radius:8px;overflow:hidden;">
          <div style="background:#1E0039;padding:24px 32px;">
            <h1 style="color:#fff;margin:0;font-size:20px;font-weight:700;">KinoKlik Support</h1>
          </div>
          <div style="padding:32px;">
            <p style="color:#333;font-size:15px;margin:0 0 16px;">Hi <strong>${user.firstName}</strong>,</p>
            <p style="color:#333;font-size:15px;margin:0 0 24px;">
              Thank you for submitting your ${typeLabel}. We've received it and our team will review it shortly.
            </p>
            <div style="background:#fff;border:1px solid #e0e0e0;border-radius:8px;padding:20px;margin-bottom:24px;">
              <p style="color:#888;font-size:12px;margin:0 0 4px;text-transform:uppercase;letter-spacing:1px;">Ticket Number</p>
              <p style="color:#1E0039;font-size:28px;font-weight:700;margin:0;letter-spacing:2px;">#${ticketId}</p>
            </div>
            <div style="background:#f5f5f5;border-radius:6px;padding:16px;margin-bottom:24px;">
              <p style="color:#888;font-size:12px;margin:0 0 4px;text-transform:uppercase;letter-spacing:1px;">Your submission</p>
              <p style="color:#333;font-size:14px;font-weight:600;margin:0;">${title}</p>
            </div>
            <p style="color:#666;font-size:13px;margin:0;">
              Keep this ticket number handy — we'll reference it in any follow-up communication.
            </p>
          </div>
          <div style="background:#f0f0f0;padding:16px 32px;text-align:center;">
            <p style="color:#999;font-size:12px;margin:0;">KinoKlik · The Film Industry Platform</p>
          </div>
        </div>
      `,
    });
  } catch (emailErr) {
    console.error("Confirmation email failed:", emailErr.message);
  }

  res.status(201).json(report);
};

// GET /userreports
// Admin only - supports ?type, ?status, ?priority, ?sort=newest|oldest, ?page, ?limit
export const getAllReports = async (req, res) => {
  if (!(await requireAdmin(req.user.id))) {
    return res.status(403).json({ message: "Admin access required" });
  }

  const { type, status, priority, sort = "newest", page = 1, limit = 20 } = req.query;

  const filter = {};
  if (type) filter.type = type;
  if (status) filter.status = status;
  else filter.status = { $ne: "closed" };
  if (priority) filter.priority = priority;

  const sortOrder = sort === "oldest" ? 1 : -1;
  const skip = (Number(page) - 1) * Number(limit);

  const [reports, total] = await Promise.all([
    UserReport.find(filter).sort({ createdAt: sortOrder }).skip(skip).limit(Number(limit)).lean(),
    UserReport.countDocuments(filter),
  ]);

  res.status(200).json({
    reports,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
  });
};

// GET /userreports/:id
// Admin only
export const getReportById = async (req, res) => {
  if (!(await requireAdmin(req.user.id))) {
    return res.status(403).json({ message: "Admin access required" });
  }

  const report = await UserReport.findById(req.params.id).lean();
  if (!report) return res.status(404).json({ message: "Report not found" });

  res.status(200).json(report);
};

// PATCH /userreports/:id
// Admin only - update status, priority, adminNotes
export const updateReport = async (req, res) => {
  if (!(await requireAdmin(req.user.id))) {
    return res.status(403).json({ message: "Admin access required" });
  }

  const { status, priority, adminNotes } = req.body;
  const changes = { updatedAt: Date.now() };

  if (status !== undefined) {
    changes.status = status;
    changes.resolvedAt = status === "resolved" ? new Date() : null;
  }
  if (priority !== undefined) changes.priority = priority;
  if (adminNotes !== undefined) changes.adminNotes = adminNotes;

  const report = await UserReport.findByIdAndUpdate(req.params.id, changes, { new: true, runValidators: true });
  if (!report) return res.status(404).json({ message: "Report not found" });

  res.status(200).json(report);
};

// DELETE /userreports/:id
// Admin only
export const deleteReport = async (req, res) => {
  if (!(await requireAdmin(req.user.id))) {
    return res.status(403).json({ message: "Admin access required" });
  }

  const report = await UserReport.findByIdAndDelete(req.params.id);
  if (!report) return res.status(404).json({ message: "Report not found" });

  res.status(200).json({ message: "Report deleted" });
};

// POST /userreports/:id/respond
// Admin only - sends an email reply to the submitter and logs it on the ticket
export const sendResponse = async (req, res) => {
  if (!(await requireAdmin(req.user.id))) {
    return res.status(403).json({ message: "Admin access required" });
  }

  const { message } = req.body;
  if (!message?.trim()) {
    return res.status(400).json({ message: "Message is required" });
  }

  const report = await UserReport.findById(req.params.id);
  if (!report) return res.status(404).json({ message: "Report not found" });

  const admin = await User.findById(req.user.id).select("firstName lastName").lean();
  const adminName = admin ? `${admin.firstName} ${admin.lastName}` : "KinoKlik Support";

  const transport = generateMailTransport();
  await transport.sendMail({
    from: '"KinoKlik Support" <support@kinoklik.ca>',
    to: report.submitterEmail,
    subject: `Re: [#${report._id.toString().slice(-6).toUpperCase()}] ${report.title}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;border-radius:8px;overflow:hidden;">
        <div style="background:#1E0039;padding:24px 32px;">
          <h1 style="color:#fff;margin:0;font-size:20px;font-weight:700;">KinoKlik Support</h1>
          <p style="color:#ffffff80;margin:4px 0 0;font-size:13px;">Ticket #${report._id.toString().slice(-6).toUpperCase()}</p>
        </div>
        <div style="padding:32px;">
          <p style="color:#333;font-size:15px;margin:0 0 8px;">Hi <strong>${report.submitterName}</strong>,</p>
          <p style="color:#333;font-size:15px;margin:0 0 24px;">Here is an update on your ticket <strong>"${report.title}"</strong>:</p>
          <div style="background:#fff;border-left:4px solid #712CB0;border-radius:4px;padding:16px 20px;margin-bottom:24px;">
            <p style="color:#1a1a1a;font-size:15px;line-height:1.6;margin:0;white-space:pre-line;">${message.trim()}</p>
          </div>
          <p style="color:#666;font-size:13px;margin:0;">— ${adminName} · KinoKlik Team</p>
        </div>
        <div style="background:#f0f0f0;padding:16px 32px;text-align:center;">
          <p style="color:#999;font-size:12px;margin:0;">You received this email because you submitted a report on KinoKlik.</p>
        </div>
      </div>
    `,
  });

  // Log response on the ticket and auto-advance status from open → in_progress
  report.responses.push({ message: message.trim(), sentByName: adminName });
  if (report.status === "open") report.status = "in_progress";
  report.updatedAt = new Date();
  await report.save();

  res.status(200).json(report);
};
