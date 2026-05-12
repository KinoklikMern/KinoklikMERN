import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { addToChat } from '../../../api/epks'; 
import { searchUsers } from '../../../api/users';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import emptyBanner from '../../../images/empty_banner.jpeg'; 

export default function RecommendUserModal({ close, userId, user, targetUser, onSuccess }) {
  const { t } = useTranslation();
  const [searchList, setSearchList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const debounceRef = useRef(null);

  const searchHandler = (e) => {
    const query = e.target.value;
    setError("");
    clearTimeout(debounceRef.current);

    if (!query.trim() || query.trim().length < 2) {
      setSearchList([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const users = await searchUsers(query.trim());
        setSearchList(users || []);
      } catch (err) {
        console.error("Search failed:", err);
        setSearchList([]);
      } finally {
        setLoading(false);
      }
    }, 300);
  };

  const selectUser = (clickedUser) => {
    setError("");
    setSelectedUser(prev => (prev?._id === clickedUser._id ? null : clickedUser));
  };

  const handleSend = async () => {
    if (!selectedUser) return;
    setLoading(true);
    setError("");

    try {
      const firstName = targetUser?.firstName || "";
      const lastName = targetUser?.lastName || "";
      const profileLink = `${window.location.origin}/user/${userId}`;

      const message1 = `Hey, check out this profile: <a href="${profileLink}" target="_blank">${firstName} ${lastName}</a>`;
      const pic = targetUser?.picture || "";
      const message2 = `<a href="${profileLink}" target="_blank"><img src="${process.env.REACT_APP_AWS_URL}/${pic}" style="width: 60px; height: 70px;" /></a>`;

      await addToChat(message1, user, selectedUser._id);

      await new Promise(resolve => setTimeout(resolve, 500));

      await addToChat(message2, user, selectedUser._id);

      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/recommend/${userId}`, { count: 1 });
      
      toast.success(t("Recommendations sent!"));
      if (onSuccess) onSuccess(); 
      close();
      } catch (err) {
        console.log("Error Data:", err.response?.data);
        setError(t("Failed to send. Please check your connection and try again."));
      } finally {
      setLoading(false);
    }
  };

  return (
      <div className="tw-fixed tw-inset-0 tw-z-[9999] tw-flex tw-items-center tw-justify-center tw-bg-[#190033]/90 tw-backdrop-blur-md tw-p-4">
        <div className="tw-relative tw-w-full tw-max-w-md tw-bg-[#280D41] tw-border-2 tw-border-[#FF43A7] tw-rounded-2xl tw-p-6 tw-shadow-[0_0_30px_rgba(255,67,167,0.2)]">
          
          <button 
            onClick={close} 
            className="tw-absolute tw-top-4 tw-right-4 tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center tw-bg-black/20 hover:tw-bg-[#FF43A7] tw-text-white tw-rounded-full tw-transition-colors tw-border-none tw-cursor-pointer"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
  
          <h2 className="tw-text-white tw-text-xl tw-font-bold tw-mb-6 tw-text-center">
            {t('Recommend this profile to')}
          </h2>
          
          <div className="tw-mb-4">
            <input 
              type="search"
              className="tw-w-full tw-bg-[#190033] tw-border tw-border-[#FF43A7]/30 tw-rounded-xl tw-p-4 tw-text-white tw-text-sm tw-outline-none focus:tw-border-[#FF43A7] placeholder:tw-text-[#AA8894]/60"
              placeholder={t("Search users...")}
              onChange={searchHandler}
            />
          </div>
  
          {searchList.length > 0 && (
            <div className="tw-max-h-60 tw-overflow-y-auto tw-mb-6 tw-rounded-xl tw-bg-[#190033] tw-border tw-border-[#FF43A7]/20">
              {searchList.map((u) => (
                <div
                  key={u._id}
                  onClick={() => selectUser(u)}
                  className={`tw-flex tw-items-center tw-justify-between tw-px-4 tw-py-3 tw-cursor-pointer tw-transition-colors hover:tw-bg-[#FF43A7]/10 ${
                    selectedUser?._id === u._id ? 'tw-bg-[#FF43A7]/20' : ''
                }`}
                >
                  <div className="tw-flex tw-flex-col">
                    <p className="tw-text-white tw-text-sm tw-font-medium">{`${u.firstName || ''} ${u.lastName || ''}`}</p>
                    <p className="tw-text-[#AA8894] tw-text-[10px] tw-uppercase">{u.role}</p>
                  </div>
                  <img
                    src={u.picture?.startsWith("http") ? u.picture : u.picture ? `${process.env.REACT_APP_AWS_URL}/${u.picture}` : emptyBanner}
                    alt=""
                    className="tw-h-10 tw-w-10 tw-object-cover tw-rounded-full tw-border tw-border-[#FF43A7]/30"
                  />
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="tw-mb-4 tw-p-3 tw-bg-red-500/10 tw-border tw-border-red-500/50 tw-rounded-xl tw-text-red-500 tw-text-xs tw-text-center">
              {error}
            </div>
          )} 

          <button 
            disabled={loading || !selectedUser}
            onClick={handleSend}
            className="tw-w-full tw-bg-[#FF43A7] hover:tw-bg-[#ff5cac] tw-text-[#570033] tw-font-bold tw-py-3 tw-rounded-xl tw-shadow-[0_0_15px_rgba(255,67,167,0.4)] tw-transition-all tw-border-none tw-cursor-pointer disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
          >
            {loading ? t("Sending...") : t("Send Recommendations")}
          </button>
        </div>
      </div>
    );
  }