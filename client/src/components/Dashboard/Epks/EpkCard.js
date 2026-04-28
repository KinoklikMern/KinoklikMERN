import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faStar,
  faShareNodes,
  faPlus,
  faEllipsisVertical,
  faPen,
  faUsers,
  faArrowRightArrowLeft,
  faTrash,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import http from "../../../http-common";
import emptyBanner from "../../../images/empty_banner.jpeg";
import CollaboratorModal from "./CollaboratorModal";

// Dark dropdown — desktop

function DesktopDropdown({ epkId, isTransferred, onClose, onCollab, onTransfer, onDelete }) {
  return (
    <div className="tw-absolute tw-right-0 tw-top-10 tw-w-52 tw-rounded-xl tw-bg-[#1E0039] tw-shadow-2xl tw-py-1.5 tw-z-50 tw-border tw-border-white/10">
      <Link
        to={`/epk/${epkId}?edit=true`}
        className="tw-flex tw-items-center tw-gap-3 tw-px-4 tw-py-2.5 tw-text-sm tw-text-white/90 hover:tw-bg-white/10 tw-no-underline tw-transition-colors"
        onClick={onClose}
      >
        <FontAwesomeIcon icon={faPen} className="tw-w-4 tw-text-white/50" />
        Edit EPK
      </Link>

      <div className="tw-my-1 tw-border-t tw-border-white/10" />

      <button
        onClick={() => { onClose(); onCollab(); }}
        className="tw-flex tw-w-full tw-items-center tw-gap-3 tw-px-4 tw-py-2.5 tw-text-sm tw-text-white/90 hover:tw-bg-white/10 tw-bg-transparent tw-border-none tw-text-left tw-transition-colors"
      >
        <FontAwesomeIcon icon={faUsers} className="tw-w-4 tw-text-white/50" />
        Manage Collaborators
      </button>

      <button
        onClick={() => { onClose(); onTransfer(); }}
        disabled={isTransferred}
        className="tw-flex tw-w-full tw-items-center tw-gap-3 tw-px-4 tw-py-2.5 tw-text-sm tw-text-white/90 hover:tw-bg-white/10 tw-bg-transparent tw-border-none tw-text-left tw-transition-colors disabled:tw-opacity-40 disabled:tw-cursor-not-allowed"
      >
        <FontAwesomeIcon icon={faArrowRightArrowLeft} className="tw-w-4 tw-text-white/50" />
        {isTransferred ? "Already Transferred" : "Transfer Ownership"}
      </button>

      <div className="tw-my-1 tw-border-t tw-border-white/10" />

      <button
        onClick={() => { onClose(); onDelete(); }}
        className="tw-flex tw-w-full tw-items-center tw-gap-3 tw-px-4 tw-py-2.5 tw-text-sm tw-text-red-400 hover:tw-bg-white/10 tw-bg-transparent tw-border-none tw-text-left tw-transition-colors"
      >
        <FontAwesomeIcon icon={faTrash} className="tw-w-4" />
        Delete EPK
      </button>
    </div>
  );
}

