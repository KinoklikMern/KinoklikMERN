import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFlag, faBug, faLightbulb, faChevronDown, faTrash,
  faPaperPlane, faImage, faClock, faCircleCheck, faCircleXmark, faArrowLeft,
  faMagnifyingGlass, faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Dashboard/Sidebar";
import { fetchReports, patchReport, deleteReport, respondToReport } from "../../api/userReports";

// ── helpers ────────────────────────────────────────────────────────────────

const token = () => JSON.parse(Cookies.get("user") || "null")?.token;

const timeAgo = (date) => {
  const s = Math.floor((Date.now() - new Date(date)) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
};

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit",
  });

const STATUS_META = {
  open:        { label: "Open",        color: "tw-bg-blue-500/20 tw-text-blue-300",   border: "tw-border-l-blue-500" },
  in_progress: { label: "In Progress", color: "tw-bg-amber-500/20 tw-text-amber-300", border: "tw-border-l-amber-400" },
  resolved:    { label: "Resolved",    color: "tw-bg-green-500/20 tw-text-green-300", border: "tw-border-l-green-500" },
  closed:      { label: "Closed",      color: "tw-bg-white/10 tw-text-white/40",      border: "tw-border-l-white/20" },
};

const PRIORITY_META = {
  low:      { label: "Low",      color: "tw-bg-white/10 tw-text-white/50" },
  medium:   { label: "Medium",   color: "tw-bg-blue-500/20 tw-text-blue-300" },
  high:     { label: "High",     color: "tw-bg-orange-500/20 tw-text-orange-300" },
  critical: { label: "Critical", color: "tw-bg-red-500/20 tw-text-red-400" },
};

const Badge = ({ meta, className = "" }) => (
  <span className={`tw-inline-flex tw-items-center tw-px-2 tw-py-0.5 tw-rounded-full tw-text-xs tw-font-medium ${meta.color} ${className}`}>
    {meta.label}
  </span>
);

const SelectField = ({ value, onChange, options, className = "" }) => (
  <div className={`tw-relative tw-inline-block ${className}`}>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="tw-appearance-none tw-bg-[#190033] tw-border tw-border-white/20 tw-text-white tw-text-xs tw-rounded-lg tw-pl-2.5 tw-pr-6 tw-py-1.5 tw-outline-none focus:tw-border-[#712CB0] tw-cursor-pointer"
    >
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
    <FontAwesomeIcon icon={faChevronDown} className="tw-pointer-events-none tw-absolute tw-right-2 tw-top-2 tw-text-[10px] tw-text-white/40" />
  </div>
);

// ── TicketRow ───────────────────────────────────────────────────────────────

const TicketRow = ({ report, isSelected, onClick }) => {
  const sm = STATUS_META[report.status] || STATUS_META.open;
  const pm = PRIORITY_META[report.priority] || PRIORITY_META.medium;
  return (
    <button
      onClick={onClick}
      className={`tw-w-full tw-text-left tw-border-l-4 ${sm.border} tw-px-3 tw-py-3 tw-transition-colors tw-border-none tw-cursor-pointer ${
        isSelected ? "tw-bg-[#712CB0]/25" : "tw-bg-transparent hover:tw-bg-white/5"
      }`}
    >
      <div className="tw-flex tw-items-start tw-justify-between tw-gap-2">
        <div className="tw-min-w-0 tw-flex-1">
          <div className="tw-flex tw-items-center tw-gap-1.5 tw-mb-1">
            <FontAwesomeIcon
              icon={report.type === "bug" ? faBug : faLightbulb}
              className={`tw-text-[10px] tw-shrink-0 ${report.type === "bug" ? "tw-text-red-400" : "tw-text-yellow-400"}`}
            />
            <p className="tw-text-sm tw-text-white tw-font-medium tw-truncate">{report.title}</p>
          </div>
          <p className="tw-text-xs tw-text-white/40 tw-truncate">{report.submitterName}</p>
        </div>
        <div className="tw-flex tw-flex-col tw-items-end tw-gap-1 tw-shrink-0">
          <Badge meta={pm} />
          <span className="tw-text-[10px] tw-text-white/30">{timeAgo(report.createdAt)}</span>
        </div>
      </div>
    </button>
  );
};

