import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faImage } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { uploadReportScreenshot, submitUserReport } from "../../../api/userReports";

const MAX_SCREENSHOTS = 3;

export default function UserReportModal({ onClose }) {
  const [type, setType] = useState("bug");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const incoming = Array.from(e.target.files).slice(0, MAX_SCREENSHOTS - selectedFiles.length);
    const newFiles = [...selectedFiles, ...incoming].slice(0, MAX_SCREENSHOTS);
    const newPreviews = newFiles.map((f, i) =>
      previews[i] && selectedFiles[i] === f ? previews[i] : URL.createObjectURL(f)
    );
    setSelectedFiles(newFiles);
    setPreviews(newPreviews);
    e.target.value = "";
  };

  const removeFile = (index) => {
    URL.revokeObjectURL(previews[index]);
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const token = JSON.parse(Cookies.get("user") || "null")?.token;

    setLoading(true);
    try {
      let screenshotUrls = [];
      if (selectedFiles.length > 0) {
        const keys = await Promise.all(selectedFiles.map((file) => uploadReportScreenshot(file, token)));
        screenshotUrls = keys.map((key) => `${process.env.REACT_APP_AWS_URL}/${key}`);
      }

      await submitUserReport(
        {
          type,
          title: title.trim(),
          description: description.trim(),
          pageUrl: window.location.pathname,
          screenshots: screenshotUrls,
        },
        token
      );
      toast.success("Thank you! Your report has been submitted.");
      onClose();
    } catch {
      toast.error("Could not submit your report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isValid = title.trim().length > 0 && description.trim().length > 0;

  return (
    <div className="tw-fixed tw-inset-0 tw-z-[9999] tw-flex tw-items-center tw-justify-center tw-bg-[#190033]/90 tw-backdrop-blur-md tw-p-4">
      <div className="tw-relative tw-w-full tw-max-w-md tw-bg-[#280D41] tw-border tw-border-[#5A3F49]/30 tw-rounded-2xl tw-p-6 tw-shadow-2xl">

        <button
          onClick={onClose}
          className="tw-absolute tw-top-4 tw-right-4 tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center tw-bg-black/20 hover:tw-bg-[#FF43A7] tw-text-white tw-rounded-full tw-transition-colors tw-border-none tw-cursor-pointer"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <h2 className="tw-text-white tw-text-xl tw-font-bold tw-mb-1 tw-text-center">
          Report / Feedback
        </h2>
        <p className="tw-text-[#AA8894] tw-text-sm tw-text-center tw-mb-6">
          Help us improve by reporting a bug or suggesting a feature.
        </p>

        {/* Type toggle */}
        <div className="tw-flex tw-rounded-xl tw-overflow-hidden tw-border tw-border-[#5A3F49]/40 tw-mb-5">
          <button
            onClick={() => setType("bug")}
            className={`tw-flex-1 tw-py-2 tw-text-sm tw-font-semibold tw-transition-all tw-border-none tw-cursor-pointer ${
              type === "bug"
                ? "tw-bg-[#FF43A7] tw-text-white"
                : "tw-bg-transparent tw-text-[#AA8894] hover:tw-text-white"
            }`}
          >
            Bug Report
          </button>
          <button
            onClick={() => setType("feature_request")}
            className={`tw-flex-1 tw-py-2 tw-text-sm tw-font-semibold tw-transition-all tw-border-none tw-cursor-pointer ${
              type === "feature_request"
                ? "tw-bg-[#FF43A7] tw-text-white"
                : "tw-bg-transparent tw-text-[#AA8894] hover:tw-text-white"
            }`}
          >
            Feature Request
          </button>
        </div>

        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={
            type === "bug"
              ? "Briefly describe the bug..."
              : "What would you like to see?"
          }
          maxLength={120}
          className="tw-w-full tw-bg-[#190033] tw-border tw-border-[#5A3F49]/40 tw-rounded-xl tw-p-3 tw-text-white tw-text-sm tw-outline-none focus:tw-border-[#FF43A7] tw-mb-4 placeholder:tw-text-[#AA8894]/60"
        />

        {/* Description */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={
            type === "bug"
              ? "Steps to reproduce, what happened, what you expected..."
              : "Describe your idea in detail..."
          }
          maxLength={3000}
          className="tw-w-full tw-h-32 tw-bg-[#190033] tw-border tw-border-[#5A3F49]/40 tw-rounded-xl tw-p-4 tw-text-white tw-text-sm tw-outline-none focus:tw-border-[#FF43A7] tw-resize-none placeholder:tw-text-[#AA8894]/60 tw-mb-4"
        />

        {/* Screenshots */}
        <div className="tw-mb-5">
          <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
            <span className="tw-text-[#AA8894] tw-text-xs">
              Screenshots{" "}
              <span className="tw-text-[#AA8894]/50">
                (optional, max {MAX_SCREENSHOTS})
              </span>
            </span>
            {selectedFiles.length < MAX_SCREENSHOTS && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="tw-flex tw-items-center tw-gap-1 tw-text-xs tw-text-[#FF43A7] hover:tw-text-[#ff5cac] tw-bg-transparent tw-border-none tw-cursor-pointer tw-transition-colors"
              >
                <FontAwesomeIcon icon={faImage} />
                Add image
              </button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="tw-hidden"
          />

          {previews.length > 0 ? (
            <div className="tw-flex tw-gap-2">
              {previews.map((src, i) => (
                <div key={i} className="tw-relative tw-group tw-w-20 tw-h-20">
                  <img
                    src={src}
                    alt={`screenshot ${i + 1}`}
                    className="tw-w-full tw-h-full tw-object-cover tw-rounded-lg tw-border tw-border-[#5A3F49]/40"
                  />
                  <button
                    onClick={() => removeFile(i)}
                    className="tw-absolute tw-top-1 tw-right-1 tw-w-5 tw-h-5 tw-flex tw-items-center tw-justify-center tw-bg-black/60 hover:tw-bg-[#FF43A7] tw-text-white tw-rounded-full tw-border-none tw-cursor-pointer tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity tw-text-xs"
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="tw-w-full tw-py-3 tw-border tw-border-dashed tw-border-[#5A3F49]/40 tw-rounded-xl tw-text-[#AA8894]/50 tw-text-xs tw-bg-transparent tw-cursor-pointer hover:tw-border-[#FF43A7]/40 hover:tw-text-[#AA8894] tw-transition-colors"
            >
              Click to attach screenshots
            </button>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !isValid}
          className="tw-w-full tw-bg-[#FF43A7] hover:tw-bg-[#ff5cac] tw-text-[#570033] tw-font-bold tw-py-3 tw-rounded-xl tw-shadow-[0_0_15px_rgba(255,67,167,0.4)] tw-transition-all tw-border-none tw-cursor-pointer disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
        >
          {loading ? "Uploading & submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
