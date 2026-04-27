import Axios from 'axios';
import { useSelector, shallowEqual } from 'react-redux';
import { React, useEffect, useState } from 'react';
import {
  validatename,
  validatePhone,
  validateWebsite,
  validateFollowers,
} from './validation.js';
import LocationSelects from './LocationSelects.js';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import { getUserById } from '../../../api/users.js';

export default function Profile() {
  const { t } = useTranslation();

  const [filename, setFilename] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const [userProfileData, setUserProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    website: '',
    city: '',
    province: '',
    country: '',
    facebook_url: '',
    facebook_followers: '',
    instagram_url: '',
    instagram_followers: '',
    role: '',
    specialization: '',
    twitter_url: '',
    twitter_followers: '',
    youtube_subs: '',
    youtube_url: '',
    linkedin_followers: '',
    linkedin_url: '',
    tiktok_url: '',
    tiktok_followers: '',
    newsletter_subs: '',
    picture: '',
  });
  
  const [validationErrors, setValidationErrors] = useState({});

  const user = useSelector((state) => state.user, shallowEqual);
  const userId = user?.id || '0';

 useEffect(() => {
    if (userId === '0') return;

    getUserById(userId)
      .then((data) => {
        setUserProfileData((prev) => ({ ...prev, ...data }));
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || t('Error loading profile data'));
      });
  }, [userId, t]);

  useEffect(() => {
    const activePic = filename || userProfileData.picture;
    if (activePic) {
      const imageUrl = activePic.startsWith('https')
        ? activePic
        : `${process.env.REACT_APP_AWS_URL}/${activePic}`;
      setBackgroundImageUrl(imageUrl);
    }
  }, [userProfileData.picture, filename]);

  async function fileSelected(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.type)) {
      let formData = new FormData();
      formData.append('file', file);
      try {
        const response = await Axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/users/uploadUserAvatar`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        if (response.data?.key) {
          setFilename(response.data.key);
          setDisabled(false);
        }
      } catch (e) {
        toast.error(t('Failed to upload image'));
      }
    } else {
      toast.error(t('File must be an image (jpeg, jpg or png)'));
    }
  }

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    let error = '';
  
      if (name === 'firstName' || name === 'lastName') {
        error = validatename(value) ? '' : t('Required field (min 3 chars)');
      } else if (name === 'phone') {
        error = validatePhone(value) ? '' : t('Invalid phone number');
      } else if (name.includes('url') || name === 'website') {
        error = validateWebsite(value) ? '' : t('Invalid URL');
      } else if (name.includes('followers') || name.includes('subs')) {
        error = validateFollowers(value) ? '' : t('Invalid number');
      }

    setValidationErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    setUserProfileData((prevState) => {
      const newState = { ...prevState, [name]: value };

      if (name === 'country') {
        newState.province = ''; 
        newState.city = '';
      } else if (name === 'province') {
        newState.city = '';
      }

      return newState;
    });

    setDisabled(false);
  };

  async function saveUserProfile() {
    if (Object.values(validationErrors).some((error) => error)) {
      toast.warning(t('Please fix the validation errors before saving.'));
      return;
    }

    setIsUploading(true);
    try {
      await Axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/users/updateProfile/${userId}`,
        { ...userProfileData, picture: filename || userProfileData.picture }
      );
      toast.success(t('Updated profile successfully!'));
      setDisabled(true);
    } catch (err) {
      toast.error(err.response?.data?.message || t('An error occurred'));
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="tw-container">
      <ToastContainer theme="colored" position="top-right" />

      <div className="tw-flex tw-h-full tw-flex-col lg:tw-flex-row">
        <div className="tw-mx-4 tw-my-8 tw-flex tw-flex-col lg:tw-w-1/3">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={userProfileData.firstName}
            onChange={handleProfileChange}
            className="tw-my-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 lg:tw-w-3/4"
          />
          {validationErrors.firstName && (
            <div className="tw-text-red-500">{validationErrors.firstName}</div>
          )}

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={userProfileData.lastName}
            onChange={handleProfileChange}
            className="tw-my-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44_176,0.25)] placeholder:tw-text-slate-400 lg:tw-w-3/4"
          />
          {validationErrors.lastName && (
            <div className="tw-text-red-500">{validationErrors.lastName}</div>
          )}

          <input
            type="text"
            name="email"
            placeholder="Email"
            value={userProfileData.email}
            onChange={handleProfileChange}
            className="tw-my-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44_176,0.25)] placeholder:tw-text-slate-400 lg:tw-w-3/4"
            disabled={userId !== '0'}
          />

          <input
            type="text"
            name="phone"
            placeholder={t('Phone')}
            value={userProfileData.phone}
            onChange={handleProfileChange}
            className="tw-my-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44_176,0.25)] placeholder:tw-text-slate-400 lg:tw-w-3/4"
          />
          {validationErrors.phone && (
            <div className="tw-text-red-500">{validationErrors.phone}</div>
          )}

          <input
            type="text"
            name="website"
            placeholder={t('Website')}
            value={userProfileData.website}
            onChange={handleProfileChange}
            className="tw-my-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44_176,0.25)] placeholder:tw-text-slate-400 lg:tw-w-3/4"
          />
          {validationErrors.website && (
            <div className="tw-text-red-500">{validationErrors.website}</div>
          )}
          <LocationSelects
            userProfileData={userProfileData}
            handleProfileChange={handleProfileChange}
            validationErrors={validationErrors}
          />
        </div>

        {/* Profile picture section */}
        <div className="tw-mx-auto tw-my-8 tw-flex tw-w-full tw-items-center tw-justify-around lg:tw-w-1/3 lg:tw-flex-col lg:tw-justify-between">
          <label htmlFor="profileImageUpload">
            <div
              className="tw-flex tw-h-[150px] tw-w-[150px] tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-full tw-bg-cover tw-bg-center tw-text-2xl tw-font-semibold tw-text-black"
              style={{
                backgroundImage: `url(${backgroundImageUrl})`,
              }}
              title={t('Click to change image')}
            >
              {(!backgroundImageUrl || backgroundImageUrl.startsWith('https:')) && 'Upload'}
            </div>
          </label>
          <input
            id="profileImageUpload"
            type="file"
            onChange={fileSelected}
            accept="image/*"
            className="tw-hidden"
          />

          {userProfileData.role === 'Industry Professional' && (
            <select
              name="specialization"
              value={userProfileData.specialization}
              onChange={handleProfileChange}
              className="tw-my-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44_176,0.25)] lg:tw-w-3/4"
            >
              <option value="">{t('Select Specialization')}</option>
              <option value="Distributor">{t('Distributor')}</option>
              <option value="Sales Agent">{t('Sales Agent')}</option>
              <option value="Film Festival">{t('Film Festival')}</option>
              <option value="Producer">{t('Producer')}</option>
              <option value="Writer">{t('Writer')}</option>
              <option value="Cinematographer">{t('Cinematographer')}</option>
              <option value="Investor">{t('Investor')}</option>
            </select>
          )}

          <div className="">
            {disabled === true && !isUploading ? (
              <button
                disabled
                className="tw-rounded-full tw-px-8 tw-py-2 disabled:tw-border-slate-200 disabled:tw-bg-slate-100 disabled:tw-text-slate-300 disabled:tw-shadow-none"
                style={{
                  marginBottom: '20px',
                }}
              >
                {t('Save')}
              </button>
            ) : (
              <button
                className="tw-rounded-full tw-px-8 tw-py-2 tw-text-[#1E0039] tw-shadow-md tw-shadow-[#1E0039]/50 disabled:tw-opacity-50"
                onClick={() => saveUserProfile()}
                disabled={isUploading}
              >
                {isUploading ? (
                  <div className="tw-flex tw-items-center">
                    <div className="tw-mr-2 tw-h-4 tw-w-4 tw-animate-spin tw-rounded-full tw-border-2 tw-border-t-transparent"></div>
                    {t('Uploading...')}
                  </div>
                ) : (
                  t('Save')
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <hr className="tw-my-4 tw-border-gray-400" />
      <div className="tw-mx-auto tw-my-8 tw-grid tw-grid-cols-1 tw-gap-4 lg:tw-grid-cols-2">
        <div className="tw-mx-auto tw-flex tw-items-center">
          <i className="fa-brands fa-facebook tw-text-4xl"></i>
          <input
            type="text"
            name="facebook_url"
            placeholder="URL"
            value={userProfileData.facebook_url}
            onChange={handleProfileChange}
            className="tw-ml-4 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44_176,0.25)] placeholder:tw-text-slate-400 "
          />
          {validationErrors.facebook_url && (
            <div className="tw-text-red-500">
              {validationErrors.facebook_url}
            </div>
          )}
          <input
            type="text"
            name="facebook_followers"
            placeholder={t('Followers')}
            value={userProfileData.facebook_followers}
            onChange={handleProfileChange}
            className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
          />
        </div>
        {validationErrors.facebook_followers && (
          <div className="tw-text-red-500">
            {validationErrors.facebook_followers}
          </div>
        )}

        <div className="tw-mx-auto tw-flex tw-items-center">
          <i className="fa-brands fa-instagram tw-text-4xl"></i>
          <input
            type="text"
            name="instagram_url"
            placeholder="URL"
            value={userProfileData.instagram_url}
            onChange={handleProfileChange}
            className="tw-ml-4 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
          />
          {validationErrors.instagram_url && (
            <div className="tw-text-red-500">
              {validationErrors.instagram_url}
            </div>
          )}
          <input
            type="text"
            name="instagram_followers"
            placeholder={t('Followers')}
            value={userProfileData.instagram_followers}
            onChange={handleProfileChange}
            className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
          />
          {validationErrors.instagram_followers && (
            <div className="tw-text-red-500">
              {validationErrors.instagram_followers}
            </div>
          )}
        </div>

        <div className="tw-mx-auto tw-flex tw-items-center">
          <i className="fa-brands fa-twitter tw-text-4xl"></i>
          <input
            type="text"
            name="twitter_url"
            placeholder="URL"
            value={userProfileData.twitter_url}
            onChange={handleProfileChange}
            className="tw-ml-3 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
          />
          {validationErrors.twitter_url && (
            <div className="tw-text-red-500">
              {validationErrors.twitter_url}
            </div>
          )}
          <input
            type="text"
            name="twitter_followers"
            placeholder={t('Followers')}
            value={userProfileData.twitter_followers}
            onChange={handleProfileChange}
            className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
          />
          {validationErrors.twitter_followers && (
            <div className="tw-text-red-500">
              {validationErrors.twitter_followers}
            </div>
          )}
        </div>

        <div className="tw-mx-auto tw-flex tw-items-center">
          <i className="fa-brands fa-youtube tw-text-4xl"></i>
          <input
            type="text"
            name="youtube_url"
            placeholder="URL"
            value={userProfileData.youtube_url}
            onChange={handleProfileChange}
            className="tw-ml-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
          />
          {validationErrors.youtube_url && (
            <div className="tw-text-red-500">
              {validationErrors.youtube_url}
            </div>
          )}
          <input
            type="text"
            name="youtube_subs"
            placeholder={t('Subscriptions')}
            value={userProfileData.youtube_subs}
            onChange={handleProfileChange}
            className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
          />
          {validationErrors.youtube_subs && (
            <div className="tw-text-red-500">
              {validationErrors.youtube_subs}
            </div>
          )}
        </div>

        <div className="tw-mx-auto tw-flex tw-items-center">
          <i className="fa-brands fa-linkedin tw-text-4xl"></i>
          <input
            type="text"
            name="linkedin_url"
            placeholder="URL"
            value={userProfileData.linkedin_url}
            onChange={handleProfileChange}
            className="tw-ml-4 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
          />
          {validationErrors.linkedin_url && (
            <div className="tw-text-red-500">
              {validationErrors.linkedin_url}
            </div>
          )}
          <input
            type="text"
            name="linkedin_followers"
            placeholder={t('Followers')}
            value={userProfileData.linkedin_followers}
            onChange={handleProfileChange}
            className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
          />
          {validationErrors.linkedin_followers && (
            <div className="tw-text-red-500">
              {validationErrors.linkedin_followers}
            </div>
          )}
        </div>

        <div className="tw-mx-auto tw-flex tw-items-center">
          <i className="fa-brands fa-tiktok tw-text-4xl"></i>
          <input
            type="text"
            name="tiktok_url"
            placeholder="URL"
            value={userProfileData.tiktok_url}
            onChange={handleProfileChange}
            className="tw-ml-4 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
          />
          {validationErrors.tiktok_url && (
            <div className="tw-text-red-500">
              {validationErrors.tiktok_url}
            </div>
          )}
          <input
            type="text"
            name="tiktok_followers"
            placeholder={t('Followers')}
            value={userProfileData.tiktok_followers}
            onChange={handleProfileChange}
            className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
          />
          {validationErrors.tiktok_followers && (
            <div className="tw-text-red-500">
              {validationErrors.tiktok_followers}
            </div>
          )}
        </div>
          <div className="tw-mx-auto tw-flex tw-items-center">
          <i className="fa-solid fa-envelope tw-text-4xl"></i>
          <input
            type="text"
            name="newsletter_subs"
            placeholder={t('Newsletter Subscribers')}
            value={userProfileData.newsletter_subs}
            onChange={handleProfileChange}
            className="tw-ml-4 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
          />
          {validationErrors.newsletter_subs && (
            <div className="tw-text-red-500">
              {validationErrors.newsletter_subs}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}