// ── ResponseBubble ──────────────────────────────────────────────────────────

const ResponseBubble = ({ resp }) => (
  <div className="tw-flex tw-flex-col tw-gap-1">
    <div className="tw-flex tw-items-center tw-gap-2">
      <FontAwesomeIcon icon={faPaperPlane} className="tw-text-[#712CB0] tw-text-xs" />
      <span className="tw-text-xs tw-text-white tw-font-medium">{resp.sentByName}</span>
      <span className="tw-text-[10px] tw-text-white/60">{formatDate(resp.sentAt)}</span>
    </div>
    <div className="tw-ml-4 tw-bg-[#712CB0]/10 tw-border tw-border-[#712CB0]/30 tw-rounded-lg tw-px-3 tw-py-2.5">
      <p className="tw-text-sm tw-text-white tw-whitespace-pre-wrap">{resp.message}</p>
    </div>
  </div>
);

// ── TicketDetail ────────────────────────────────────────────────────────────

const TicketDetail = ({ report, onUpdated, onDeleted, onBack }) => {
  const [status, setStatus] = useState(report.status);
  const [priority, setPriority] = useState(report.priority);
  const [adminNotes, setAdminNotes] = useState(report.adminNotes || "");
  const [savingNotes, setSavingNotes] = useState(false);
  const [replyMsg, setReplyMsg] = useState("");
  const [sendingReply, setSendingReply] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    setStatus(report.status);
    setPriority(report.priority);
    setAdminNotes(report.adminNotes || "");
    setReplyMsg("");
  }, [report._id]);

  const handleStatusChange = async (val) => {
    setStatus(val);
    const updated = await patchReport(report._id, { status: val }, token());
    onUpdated(updated);
  };

  const handlePriorityChange = async (val) => {
    setPriority(val);
    const updated = await patchReport(report._id, { priority: val }, token());
    onUpdated(updated);
  };

  const handleSaveNotes = async () => {
    setSavingNotes(true);
    try {
      const updated = await patchReport(report._id, { adminNotes }, token());
      onUpdated(updated);
      toast.success("Notes saved");
    } catch {
      toast.error("Failed to save notes");
    } finally {
      setSavingNotes(false);
    }
  };

  const handleSendReply = async () => {
    if (!replyMsg.trim()) return;
    setSendingReply(true);
    try {
      const updated = await respondToReport(report._id, replyMsg, token());
      onUpdated(updated);
      setReplyMsg("");
      toast.success("Response sent");
    } catch {
      toast.error("Failed to send response");
    } finally {
      setSendingReply(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this ticket permanently?")) return;
    try {
      await deleteReport(report._id, token());
      onDeleted(report._id);
      toast.success("Ticket deleted");
    } catch {
      toast.error("Failed to delete ticket");
    }
  };

  const ticketId = report._id.slice(-6).toUpperCase();

  return (
    <div className="tw-flex tw-flex-col">

      {/* Header */}
      <div className="tw-px-5 tw-py-4 tw-border-b tw-border-white/10 tw-sticky tw-top-0 tw-bg-[#280D41] tw-z-10">
        {/* Back button — mobile only */}
        <button
          onClick={onBack}
          className="md:tw-hidden tw-flex tw-items-center tw-gap-2 tw-text-white/70 hover:tw-text-white tw-text-xs tw-bg-transparent tw-border-none tw-cursor-pointer tw-mb-3 tw-p-0 tw-transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          All tickets
        </button>
        <div className="tw-flex tw-items-start tw-justify-between tw-gap-3 tw-mb-3">
          <div className="tw-min-w-0">
            <div className="tw-flex tw-items-center tw-gap-2 tw-mb-1">
              <FontAwesomeIcon
                icon={report.type === "bug" ? faBug : faLightbulb}
                className={`tw-text-xs ${report.type === "bug" ? "tw-text-red-400" : "tw-text-yellow-400"}`}
              />
              <span className="tw-text-[11px] tw-text-white/70 tw-uppercase tw-tracking-wider">
                {report.type === "bug" ? "Bug Report" : "Feature Request"} · #{ticketId}
              </span>
            </div>
            <h2 className="tw-text-white tw-font-bold tw-text-lg tw-leading-tight">{report.title}</h2>
          </div>
          <button
            onClick={handleDelete}
            className="tw-shrink-0 tw-p-2 tw-text-white/30 hover:tw-text-red-400 tw-bg-transparent tw-border-none tw-cursor-pointer tw-transition-colors"
            title="Delete ticket"
          >
            <FontAwesomeIcon icon={faTrash} className="tw-text-sm" />
          </button>
        </div>

        {/* Status + Priority controls */}
        <div className="tw-flex tw-items-center tw-gap-2 tw-flex-wrap">
          <SelectField
            value={status}
            onChange={handleStatusChange}
            options={Object.entries(STATUS_META).map(([v, m]) => ({ value: v, label: m.label }))}
          />
          <SelectField
            value={priority}
            onChange={handlePriorityChange}
            options={Object.entries(PRIORITY_META).map(([v, m]) => ({ value: v, label: m.label }))}
          />
          {report.resolvedAt && (
            <span className="tw-text-xs tw-text-green-400 tw-flex tw-items-center tw-gap-1">
              <FontAwesomeIcon icon={faCircleCheck} />
              Resolved {timeAgo(report.resolvedAt)}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="tw-px-4 tw-py-4 tw-flex tw-flex-col tw-gap-3">

        {/* Submitter info */}
        <div className="tw-rounded-xl tw-bg-[#1E0039] tw-border tw-border-white/15 tw-overflow-hidden">
          <div className="tw-px-4 tw-py-2 tw-border-b tw-border-white/10">
            <span className="tw-text-[11px] tw-font-semibold tw-text-white tw-uppercase tw-tracking-wider">Submitter</span>
          </div>
          <div className="tw-p-4 tw-grid tw-grid-cols-2 tw-gap-x-6 tw-gap-y-3 tw-text-xs">
            {[
              ["From", <Link to={`/user/${report.submittedBy}`} target="_blank" rel="noopener noreferrer" className="tw-text-white hover:tw-text-[#B97FE0] tw-underline tw-underline-offset-2 tw-transition-colors">{report.submitterName}</Link>],
              ["Role", report.submitterRole || "—"],
              ["Email", <a href={`mailto:${report.submitterEmail}`} className="tw-text-white hover:tw-text-[#B97FE0] tw-underline tw-underline-offset-2 tw-transition-colors">{report.submitterEmail}</a>],
              ["Page", report.pageUrl || "—"],
              ["IP", report.ipAddress || "—"],
              ["Submitted", formatDate(report.createdAt)],
            ].map(([label, val]) => (
              <div key={label}>
                <span className="tw-text-white/60 tw-block tw-mb-0.5">{label}</span>
                <span className="tw-text-white">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="tw-rounded-xl tw-bg-[#1E0039] tw-border tw-border-white/15 tw-overflow-hidden">
          <div className="tw-px-4 tw-py-2 tw-border-b tw-border-white/10">
            <span className="tw-text-[11px] tw-font-semibold tw-text-white tw-uppercase tw-tracking-wider">Description</span>
          </div>
          <p className="tw-px-4 tw-py-4 tw-text-sm tw-text-white tw-whitespace-pre-wrap tw-leading-relaxed">{report.description}</p>
        </div>

        {/* Screenshots */}
        {report.screenshots?.length > 0 && (
          <div className="tw-rounded-xl tw-bg-[#1E0039] tw-border tw-border-white/15 tw-overflow-hidden">
            <div className="tw-px-4 tw-py-2 tw-border-b tw-border-white/10 tw-flex tw-items-center tw-gap-1.5">
              <FontAwesomeIcon icon={faImage} className="tw-text-white/70 tw-text-[10px]" />
              <span className="tw-text-[11px] tw-font-semibold tw-text-white tw-uppercase tw-tracking-wider">Screenshots</span>
            </div>
            <div className="tw-flex tw-gap-2 tw-flex-wrap tw-p-4">
              {report.screenshots.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`screenshot ${i + 1}`}
                  onClick={() => setLightbox(url)}
                  className="tw-w-24 tw-h-24 tw-object-cover tw-rounded-lg tw-border tw-border-white/15 tw-cursor-pointer hover:tw-border-[#712CB0] tw-transition-colors"
                />
              ))}
            </div>
          </div>
        )}

        {/* Admin Notes */}
        <div className="tw-rounded-xl tw-bg-[#1E0039] tw-border tw-border-white/15 tw-overflow-hidden">
          <div className="tw-px-4 tw-py-2 tw-border-b tw-border-white/10 tw-flex tw-items-center tw-justify-between">
            <span className="tw-text-[11px] tw-font-semibold tw-text-white tw-uppercase tw-tracking-wider">Internal Notes</span>
            <button
              onClick={handleSaveNotes}
              disabled={savingNotes}
              className="tw-text-xs tw-text-white hover:tw-text-white/70 tw-bg-transparent tw-border-none tw-cursor-pointer tw-transition-colors disabled:tw-opacity-50"
            >
              {savingNotes ? "Saving..." : "Save"}
            </button>
          </div>
          <textarea
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            placeholder="Add internal notes (not visible to user)..."
            rows={3}
            className="tw-w-full tw-bg-transparent tw-p-4 tw-text-sm tw-text-white tw-outline-none tw-resize-none placeholder:tw-text-white/20 tw-border-none"
          />
        </div>

        {/* Response history */}
        {report.responses?.length > 0 && (
          <div className="tw-rounded-xl tw-bg-[#1E0039] tw-border tw-border-white/15 tw-overflow-hidden">
            <div className="tw-px-4 tw-py-2 tw-border-b tw-border-white/10 tw-flex tw-items-center tw-gap-1.5">
              <FontAwesomeIcon icon={faClock} className="tw-text-white/70 tw-text-[10px]" />
              <span className="tw-text-[11px] tw-font-semibold tw-text-white tw-uppercase tw-tracking-wider">Response History</span>
            </div>
            <div className="tw-flex tw-flex-col tw-gap-3 tw-p-4">
              {report.responses.map((r, i) => <ResponseBubble key={i} resp={r} />)}
            </div>
          </div>
        )}

      </div>

      {/* Email reply composer */}
      <div className="tw-mx-4 tw-mb-24 md:tw-mb-4 tw-rounded-xl tw-border tw-border-white/15 tw-bg-[#1E0039] tw-overflow-hidden">
        <div className="tw-px-4 tw-py-2 tw-bg-[#190033]/60 tw-border-b tw-border-white/10">
          <span className="tw-text-xs tw-text-white/70">
            Reply to <span className="tw-text-white tw-font-medium">{report.submitterEmail}</span>
          </span>
        </div>
        <textarea
          value={replyMsg}
          onChange={(e) => setReplyMsg(e.target.value)}
          placeholder="Write your response to the user..."
          rows={4}
          className="tw-w-full tw-bg-[#190033]/30 tw-px-4 tw-py-3 tw-text-sm tw-text-white tw-outline-none tw-resize-none placeholder:tw-text-white/20 tw-border-none"
        />
        <div className="tw-px-4 tw-py-2 tw-bg-[#190033]/60 tw-border-t tw-border-white/10 tw-flex tw-justify-end">
          <button
            onClick={handleSendReply}
            disabled={sendingReply || !replyMsg.trim()}
            className="tw-flex tw-items-center tw-gap-2 tw-px-4 tw-py-1.5 tw-bg-[#712CB0] hover:tw-bg-[#8A3FD4] tw-text-white tw-text-xs tw-font-semibold tw-rounded-lg tw-border-none tw-cursor-pointer tw-transition-colors disabled:tw-opacity-40 disabled:tw-cursor-not-allowed"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
            {sendingReply ? "Sending..." : "Send Response"}
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="tw-fixed tw-inset-0 tw-z-[9999] tw-bg-black/80 tw-flex tw-items-center tw-justify-center tw-p-8 tw-cursor-pointer"
        >
          <img src={lightbox} alt="screenshot" className="tw-max-w-full tw-max-h-full tw-rounded-xl tw-shadow-2xl" />
          <button className="tw-absolute tw-top-4 tw-right-4 tw-text-white tw-bg-transparent tw-border-none tw-cursor-pointer">
            <FontAwesomeIcon icon={faCircleXmark} className="tw-text-2xl" />
          </button>
        </div>
      )}
    </div>
  );
};

// ── UserReportsPage ──────────────────────────────────────────────────────────

const STATUS_TABS = [
  { value: "all", label: "All" },
  { value: "open", label: "Open" },
  { value: "in_progress", label: "In Progress" },
  { value: "resolved", label: "Resolved" },
  { value: "closed", label: "Closed" },
];

export default function ReportsPage() {
  const user = useSelector((state) => state.user);
  const [reports, setReports] = useState([]);
  const [selected, setSelected] = useState(null);
  const [mobileView, setMobileView] = useState("list"); // "list" | "detail"
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const loadReports = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchReports({ status: statusFilter, type: typeFilter, sort: "newest", limit: 100 }, token());
      setReports(data.reports ?? data);
    } catch {
      toast.error("Failed to load reports");
    } finally {
      setLoading(false);
    }
  }, [statusFilter, typeFilter]);

  useEffect(() => { loadReports(); }, [loadReports]);

  const filteredReports = searchQuery.trim()
    ? reports.filter((r) => {
        const q = searchQuery.toLowerCase();
        return r.title?.toLowerCase().includes(q) || r.submitterName?.toLowerCase().includes(q);
      })
    : reports;

  // Re-select updated ticket from the list
  const handleUpdated = (updated) => {
    setReports((prev) => prev.map((r) => (r._id === updated._id ? updated : r)));
    setSelected(updated);
  };

  const handleDeleted = (id) => {
    setReports((prev) => prev.filter((r) => r._id !== id));
    setSelected(null);
  };

  return (
    <div className="tw-flex tw-h-[calc(100vh-5rem)] tw-overflow-hidden tw-bg-[#1E0039]">
      <div className="tw-flex tw-flex-1 tw-overflow-hidden tw-pt-3 tw-pb-4 tw-px-3">
        <Sidebar role={user.role} />

        {/* ── Two-panel CRM layout ── */}
        <div className="tw-flex-1 tw-flex tw-overflow-hidden tw-gap-3 md:tw-ml-3">

          {/* Left – ticket list: full-width on mobile, fixed sidebar on desktop */}
          <div className={`tw-flex-col tw-rounded-xl tw-bg-[#280D41] tw-border tw-border-white/10 tw-overflow-hidden
            tw-w-full md:tw-w-72 md:tw-shrink-0 md:tw-flex
            ${mobileView === "list" ? "tw-flex" : "tw-hidden"}`}>

            {/* List header */}
            <div className="tw-px-3 tw-pt-3 tw-pb-2 tw-shrink-0">
              <div className="tw-flex tw-items-center tw-justify-between tw-mb-3">
                <div className="tw-flex tw-items-center tw-gap-2">
                  <FontAwesomeIcon icon={faFlag} className="tw-text-[#712CB0]" />
                  <h2 className="tw-text-sm tw-font-bold tw-text-white">Tickets</h2>
                </div>
                <span className="tw-text-xs tw-text-white/40">
                  {filteredReports.length}{searchQuery.trim() ? ` / ${reports.length}` : ""} total
                </span>
              </div>

              {/* Search */}
              <div className="tw-relative tw-mb-2">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="tw-pointer-events-none tw-absolute tw-left-3 tw-top-1/2 -tw-translate-y-1/2 tw-text-white/30 tw-text-xs"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search title or name..."
                  className="tw-w-full tw-bg-[#190033] tw-border tw-border-white/15 tw-rounded-lg tw-pl-8 tw-pr-8 tw-py-1.5 tw-text-xs tw-text-white tw-outline-none focus:tw-border-[#712CB0] placeholder:tw-text-white/25 tw-transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="tw-absolute tw-right-2.5 tw-top-1/2 -tw-translate-y-1/2 tw-text-white/30 hover:tw-text-white tw-bg-transparent tw-border-none tw-cursor-pointer tw-transition-colors tw-p-0"
                  >
                    <FontAwesomeIcon icon={faXmark} className="tw-text-xs" />
                  </button>
                )}
              </div>

              {/* Type toggle */}
              <div className="tw-flex tw-rounded-lg tw-overflow-hidden tw-border tw-border-white/10 tw-mb-2">
                {[{ value: "all", label: "All" }, { value: "bug", icon: faBug, label: "Bugs" }, { value: "feature_request", icon: faLightbulb, label: "Features" }].map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setTypeFilter(t.value)}
                    className={`tw-flex-1 tw-flex tw-items-center tw-justify-center tw-gap-1 tw-py-1.5 tw-text-xs tw-font-medium tw-border-none tw-cursor-pointer tw-transition-colors ${
                      typeFilter === t.value ? "tw-bg-[#712CB0] tw-text-white" : "tw-bg-transparent tw-text-white/50 hover:tw-text-white"
                    }`}
                  >
                    {t.icon && <FontAwesomeIcon icon={t.icon} className="tw-text-[10px]" />}
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Status tabs */}
              <div className="tw-flex tw-flex-wrap tw-gap-1">
                {STATUS_TABS.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setStatusFilter(tab.value)}
                    className={`tw-px-2 tw-py-0.5 tw-rounded-full tw-text-xs tw-border-none tw-cursor-pointer tw-transition-colors ${
                      statusFilter === tab.value
                        ? "tw-bg-[#712CB0] tw-text-white"
                        : "tw-bg-white/10 tw-text-white/50 hover:tw-text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="tw-h-px tw-bg-white/10" />

            {/* Ticket list */}
            <div className="tw-flex-1 tw-overflow-y-auto">
              {loading && (
                <p className="tw-text-center tw-text-white/30 tw-text-xs tw-mt-8">Loading...</p>
              )}
              {!loading && filteredReports.length === 0 && (
                <p className="tw-text-center tw-text-white/30 tw-text-xs tw-mt-8">
                  {searchQuery.trim() ? "No tickets match your search" : "No tickets found"}
                </p>
              )}
              {filteredReports.map((r) => (
                <div key={r._id}>
                  <TicketRow
                    report={r}
                    isSelected={selected?._id === r._id}
                    onClick={() => { setSelected(r); setMobileView("detail"); }}
                  />
                  <div className="tw-h-px tw-bg-white/5" />
                </div>
              ))}
            </div>
          </div>

          {/* Right – ticket detail: hidden on mobile until a ticket is selected */}
          <div className={`tw-rounded-xl tw-bg-[#280D41] tw-border tw-border-white/10 tw-overflow-y-auto
            tw-w-full md:tw-flex-1
            ${mobileView === "detail" ? "tw-block" : "tw-hidden"} md:tw-block`}>
            {selected ? (
              <TicketDetail
                key={selected._id}
                report={selected}
                onUpdated={handleUpdated}
                onDeleted={handleDeleted}
                onBack={() => setMobileView("list")}
              />
            ) : (
              <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-full tw-gap-3 tw-text-white/20">
                <FontAwesomeIcon icon={faFlag} className="tw-text-4xl" />
                <p className="tw-text-sm">Select a ticket to view details</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
