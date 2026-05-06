import Axios from 'axios';
import { useSelector, shallowEqual } from 'react-redux';
import { React, useEffect, useState } from 'react';
import {
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
    email: '',
    phone: '',
    website: '',
    city: '',
    province: '',
    country: '',
    role: '',
    specialization: '',
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
  
      if (name === 'phone') {
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
  );
}