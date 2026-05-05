import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { addToChat } from '../../../api/epks'; 
import emptyBanner from '../../../images/empty_banner.jpeg'; 

export default function RecommendUserModal({ close, userId, user, epkInfo, setRefresh }) {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/getallusers`)
      .then(res => setAllUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchValue(val);
    const searchString = val.toLowerCase();

    if (!searchString.trim()) {
      setFilteredData([]);
    } else {
      setFilteredData(
        allUsers.filter((u) => 
          (u.firstName && u.firstName.toLowerCase().includes(searchString)) ||
          (u.lastName && u.lastName.toLowerCase().includes(searchString))
        )
      );
    }
  };

  const toggleUser = (targetUser) => {
    setSelectedUsers(prev => 
      prev.find(s => s._id === targetUser._id) 
        ? prev.filter(s => s._id !== targetUser._id) 
        : [...prev, targetUser]
    );
  };

  const handleSend = async () => {
    setLoading(true);
    try {
      const message1 = `Hey, check out this profile: <a href="/user/${userId}" target="_blank">${epkInfo.firstName} ${epkInfo.lastName}</a>`;
      const pic = epkInfo.picture || "";
      const message2 = `<a href="/user/${userId}" target="_blank"><img src="${process.env.REACT_APP_AWS_URL}/${pic}" style="width: 60px; height: 70px;" /></a>`;

      await Promise.all(selectedUsers.map(u => 
        addToChat(message1, user, u._id).then(() => addToChat(message2, user, u._id))
      ));

      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/recommend/${userId}`, { count: selectedUsers.length });
      
      toast.success(t("Recommendations sent!"));
      setRefresh(true);
      close();
    } catch (err) {
      toast.error(t("Failed to send recommendations"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tw-fixed tw-inset-0 tw-z-[999] tw-flex tw-items-center tw-justify-center tw-bg-black/60 tw-backdrop-blur-sm">
      <div className="tw-relative tw-w-full tw-max-w-md tw-rounded-2xl tw-bg-[#2d0a4d] tw-p-8 tw-shadow-2xl tw-border tw-border-white/10">
        <button onClick={close} className="tw-absolute tw-right-4 tw-top-4 tw-text-white hover:tw-text-gray-300">✕</button>
        
        <h2 className="tw-mb-4 tw-text-xl tw-font-bold tw-text-white">{t("Recommend this profile to someone")}</h2>
        
        <input 
          type="search"
          className="tw-w-full tw-rounded-full tw-border tw-border-white/20 tw-bg-white/10 tw-p-3 tw-text-white tw-mb-4"
          placeholder={t("Search users...")}
          value={searchValue}
          onChange={handleSearch}
        />

        {searchValue && (
          <div className="tw-max-h-60 tw-overflow-y-auto tw-mb-4 tw-rounded-xl tw-bg-white tw-shadow-2xl">
            {filteredData.map((u) => (
              <div
                key={u._id}
                onClick={() => toggleUser(u)}
                className={`tw-flex tw-items-center tw-justify-between tw-px-6 tw-py-3 tw-cursor-pointer hover:tw-bg-gray-100 ${
                  selectedUsers.find(s => s._id === u._id) ? 'tw-bg-purple-100' : ''
                }`}
              >
                <p className="tw-text-[#1E0039] tw-font-semibold">{`${u.firstName || ''} ${u.lastName || ''}`}</p>
                <span>
                  <img
                    src={
                      u.image_details
                        ? !u.image_details.startsWith("https")
                          ? `${process.env.REACT_APP_AWS_URL}/${u.image_details}`
                          : u.image_details
                        : u.picture
                        ? u.picture.startsWith("https")
                          ? u.picture
                          : `${process.env.REACT_APP_AWS_URL}/${u.picture}`
                        : emptyBanner
                    }
                    alt=""
                    className="tw-h-12 tw-w-12 tw-object-cover tw-rounded-full"
                  />
                </span>
              </div>
            ))}
          </div>
        )}

        <button 
          disabled={loading || selectedUsers.length === 0}
          onClick={handleSend}
          className="tw-w-full tw-rounded-lg tw-bg-[#712cb0] tw-py-3 tw-text-white disabled:tw-opacity-50 hover:tw-bg-[#8a3cd6]"
        >
          {loading ? t("Sending...") : t("Send Recommendations")}
        </button>
      </div>
    </div>
  );
}