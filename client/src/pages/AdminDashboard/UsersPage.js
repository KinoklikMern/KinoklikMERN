/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Dashboard/Sidebar";
import TopToolBar from "../../components/AdminDashboard/TopToolBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft, faFloppyDisk, faPen, faTrash,
  faUser, faEnvelope, faPhone, faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import http from "../../http-common";
import { useTranslation } from "react-i18next";

// ── Role badge ─────────────────────────────────────────────────────────────

const ROLE_COLORS = {
  Admin:           "tw-bg-purple-500/20 tw-text-purple-300 tw-border-purple-500/30",
  Filmmaker:       "tw-bg-blue-500/20 tw-text-blue-300 tw-border-blue-500/30",
  FILM_MAKER:      "tw-bg-blue-500/20 tw-text-blue-300 tw-border-blue-500/30",
  Actor:           "tw-bg-green-500/20 tw-text-green-300 tw-border-green-500/30",
  Director:        "tw-bg-teal-500/20 tw-text-teal-300 tw-border-teal-500/30",
  Editor:          "tw-bg-orange-500/20 tw-text-orange-300 tw-border-orange-500/30",
  Producer:        "tw-bg-yellow-500/20 tw-text-yellow-300 tw-border-yellow-500/30",
  "Sales Agent":   "tw-bg-pink-500/20 tw-text-pink-300 tw-border-pink-500/30",
  Sales_Agent:     "tw-bg-pink-500/20 tw-text-pink-300 tw-border-pink-500/30",
  Distributor:     "tw-bg-indigo-500/20 tw-text-indigo-300 tw-border-indigo-500/30",
  "Film Festival": "tw-bg-red-500/20 tw-text-red-300 tw-border-red-500/30",
  Viewer:          "tw-bg-gray-500/20 tw-text-gray-300 tw-border-gray-500/30",
  Investor:        "tw-bg-emerald-500/20 tw-text-emerald-300 tw-border-emerald-500/30",
  Cinematographer: "tw-bg-cyan-500/20 tw-text-cyan-300 tw-border-cyan-500/30",
  Sound:           "tw-bg-violet-500/20 tw-text-violet-300 tw-border-violet-500/30",
  Writer:          "tw-bg-rose-500/20 tw-text-rose-300 tw-border-rose-500/30",
};

const RoleBadge = ({ role }) => {
  const colors = ROLE_COLORS[role] || "tw-bg-gray-500/20 tw-text-gray-300 tw-border-gray-500/30";
  const label = role?.includes("_") ? role.replace(/_/g, " ") : role;
  return (
    <span className={`tw-inline-flex tw-items-center tw-rounded-full tw-border tw-px-2 tw-py-0.5 tw-text-xs tw-font-medium ${colors}`}>
      {label}
    </span>
  );
};

// ── Helpers ────────────────────────────────────────────────────────────────

const imgSrc = (picture) => {
  if (!picture) return "";
  return picture.includes("https") ? picture : `${process.env.REACT_APP_AWS_URL}/${picture}`;
};