// Bottom sheet — mobile
function MobileBottomSheet({ epkId, isTransferred, title, onClose, onCollab, onTransfer, onDelete }) {
  return (
    <div className="tw-fixed tw-inset-0 tw-z-50 md:tw-hidden" onClick={onClose}>
      {/* backdrop */}
      <div className="tw-absolute tw-inset-0 tw-bg-black/50" />
      {/* sheet */}
      <div
        className="tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-bg-[#1E0039] tw-rounded-t-2xl tw-pb-8 tw-pt-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* drag handle */}
        <div className="tw-mx-auto tw-mb-4 tw-h-1 tw-w-10 tw-rounded-full tw-bg-white/20" />

        {/* EPK title */}
        <p className="tw-px-6 tw-pb-3 tw-text-xs tw-font-semibold tw-uppercase tw-tracking-widest tw-text-white/40">
          {title || "EPK"}
        </p>

        <div className="tw-border-t tw-border-white/10">
          <Link
            to={`/epk/${epkId}?edit=true`}
            className="tw-flex tw-items-center tw-gap-4 tw-px-6 tw-py-4 tw-text-base tw-text-white hover:tw-bg-white/5 tw-no-underline tw-transition-colors"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faPen} className="tw-w-5 tw-text-white/50" />
            Edit EPK
          </Link>

          <button
            onClick={() => { onClose(); onCollab(); }}
            className="tw-flex tw-w-full tw-items-center tw-gap-4 tw-px-6 tw-py-4 tw-text-base tw-text-white hover:tw-bg-white/5 tw-bg-transparent tw-border-none tw-text-left tw-transition-colors"
          >
            <FontAwesomeIcon icon={faUsers} className="tw-w-5 tw-text-white/50" />
            Manage Collaborators
          </button>

          <button
            onClick={() => { onClose(); onTransfer(); }}
            disabled={isTransferred}
            className="tw-flex tw-w-full tw-items-center tw-gap-4 tw-px-6 tw-py-4 tw-text-base tw-text-white hover:tw-bg-white/5 tw-bg-transparent tw-border-none tw-text-left tw-transition-colors disabled:tw-opacity-40"
          >
            <FontAwesomeIcon icon={faArrowRightArrowLeft} className="tw-w-5 tw-text-white/50" />
            {isTransferred ? "Already Transferred" : "Transfer Ownership"}
          </button>

          <div className="tw-mx-6 tw-border-t tw-border-white/10" />

          <button
            onClick={() => { onClose(); onDelete(); }}
            className="tw-flex tw-w-full tw-items-center tw-gap-4 tw-px-6 tw-py-4 tw-text-base tw-text-red-400 hover:tw-bg-white/5 tw-bg-transparent tw-border-none tw-text-left tw-transition-colors"
          >
            <FontAwesomeIcon icon={faTrash} className="tw-w-5" />
            Delete EPK
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EpkCard({ EpkInfo: epkInfo, onDelete }) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const isOwner =
    user?.id === epkInfo.film_maker?._id || user?.id === epkInfo.film_maker;

  const BANNER_IMG =
    !epkInfo.banner_url
      ? emptyBanner
      : `${process.env.REACT_APP_AWS_URL}/${epkInfo.banner_url}`;

  // ── Menu state ──────────────────────────────────────────────────────────────
  const [menuOpen, setMenuOpen] = useState(false);
  const desktopMenuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      // On mobile the bottom sheet's backdrop handles closing
      if (window.innerWidth < 768) return;
      if (desktopMenuRef.current && !desktopMenuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  // ── Collaborator modal ───────────────────────────────────────────────────────
  const [showCollabModal, setShowCollabModal] = useState(false);

  // ── Transfer state ───────────────────────────────────────────────────────────
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showTransferConfirm, setShowTransferConfirm] = useState(false);
  const [transferSearch, setTransferSearch] = useState("");
  const [transferResults, setTransferResults] = useState([]);
  const [selectedFilmmaker, setSelectedFilmmaker] = useState(null);
  const [transferLoading, setTransferLoading] = useState(false);
  const [isTransferred, setIsTransferred] = useState(false);

  useEffect(() => {
    const filmmakerId = epkInfo.film_maker?._id ?? epkInfo.film_maker;
    const transferredFrom = localStorage.getItem(`transferred_${epkInfo._id}`);
    setIsTransferred(transferredFrom === String(filmmakerId));
  }, [epkInfo._id, epkInfo.film_maker]);

  useEffect(() => {
    if (transferSearch.length < 3) { setTransferResults([]); return; }
    const timeout = setTimeout(() => {
      http
        .get(`/filmmaker/searchFilmmakers?name=${encodeURIComponent(transferSearch)}`)
        .then((res) => setTransferResults(res.data))
        .catch(() => {});
    }, 500);
    return () => clearTimeout(timeout);
  }, [transferSearch]);

  const handleTransfer = () => {
    if (!selectedFilmmaker || !epkInfo._id) return;
    setTransferLoading(true);
    http
      .put(`/fepks/${epkInfo._id}/transfer`, {
        newFilmmakerId: selectedFilmmaker._id,
      })
      .then(() => {
        const filmmakerId = epkInfo.film_maker?._id ?? epkInfo.film_maker;
        localStorage.setItem(`transferred_${epkInfo._id}`, String(filmmakerId));
        setIsTransferred(true);
        toast.success(`EPK transferred to ${selectedFilmmaker.firstName} ${selectedFilmmaker.lastName}!`);
        setShowTransferConfirm(false);
        setShowTransferModal(false);
      })
      .catch(() => toast.error("Failed to transfer EPK."))
      .finally(() => setTransferLoading(false));
  };

  // ── Delete state ─────────────────────────────────────────────────────────────
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteText, setDeleteText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    if (deleteText !== "Delete") return;
    setIsDeleting(true);
    http
      .delete(`/fepks/delete/${epkInfo._id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then(() => {
        toast.success("EPK successfully deleted.");
        setShowDeleteModal(false);
        if (onDelete) onDelete(epkInfo._id);
        else navigate("/dashboard/epks");
      })
      .catch(() => toast.error("Failed to delete EPK."))
      .finally(() => { setIsDeleting(false); setDeleteText(""); });
  };

  const openMenu = (e) => { e.preventDefault(); e.stopPropagation(); setMenuOpen((v) => !v); };

  const filmmakerPicUrl = (pic) =>
    pic && !pic.startsWith("http") ? `${process.env.REACT_APP_AWS_URL}/${pic}` : pic;

  return (
    <>
      <div className="tw-group tw-relative tw-flex tw-flex-col tw-rounded-xl tw-border tw-border-gray-100 tw-bg-white tw-shadow-sm hover:tw-shadow-md tw-transition-shadow tw-w-full tw-max-w-xs">

        {/* ── Banner ── */}
        <Link to={`/epk/${epkInfo._id}`} className="tw-block tw-relative tw-overflow-hidden tw-rounded-t-xl">
          <img
            src={BANNER_IMG}
            alt={epkInfo.title || "EPK"}
            className="tw-w-full tw-h-40 tw-object-cover"
          />
          {/* gradient + title overlay */}
          <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-black/70 tw-via-black/10 tw-to-transparent tw-flex tw-items-end tw-p-3">
            <p className="tw-text-white tw-font-semibold tw-text-sm tw-leading-tight tw-line-clamp-2">
              {epkInfo.title || "Untitled EPK"}
            </p>
          </div>
        </Link>

        {/* ── ··· button (both breakpoints, on banner) ── */}
        {isOwner && (
          <div ref={desktopMenuRef} className="tw-absolute tw-top-2 tw-right-2 tw-z-10">
            <button
              onClick={openMenu}
              className="tw-flex tw-h-8 tw-w-8 tw-items-center tw-justify-center tw-rounded-full tw-bg-black/40 tw-text-white hover:tw-bg-black/60 tw-backdrop-blur-sm tw-transition-colors tw-border-none"
              title="More options"
            >
              <FontAwesomeIcon icon={faEllipsisVertical} className="tw-text-sm" />
            </button>

            {/* Dark dropdown — desktop only */}
            {menuOpen && (
              <div className="tw-hidden md:tw-block">
                <DesktopDropdown
                  epkId={epkInfo._id}
                  isTransferred={isTransferred}
                  onClose={() => setMenuOpen(false)}
                  onCollab={() => setShowCollabModal(true)}
                  onTransfer={() => { setTransferSearch(""); setSelectedFilmmaker(null); setShowTransferModal(true); }}
                  onDelete={() => { setDeleteText(""); setShowDeleteModal(true); }}
                />
              </div>
            )}
          </div>
        )}

        {/* ── Stats row ── */}
        <div className="tw-flex tw-items-center tw-justify-around tw-px-4 tw-py-3 tw-border-t tw-border-gray-100">
          {[
            { icon: faDollarSign, count: epkInfo.wishes_to_donate?.length ?? 0, label: "Donations" },
            { icon: faDollarSign, count: epkInfo.wishes_to_buy?.length ?? 0, label: "Purchases" },
            { icon: faStar,       count: epkInfo.likes?.length ?? 0, label: "Likes" },
            { icon: faPlus,       count: epkInfo.favourites?.length ?? 0, label: "Saves" },
            { icon: faShareNodes, count: epkInfo.sharings?.length ?? 0, label: "Shares" },
          ].map(({ icon, count, label }) => (
            <div key={label} className="tw-flex tw-flex-col tw-items-center tw-gap-0.5" title={label}>
              <FontAwesomeIcon icon={icon} className="tw-text-[#1E0039] tw-text-base" />
              <span className="tw-text-xs tw-font-semibold tw-text-gray-600">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom sheet — mobile only ── */}
      {menuOpen && isOwner && (
        <MobileBottomSheet
          epkId={epkInfo._id}
          isTransferred={isTransferred}
          title={epkInfo.title}
          onClose={() => setMenuOpen(false)}
          onCollab={() => { setMenuOpen(false); setShowCollabModal(true); }}
          onTransfer={() => { setMenuOpen(false); setTransferSearch(""); setSelectedFilmmaker(null); setShowTransferModal(true); }}
          onDelete={() => { setMenuOpen(false); setDeleteText(""); setShowDeleteModal(true); }}
        />
      )}

      {/* ── Collaborator Modal ── */}
      {showCollabModal && (
        <CollaboratorModal epkId={epkInfo._id} onClose={() => setShowCollabModal(false)} />
      )}

      {/* ── Transfer Modal ── */}
      {showTransferModal && (
        <div className="tw-fixed tw-inset-0 tw-z-50 tw-flex tw-items-center tw-justify-center tw-bg-black/60 tw-p-4">
          <div className="tw-w-full tw-max-w-md tw-rounded-2xl tw-bg-white tw-p-6 tw-shadow-2xl">
            <div className="tw-mb-5 tw-flex tw-items-center tw-justify-between">
              <h2 className="tw-text-lg tw-font-semibold tw-text-[#1E0039]">Transfer Ownership</h2>
              <button onClick={() => setShowTransferModal(false)} className="tw-text-gray-400 hover:tw-text-gray-600 tw-bg-transparent tw-border-none tw-text-xl tw-leading-none">✕</button>
            </div>

            <p className="tw-mb-4 tw-text-sm tw-text-gray-500 tw-leading-relaxed">
              Search for the filmmaker you want to transfer this EPK to. This action is permanent and cannot be undone.
            </p>

            {/* Search */}
            <div className="tw-relative tw-mb-3">
              <FontAwesomeIcon icon={faSearch} className="tw-absolute tw-left-3 tw-top-1/2 tw--translate-y-1/2 tw-text-gray-400 tw-text-sm" />
              <input
                type="text"
                value={transferSearch}
                onChange={(e) => { setTransferSearch(e.target.value); setSelectedFilmmaker(null); }}
                placeholder="Search by name..."
                className="tw-w-full tw-rounded-lg tw-border tw-border-gray-200 tw-pl-9 tw-pr-3 tw-py-2.5 tw-text-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#1E0039]/30"
              />
            </div>

            {/* Results */}
            {!selectedFilmmaker && transferResults.length > 0 && (
              <div className="tw-mb-3 tw-max-h-48 tw-overflow-auto tw-rounded-lg tw-border tw-border-gray-100 tw-divide-y tw-divide-gray-50">
                {transferResults.map((fm) => (
                  <button
                    key={fm._id}
                    onClick={() => { setSelectedFilmmaker(fm); setTransferSearch(""); setTransferResults([]); }}
                    className="tw-flex tw-w-full tw-items-center tw-gap-3 tw-px-3 tw-py-2.5 hover:tw-bg-gray-50 tw-bg-transparent tw-border-none tw-text-left"
                  >
                    {filmmakerPicUrl(fm.picture) ? (
                      <img src={filmmakerPicUrl(fm.picture)} alt="" className="tw-h-9 tw-w-9 tw-rounded-full tw-object-cover tw-shrink-0" />
                    ) : (
                      <div className="tw-flex tw-h-9 tw-w-9 tw-items-center tw-justify-center tw-rounded-full tw-bg-gray-100 tw-shrink-0">
                        <FontAwesomeIcon icon={faUser} className="tw-text-gray-400 tw-text-xs" />
                      </div>
                    )}
                    <div>
                      <p className="tw-text-sm tw-font-medium tw-text-gray-800">{fm.firstName} {fm.lastName}</p>
                      <p className="tw-text-xs tw-text-gray-400">{fm.role}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Selected filmmaker */}
            {selectedFilmmaker && (
              <div className="tw-mb-4 tw-flex tw-items-center tw-gap-3 tw-rounded-lg tw-border tw-border-[#1E0039]/20 tw-bg-[#1E0039]/5 tw-p-3">
                {filmmakerPicUrl(selectedFilmmaker.picture) ? (
                  <img src={filmmakerPicUrl(selectedFilmmaker.picture)} alt="" className="tw-h-10 tw-w-10 tw-rounded-full tw-object-cover tw-shrink-0" />
                ) : (
                  <div className="tw-flex tw-h-10 tw-w-10 tw-items-center tw-justify-center tw-rounded-full tw-bg-gray-200 tw-shrink-0">
                    <FontAwesomeIcon icon={faUser} className="tw-text-gray-400" />
                  </div>
                )}
                <div className="tw-flex-1">
                  <p className="tw-text-sm tw-font-semibold tw-text-[#1E0039]">{selectedFilmmaker.firstName} {selectedFilmmaker.lastName}</p>
                  <p className="tw-text-xs tw-text-gray-500">{selectedFilmmaker.role}</p>
                </div>
                <button onClick={() => setSelectedFilmmaker(null)} className="tw-text-gray-400 hover:tw-text-gray-600 tw-bg-transparent tw-border-none tw-text-sm">✕</button>
              </div>
            )}

            <div className="tw-flex tw-gap-3">
              <button onClick={() => setShowTransferModal(false)} className="tw-flex-1 tw-rounded-lg tw-border tw-border-gray-200 tw-py-2.5 tw-text-sm tw-font-medium tw-text-gray-600 hover:tw-bg-gray-50 tw-bg-transparent tw-transition-colors">
                Cancel
              </button>
              <button
                onClick={() => setShowTransferConfirm(true)}
                disabled={!selectedFilmmaker}
                className="tw-flex-1 tw-rounded-lg tw-bg-[#1E0039] tw-py-2.5 tw-text-sm tw-font-medium tw-text-white hover:tw-bg-[#2d0059] tw-transition-colors disabled:tw-opacity-40 disabled:tw-cursor-not-allowed tw-border-none"
              >
                Transfer Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Transfer Confirm Modal ── */}
      {showTransferConfirm && (
        <div className="tw-fixed tw-inset-0 tw-z-[60] tw-flex tw-items-center tw-justify-center tw-bg-black/70 tw-p-4">
          <div className="tw-w-full tw-max-w-sm tw-rounded-2xl tw-bg-white tw-p-6 tw-shadow-2xl">
            <h3 className="tw-mb-3 tw-text-base tw-font-semibold tw-text-gray-800">Confirm Transfer</h3>
            <p className="tw-mb-6 tw-text-sm tw-text-gray-500 tw-leading-relaxed">
              Transferring this EPK to <strong>{selectedFilmmaker?.firstName} {selectedFilmmaker?.lastName}</strong> is permanent and cannot be reversed from your dashboard.
            </p>
            <div className="tw-flex tw-gap-3">
              <button onClick={() => setShowTransferConfirm(false)} className="tw-flex-1 tw-rounded-lg tw-border tw-border-gray-200 tw-py-2.5 tw-text-sm tw-font-medium tw-text-gray-600 hover:tw-bg-gray-50 tw-bg-transparent">
                Cancel
              </button>
              <button
                onClick={handleTransfer}
                disabled={transferLoading}
                className="tw-flex-1 tw-rounded-lg tw-bg-[#1E0039] tw-py-2.5 tw-text-sm tw-font-medium tw-text-white hover:tw-bg-[#2d0059] disabled:tw-opacity-50 tw-border-none tw-transition-colors"
              >
                {transferLoading ? "Transferring..." : "Confirm Transfer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Modal ── */}
      {showDeleteModal && (
        <div className="tw-fixed tw-inset-0 tw-z-50 tw-flex tw-items-center tw-justify-center tw-bg-black/60 tw-p-4">
          <div className="tw-w-full tw-max-w-sm tw-rounded-2xl tw-bg-white tw-p-6 tw-shadow-2xl">
            <div className="tw-mb-4 tw-flex tw-items-center tw-gap-3">
              <div className="tw-flex tw-h-10 tw-w-10 tw-items-center tw-justify-center tw-rounded-full tw-bg-red-50 tw-shrink-0">
                <FontAwesomeIcon icon={faTrash} className="tw-text-red-500" />
              </div>
              <div>
                <h3 className="tw-text-base tw-font-semibold tw-text-gray-800">Delete EPK</h3>
                <p className="tw-text-xs tw-text-gray-400">This action cannot be undone</p>
              </div>
            </div>

            <p className="tw-mb-4 tw-text-sm tw-text-gray-500 tw-leading-relaxed">
              Type <span className="tw-font-bold tw-text-red-500">Delete</span> to confirm you want to permanently remove this EPK.
            </p>

            <input
              type="text"
              value={deleteText}
              onChange={(e) => setDeleteText(e.target.value)}
              placeholder='Type "Delete" to confirm'
              className="tw-mb-5 tw-w-full tw-rounded-lg tw-border tw-border-gray-200 tw-px-3 tw-py-2.5 tw-text-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-red-400/50"
            />

            <div className="tw-flex tw-gap-3">
              <button
                onClick={() => { setShowDeleteModal(false); setDeleteText(""); }}
                className="tw-flex-1 tw-rounded-lg tw-border tw-border-gray-200 tw-py-2.5 tw-text-sm tw-font-medium tw-text-gray-600 hover:tw-bg-gray-50 tw-bg-transparent"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteText !== "Delete" || isDeleting}
                className="tw-flex-1 tw-rounded-lg tw-bg-red-500 tw-py-2.5 tw-text-sm tw-font-medium tw-text-white hover:tw-bg-red-600 disabled:tw-opacity-40 disabled:tw-cursor-not-allowed tw-border-none tw-transition-colors"
              >
                {isDeleting ? "Deleting..." : "Delete EPK"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
