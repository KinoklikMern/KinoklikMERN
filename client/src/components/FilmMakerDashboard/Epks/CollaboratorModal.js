import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import http from "../../../http-common";
import {
  listCollaborators,
  addCollaborator,
  removeCollaborator,
} from "../../../api/epks";

export default function CollaboratorModal({ epkId, onClose }) {
  const user = useSelector((state) => state.user);
  const token = user?.token;

  const [collaborators, setCollaborators] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCollaborators = async () => {
    try {
      const data = await listCollaborators(epkId, token);
      setCollaborators(data);
    } catch (err) {
      setError("Failed to load collaborators");
    }
  };

  useEffect(() => {
    fetchCollaborators();
    http.get("/users/getallusers").then((res) => setAllUsers(res.data));
  }, [epkId]);

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchValue(val);
    setSelectedUser(null);
    setError("");

    if (!val.trim()) {
      setFilteredUsers([]);
      setIsResultsVisible(false);
      return;
    }

    const collaboratorIds = collaborators.map((c) => c.user._id);
    const lower = val.toLowerCase();

    const results = allUsers.filter((u) => {
      if (collaboratorIds.includes(u._id)) return false;
      if (u._id === user.id) return false;
      const fullName = `${u.firstName || ""} ${u.lastName || ""}`.toLowerCase();
      const email = (u.email || "").toLowerCase();
      return fullName.includes(lower) || email.includes(lower);
    });

    setFilteredUsers(results);
    setIsResultsVisible(true);
  };

  const handleSelectUser = (u) => {
    setSelectedUser(u);
    setSearchValue(`${u.firstName} ${u.lastName}`);
    setFilteredUsers([]);
    setIsResultsVisible(false);
  };

  const handleAdd = async () => {
    if (!selectedUser) return;
    setError("");
    setLoading(true);
    try {
      await addCollaborator(epkId, selectedUser.email, token);
      setSearchValue("");
      setSelectedUser(null);
      fetchCollaborators();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add collaborator");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (userId) => {
    setError("");
    try {
      await removeCollaborator(epkId, userId, token);
      setCollaborators((prev) => prev.filter((c) => c.user._id !== userId));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to remove collaborator");
    }
  };

  return (
    <div className="tw-fixed tw-inset-0 tw-z-50 tw-flex tw-items-center tw-justify-center tw-bg-black tw-bg-opacity-60">
      <div className="tw-w-full tw-max-w-md tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-xl">

        {/* Header */}
        <div className="tw-mb-4 tw-flex tw-items-center tw-justify-between">
          <h2 className="tw-text-lg tw-font-semibold tw-text-[#1E0039]">
            Manage Collaborators
          </h2>
          <button onClick={onClose} className="tw-text-gray-400 hover:tw-text-gray-600">
            ✕
          </button>
        </div>

        {error && <p className="tw-mb-3 tw-text-sm tw-text-red-500">{error}</p>}

        {/* Search input */}
        <div className="tw-relative tw-mb-2">
          <input
            type="text"
            value={searchValue}
            onChange={handleSearch}
            placeholder="Search by name or email..."
            autoComplete="off"
            className="tw-w-full tw-rounded tw-border tw-border-gray-300 tw-px-3 tw-py-2 tw-text-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#1E0039]"
          />

          {/* Dropdown results */}
          {isResultsVisible && filteredUsers.length > 0 && (
            <div className="tw-absolute tw-z-10 tw-mt-1 tw-max-h-40 tw-w-full tw-overflow-auto tw-rounded tw-border tw-border-gray-200 tw-bg-white tw-shadow-md">
              {filteredUsers.map((u) => {
                const imageUrl =
                  u.picture && !u.picture.startsWith("http")
                    ? `${process.env.REACT_APP_AWS_URL}/${u.picture}`
                    : u.picture;

                return (
                  <div
                    key={u._id}
                    onClick={() => handleSelectUser(u)}
                    className="tw-flex tw-cursor-pointer tw-items-center tw-justify-between tw-px-3 tw-py-2 hover:tw-bg-gray-50"
                  >
                    <div className="tw-text-left">
                      <p className="tw-text-sm tw-font-medium tw-text-gray-800">
                        {u.firstName} {u.lastName}
                      </p>
                      <p className="tw-text-xs tw-text-gray-400">{u.email}</p>
                      <p className="tw-text-xs tw-text-[#1E0039]">{u.role}</p>
                    </div>
                    <div className="tw-flex tw-w-16 tw-shrink-0 tw-items-center tw-justify-center">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt=""
                          className="tw-h-12 tw-w-12 tw-rounded-full tw-object-cover"
                        />
                      ) : (
                        <div className="tw-flex tw-h-12 tw-w-12 tw-items-center tw-justify-center tw-rounded-full tw-bg-gray-100">
                          <FontAwesomeIcon icon={faUser} className="tw-text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Add button */}
        <button
          onClick={handleAdd}
          disabled={!selectedUser || loading}
          className="tw-mb-4 tw-w-full tw-rounded tw-bg-[#1E0039] tw-px-4 tw-py-2 tw-text-sm tw-text-white hover:tw-opacity-90 disabled:tw-opacity-40"
        >
          {loading ? "Adding..." : "Add Collaborator"}
        </button>

        {/* Collaborator list */}
        <p className="tw-mb-2 tw-text-sm tw-font-semibold tw-text-[#1E0039]">
          Current Collaborators
        </p>
        <ul className="tw-divide-y tw-divide-gray-100">
          {collaborators.length === 0 && (
            <p className="tw-text-sm tw-text-gray-400">No collaborators yet.</p>
          )}
          {collaborators.map((c) => {
            const imageUrl =
              c.user.picture && !c.user.picture.startsWith("http")
                ? `${process.env.REACT_APP_AWS_URL}/${c.user.picture}`
                : c.user.picture;

            return (
              <li key={c.user._id} className="tw-flex tw-items-center tw-justify-between tw-py-2">
                <div className="tw-text-left">
                  <p className="tw-text-sm tw-font-medium tw-text-gray-800">
                    {c.user.firstName} {c.user.lastName}
                  </p>
                  <p className="tw-text-xs tw-text-gray-400">{c.user.email}</p>
                  <p className="tw-text-xs tw-text-[#1E0039]">{c.user.role}</p>
                </div>
                <div className="tw-flex tw-items-center tw-gap-3">
                  <div className="tw-flex tw-w-16 tw-shrink-0 tw-items-center tw-justify-center">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt=""
                        className="tw-h-12 tw-w-12 tw-rounded-full tw-object-cover"
                      />
                    ) : (
                      <div className="tw-flex tw-h-12 tw-w-12 tw-items-center tw-justify-center tw-rounded-full tw-bg-gray-100">
                        <FontAwesomeIcon icon={faUser} className="tw-text-gray-400" />
                      </div>
                    )}
                  </div>
                    <button
                      onClick={() => handleRemove(c.user._id)}
                      className="tw-bg-transparent tw-text-3xl tw-text-red-500 hover:tw-text-red-700"
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}