export default function UsersPage() {
  const { t } = useTranslation();
  const { user } = useSelector((user) => ({ ...user }));
  const [actionStatus, setActionStatus] = useState(0);
  const dropdownRef = useRef(null);
  const [userInfo, setUserInfo] = useState();
  const [epkInfo, setEpkInfo] = useState();
  const [userFilterInfo, setUserFilterInfo] = useState();
  const [item, setItem] = useState();
  const [epks, setEpks] = useState([]);
  const [mobileView, setMobileView] = useState("list");

  // ── Dropdown (role selector) ─────────────────────────────────────────────
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    t("Filmmaker"), t("Sales Agent"), t("Distributor"), t("Film Festival"),
    t("Viewer"), t("Investor"), t("Actor"), t("Director"), t("Editor"),
    t("Producer"), t("Cinematographer"), t("Sound"), t("Writer"), t("Admin"),
  ];

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setItem({ ...item, role: option });
    setIsOpen(false);
  };

  // ── Navigation ───────────────────────────────────────────────────────────
  const handleBackClick = () => {
    setActionStatus(0);
    setItem(null);
    setMobileView("list");
  };

  const handleViewClick = (u) => {
    setItem(u);
    setActionStatus(1);
    setMobileView("detail");
  };

  const handleEditClick = (u) => {
    setItem(u);
    setActionStatus(2);
    setMobileView("detail");
  };

  // ── Save ─────────────────────────────────────────────────────────────────
  const handleSaveClick = () => {
    const currentUser = userInfo.find((u) => u._id === item._id);

    if (
      item.firstName === currentUser.firstName &&
      item.lastName === currentUser.lastName &&
      item.role === currentUser.role &&
      item.phone === currentUser.phone &&
      item.email === currentUser.email &&
      item.picture === currentUser.picture
    ) {
      setActionStatus(1);
      return;
    }

    if (item.firstName === "" || !/^[a-zA-Z0-9]+$/.test(item.firstName)) {
      alert("Please enter valid first name");
      return;
    }
    if (item.lastName === "" || !/^[a-zA-Z0-9]+$/.test(item.lastName)) {
      alert("Please enter valid last name");
      return;
    }
    if (item.role === "Admin") {
      const confirmed = window.confirm("Are you sure you want to set this user as an administrator?");
      if (!confirmed) {
        setItem({ ...item, role: currentUser.role });
        return;
      }
    }
    if (item.phone !== "" && !/^\d{10}$/.test(item.phone)) {
      alert("Phone number must be 10 digits!");
      return;
    }
    if (item.email === "") {
      alert("Please enter email");
      return;
    }

    http
      .put(`${process.env.REACT_APP_BACKEND_URL}/users/updateProfile/${item._id}`, item)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          const userIndex = userInfo.findIndex((u) => u._id === item._id);
          if (userIndex !== -1) {
            const updated = [...userInfo];
            updated[userIndex] = item;
            setUserInfo(updated);
          }
          setUserFilterInfo((prev) => {
            const idx = prev.findIndex((u) => u._id === item._id);
            if (idx !== -1) {
              const updated = [...prev];
              updated[idx] = item;
              return updated;
            }
            return prev;
          });
          alert("Changes saved successfully!");
        } else {
          alert("Request was not successful. Status code: " + res.status);
        }
        setActionStatus(1);
      })
      .catch((err) => alert("Error: " + err));
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDeleteClick = (u) => {
    if (!window.confirm("Are you sure you want to delete this user's account?")) {
      alert("Delete operation canceled");
      return;
    }
    http
      .delete(`${process.env.REACT_APP_BACKEND_URL}/users/deleteAccount/${u._id}`)
      .then((res) => {
        alert(res.data.message);
        window.location.reload();
      })
      .catch((err) => alert("Error: " + err));
  };

  // ── Avatar upload ─────────────────────────────────────────────────────────
  async function fileSelected(event) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    if (!["image/png", "image/jpg", "image/jpeg"].includes(file.type)) {
      alert("File must be an image (jpeg or png)");
      return;
    }
    try {
      const res = await http.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/uploadUserAvatar`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (res.data?.key) setItem({ ...item, picture: res.data.key });
    } catch (e) {
      console.error(e);
    }
  }

  // ── Dropdown outside click ────────────────────────────────────────────────
  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleDocumentClick);
    return () => document.removeEventListener("mousedown", handleDocumentClick);
  }, []);

  // ── Data fetch ────────────────────────────────────────────────────────────
  useEffect(() => {
    Promise.all([http.get("/fepks/"), http.get("/users/getallusers")])
      .then(([fepkRes, usersRes]) => {
        setUserInfo(usersRes.data);
        setEpkInfo(fepkRes.data);
        setUserFilterInfo(usersRes.data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // ── Related EPKs ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!epkInfo || !item) return;
    const related = [];
    Promise.all(
      epkInfo.map((epk) =>
        http.get(`/fepks/${epk._id}`).then((res) => {
          const data = res.data;
          if (item.role === "Actor" && data.actors?.some((a) => a?._id === item._id)) {
            related.push(data);
          } else if (item.role === "Filmmaker" && data.film_maker?.firstName === item.firstName && data.film_maker?.lastName === item.lastName) {
            related.push(data);
          } else {
            data.crew?.forEach((crew) => {
              const [fn, ln] = (crew.crewId?.name || "").split(" ");
              if (fn === item.firstName && ln === item.lastName && !related.includes(data)) {
                related.push(data);
              }
            });
          }
          setEpks([...related]);
        })
      )
    );
  }, [item, epkInfo]);

  // ── Last active helper ────────────────────────────────────────────────────
  const activeString = (u) => {
    if (!u.lastActive) return "";
    const last = new Date(u.lastActive);
    const now = new Date();
    if (last.toDateString() === now.toDateString()) return "Today";
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (last.toDateString() === yesterday.toDateString()) return "Yesterday";
    const diffDays = Math.round((now - last) / 86400000);
    return `${diffDays} days ago`;
  };

  const visibleUsers = userFilterInfo?.filter((u) => !u.deleted) || [];

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="tw-flex tw-h-[calc(100vh-5rem)] tw-overflow-hidden tw-bg-[#1E0039]">
      <div className="tw-flex tw-flex-1 tw-overflow-hidden tw-pt-3 tw-pb-4 tw-px-3 tw-gap-3">
        <Sidebar role={user.role} />

        <div className="tw-flex tw-flex-1 tw-flex-col tw-min-w-0 tw-overflow-hidden">
          <TopToolBar selectedTab="Users" setFilteredData={setUserFilterInfo} dataInfo={userInfo} />

          <div className="tw-flex tw-flex-1 tw-min-h-0 tw-overflow-hidden tw-gap-3">

            {/* ── Left panel: user list ── */}
            <div className={`
              tw-flex-col tw-w-full md:tw-w-72 tw-flex-shrink-0
              tw-bg-[#280D41] tw-rounded-xl tw-border tw-border-white/10 tw-overflow-hidden
              ${mobileView === "list" ? "tw-flex" : "tw-hidden md:tw-flex"}
            `}>
              <div className="tw-px-4 tw-py-3 tw-border-b tw-border-white/10 tw-flex-shrink-0">
                <p className="tw-text-white/50 tw-text-xs tw-uppercase tw-tracking-wider tw-font-semibold">
                  {visibleUsers.length} {visibleUsers.length === 1 ? "User" : "Users"}
                </p>
              </div>

              <div className="tw-flex-1 tw-overflow-y-auto">
                {!userFilterInfo ? (
                  <div className="tw-flex tw-items-center tw-justify-center tw-h-32">
                    <p className="tw-text-white/40 tw-text-sm">Loading...</p>
                  </div>
                ) : visibleUsers.length === 0 ? (
                  <div className="tw-flex tw-items-center tw-justify-center tw-h-32">
                    <p className="tw-text-white/40 tw-text-sm">No users found</p>
                  </div>
                ) : (
                  visibleUsers.map((u) => (
                    <div
                      key={u._id}
                      onClick={() => handleViewClick(u)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && handleViewClick(u)}
                      className={`
                        tw-w-full tw-flex tw-items-center tw-gap-3 tw-px-4 tw-py-3 tw-cursor-pointer
                        tw-transition-colors tw-border-b tw-border-white/5
                        ${item?._id === u._id ? "tw-bg-[#712CB0]" : "tw-bg-[#280D41] hover:tw-bg-[#3a1a60]"}
                      `}
                    >
                      <div className="tw-h-10 tw-w-10 tw-flex-shrink-0 tw-rounded-full tw-overflow-hidden tw-bg-white/10">
                        {u.picture && (
                          <img src={imgSrc(u.picture)} alt="" className="tw-h-full tw-w-full tw-object-cover" />
                        )}
                      </div>
                      <div className="tw-flex-1 tw-min-w-0">
                        <p className="tw-text-white tw-text-sm tw-font-medium tw-truncate">
                          {u.firstName} {u.lastName}
                        </p>
                        <div className="tw-mt-0.5">
                          <RoleBadge role={u.role} />
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <div className="tw-h-20 md:tw-h-0" />
              </div>
            </div>

            {/* ── Right panel: detail / edit ── */}
            {item ? (
              <div className={`
                tw-flex-col tw-flex-1 tw-min-w-0
                tw-bg-[#280D41] tw-rounded-xl tw-border tw-border-white/10 tw-overflow-hidden
                ${mobileView === "detail" ? "tw-flex" : "tw-hidden md:tw-flex"}
              `}>

                {/* Sticky header */}
                <div className="tw-sticky tw-top-0 tw-z-10 tw-flex-shrink-0 tw-bg-[#280D41] tw-border-b tw-border-white/10 tw-px-4 tw-py-3 tw-flex tw-items-center tw-justify-between">
                  <div className="tw-flex tw-items-center tw-gap-3">
                    <button
                      onClick={handleBackClick}
                      className="md:tw-hidden tw-text-white/60 hover:tw-text-white tw-transition-colors tw-p-1"
                    >
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <div>
                      <p className="tw-text-white tw-font-semibold tw-leading-tight">
                        {item.firstName} {item.lastName}
                      </p>
                      <div className="tw-mt-0.5">
                        <RoleBadge role={item.role} />
                      </div>
                    </div>
                  </div>

                  <div className="tw-flex tw-items-center tw-gap-2">
                    {actionStatus === 1 && (
                      <>
                        <button
                          onClick={() => handleEditClick(item)}
                          className="tw-flex tw-items-center tw-gap-1.5 tw-bg-white/10 hover:tw-bg-white/20 tw-text-white tw-text-xs tw-px-3 tw-py-1.5 tw-rounded-lg tw-transition-colors"
                        >
                          <FontAwesomeIcon icon={faPen} className="tw-text-[10px]" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item)}
                          className="tw-flex tw-items-center tw-gap-1.5 tw-bg-red-500/20 hover:tw-bg-red-500/40 tw-text-red-300 tw-text-xs tw-px-3 tw-py-1.5 tw-rounded-lg tw-transition-colors"
                        >
                          <FontAwesomeIcon icon={faTrash} className="tw-text-[10px]" />
                          <span>Delete</span>
                        </button>
                      </>
                    )}
                    {actionStatus === 2 && (
                      <>
                        <button
                          onClick={handleSaveClick}
                          className="tw-flex tw-items-center tw-gap-1.5 tw-bg-[#712CB0] hover:tw-bg-[#5a1f99] tw-text-white tw-text-xs tw-px-3 tw-py-1.5 tw-rounded-lg tw-transition-colors"
                        >
                          <FontAwesomeIcon icon={faFloppyDisk} className="tw-text-[10px]" />
                          <span>Save</span>
                        </button>
                        <button
                          onClick={() => setActionStatus(1)}
                          className="tw-flex tw-items-center tw-gap-1.5 tw-bg-white/10 hover:tw-bg-white/20 tw-text-white tw-text-xs tw-px-3 tw-py-1.5 tw-rounded-lg tw-transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item)}
                          className="tw-flex tw-items-center tw-gap-1.5 tw-bg-red-500/20 hover:tw-bg-red-500/40 tw-text-red-300 tw-text-xs tw-px-3 tw-py-1.5 tw-rounded-lg tw-transition-colors"
                        >
                          <FontAwesomeIcon icon={faTrash} className="tw-text-[10px]" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Scrollable body */}
                <div className="tw-flex-1 tw-overflow-y-auto tw-p-4 tw-space-y-3">

                  {/* Profile card */}
                  <div className="tw-bg-[#1E0039] tw-border tw-border-white/15 tw-rounded-xl tw-p-4 tw-flex tw-items-center tw-gap-4">
                    <div className="tw-relative tw-h-20 tw-w-20 tw-flex-shrink-0 tw-rounded-full tw-overflow-hidden tw-bg-white/10">
                      {actionStatus === 2 ? (
                        <>
                          <label htmlFor="profileImageUpload" className="tw-cursor-pointer tw-block tw-h-full tw-w-full tw-relative">
                            {item.picture && (
                              <img src={imgSrc(item.picture)} alt="" className="tw-h-full tw-w-full tw-object-cover" />
                            )}
                            <div className="tw-absolute tw-inset-0 tw-bg-black/60 tw-flex tw-items-center tw-justify-center tw-opacity-0 hover:tw-opacity-100 tw-transition-opacity tw-rounded-full">
                              <FontAwesomeIcon icon={faPen} className="tw-text-white tw-text-sm" />
                            </div>
                          </label>
                          <input id="profileImageUpload" type="file" onChange={fileSelected} accept="image/*" className="tw-hidden" />
                        </>
                      ) : (
                        item.picture && <img src={imgSrc(item.picture)} alt="" className="tw-h-full tw-w-full tw-object-cover" />
                      )}
                    </div>

                    <div className="tw-flex-1 tw-min-w-0">
                      {actionStatus === 2 ? (
                        <div className="tw-flex tw-gap-2 tw-flex-wrap">
                          <input
                            type="text"
                            value={item.firstName}
                            onChange={(e) => setItem({ ...item, firstName: e.target.value })}
                            placeholder="First Name"
                            className="tw-bg-white/10 tw-border tw-border-white/20 tw-rounded-lg tw-px-3 tw-py-1.5 tw-text-white tw-text-sm tw-w-28 focus:tw-outline-none focus:tw-border-[#712CB0]"
                          />
                          <input
                            type="text"
                            value={item.lastName}
                            onChange={(e) => setItem({ ...item, lastName: e.target.value })}
                            placeholder="Last Name"
                            className="tw-bg-white/10 tw-border tw-border-white/20 tw-rounded-lg tw-px-3 tw-py-1.5 tw-text-white tw-text-sm tw-w-28 focus:tw-outline-none focus:tw-border-[#712CB0]"
                          />
                        </div>
                      ) : (
                        <p className="tw-text-white tw-text-xl tw-font-bold tw-truncate">
                          {item.firstName} {item.lastName}
                        </p>
                      )}
                      {activeString(item) && (
                        <p className="tw-text-white/40 tw-text-xs tw-mt-1">
                          Last active: {activeString(item)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Contact section */}
                  <div className="tw-bg-[#1E0039] tw-border tw-border-white/15 tw-rounded-xl tw-p-4">
                    <p className="tw-text-white/50 tw-text-xs tw-uppercase tw-tracking-wider tw-font-semibold tw-mb-3">Contact</p>

                    {actionStatus === 2 ? (
                      <div className="tw-space-y-3">
                        <div>
                          <label className="tw-text-white/50 tw-text-xs tw-mb-1.5 tw-block">Email</label>
                          <input
                            type="text"
                            value={item.email}
                            onChange={(e) => setItem({ ...item, email: e.target.value })}
                            className="tw-w-full tw-bg-white/10 tw-border tw-border-white/20 tw-rounded-lg tw-px-3 tw-py-2 tw-text-white tw-text-sm focus:tw-outline-none focus:tw-border-[#712CB0]"
                          />
                        </div>
                        <div>
                          <label className="tw-text-white/50 tw-text-xs tw-mb-1.5 tw-block">Phone</label>
                          <input
                            type="text"
                            value={item.phone || ""}
                            onChange={(e) => setItem({ ...item, phone: e.target.value })}
                            placeholder="10-digit phone number"
                            className="tw-w-full tw-bg-white/10 tw-border tw-border-white/20 tw-rounded-lg tw-px-3 tw-py-2 tw-text-white tw-text-sm focus:tw-outline-none focus:tw-border-[#712CB0] placeholder:tw-text-white/30"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="tw-space-y-2.5">
                        <div className="tw-flex tw-items-center tw-gap-3">
                          <FontAwesomeIcon icon={faEnvelope} className="tw-text-white/40 tw-w-4 tw-flex-shrink-0" />
                          <p className="tw-text-white tw-text-sm tw-break-all">{item.email}</p>
                        </div>
                        {item.phone && (
                          <div className="tw-flex tw-items-center tw-gap-3">
                            <FontAwesomeIcon icon={faPhone} className="tw-text-white/40 tw-w-4 tw-flex-shrink-0" />
                            <p className="tw-text-white tw-text-sm">{item.phone}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Role section (edit only) */}
                  {actionStatus === 2 && (
                    <div className="tw-bg-[#1E0039] tw-border tw-border-white/15 tw-rounded-xl tw-p-4">
                      <p className="tw-text-white/50 tw-text-xs tw-uppercase tw-tracking-wider tw-font-semibold tw-mb-3">Role</p>
                      <div ref={dropdownRef} className="tw-relative">
                        <button
                          onClick={handleToggle}
                          type="button"
                          className="tw-w-full tw-flex tw-items-center tw-justify-between tw-bg-white/10 tw-border tw-border-white/20 tw-rounded-lg tw-px-3 tw-py-2 tw-text-white tw-text-sm focus:tw-outline-none focus:tw-border-[#712CB0]"
                        >
                          <span>{item.role?.includes("_") ? item.role.replace(/_/g, " ") : item.role}</span>
                          <FontAwesomeIcon icon={faChevronDown} className="tw-text-white/40 tw-text-xs" />
                        </button>
                        {isOpen && (
                          <ul className="tw-absolute tw-left-0 tw-right-0 tw-z-50 tw-mt-1 tw-max-h-56 tw-overflow-y-auto tw-bg-[#190033] tw-border tw-border-white/20 tw-rounded-lg tw-shadow-2xl">
                            {options.map((option, i) => (
                              <li
                                key={i}
                                onClick={() => handleSelect(option)}
                                className="tw-px-3 tw-py-2 tw-text-sm tw-text-white hover:tw-bg-[#712CB0] tw-cursor-pointer tw-transition-colors tw-border-b tw-border-white/5 last:tw-border-0"
                              >
                                {option}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Related EPKs */}
                  {epks.length > 0 && (
                    <div className="tw-bg-[#1E0039] tw-border tw-border-white/15 tw-rounded-xl tw-p-4">
                      <p className="tw-text-white/50 tw-text-xs tw-uppercase tw-tracking-wider tw-font-semibold tw-mb-3">
                        Related EPKs ({epks.length})
                      </p>
                      <div className="tw-grid tw-grid-cols-3 sm:tw-grid-cols-4 md:tw-grid-cols-3 lg:tw-grid-cols-4 xl:tw-grid-cols-5 tw-gap-2">
                        {epks.map((epk, i) => (
                          <Link
                            key={i}
                            to={`/epk/${epk.title?.replace(/ /g, "-").trim()}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="tw-group tw-block"
                          >
                            <div className="tw-aspect-[2/3] tw-overflow-hidden tw-rounded-lg tw-bg-white/10 group-hover:tw-opacity-80 tw-transition-opacity">
                              {epk.image_details && (
                                <img
                                  src={epk.image_details.includes("https") ? epk.image_details : `${process.env.REACT_APP_AWS_URL}/${epk.image_details}`}
                                  className="tw-h-full tw-w-full tw-object-cover"
                                  alt={epk.title || "EPK"}
                                />
                              )}
                            </div>
                            <p className="tw-text-white/50 tw-text-xs tw-truncate tw-mt-1">{epk.title}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="tw-h-24 md:tw-h-4" />
                </div>
              </div>
            ) : (
              /* Empty state on desktop */
              <div className="tw-hidden md:tw-flex tw-flex-1 tw-items-center tw-justify-center tw-bg-[#280D41] tw-rounded-xl tw-border tw-border-white/10">
                <div className="tw-text-center">
                  <div className="tw-h-16 tw-w-16 tw-rounded-full tw-bg-white/5 tw-flex tw-items-center tw-justify-center tw-mx-auto tw-mb-3">
                    <FontAwesomeIcon icon={faUser} className="tw-text-white/20 tw-text-2xl" />
                  </div>
                  <p className="tw-text-white/30 tw-text-sm">Select a user to view details</p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
