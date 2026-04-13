/* eslint-disable no-unused-vars */
import Axios from 'axios';
import React, { useState, useEffect, useRef, } from "react";
import http from "../../../http-common";
import LoadingSpin from "../../Dashboard/LoadingSpin";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from 'react-toastify';
import { ETHNICITY_OPTIONS } from "../../../constants/EthnicityOptions";
import { GENDER_OPTIONS } from "../../../constants/GenderOptions";
import { AGE_OPTIONS } from "../../../constants/AgeOptions";

export default function ActorEditor({ user }) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [demoReelFile, setDemoReelFile] = useState('');
    const [demoReelPreview, setDemoReelPreview] = useState('');
    const [demoReelFileType, setDemoReelFileType] = useState('');
    const [isUploading, setIsUploading] = useState(false); 
    const inputDemoReelRef = useRef(null);
    
    const isActor = user?.role === 'Actor';
    const isFilmmaker = user?.role === 'Filmmaker';

    const [form, setForm] = useState({
        gender: '',
        ethnicity: '',
        age: '',
        height: '',
        eyesColor: '',
        hairColor: '',
        bodyBuild: '',
        aboutMe: "",
        picture: "",
        bannerImg: "",
        profiles: ["", "", ""],
        filesToUpload: {},
        previews: {}
    });

    useEffect(() => {
        http.get(`users/getactor/${user.id}`).then((res) => {
            setForm(prev => ({
                ...prev,
                ...res.data,
                gender: res.data.gender || "", 
                aboutMe: res.data.aboutMe || "",
                profiles: res.data.profiles || ["", "", ""],
            }));
            setLoading(false);
        });
    }, [user.id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e, field, index = null) => {
        const file = e.target.files[0];
        if (!file) return;
        if (field === 'bannerImg' && file.type.startsWith('video/')) {
            const videoElement = document.createElement('video');
            videoElement.preload = 'metadata';
            videoElement.onloadedmetadata = () => {
                window.URL.revokeObjectURL(videoElement.src);
                if (videoElement.duration > 300) {
                    alert(t("Video is too long. Maximum length is 5 minutes."));
                    e.target.value = ""; 
                    return;
                }
                processFile(file, field, index);
            };
            videoElement.src = URL.createObjectURL(file);
        } else {
            processFile(file, field, index);
        }
    };

    /*
    const demoReelSelected = (event) => {
        const file = event.target.files[0];
        setDemoReelFile(file);
        if (file) {
        const fileUrl = URL.createObjectURL(file);
        setDemoReelPreview(fileUrl);
        setDemoReelFileType(file.type);

        // If it's a video, set up the video element
        if (file.type.startsWith('video/') && videoRef.current) {
            videoRef.current.srcObject = null;
            videoRef.current.src = fileUrl;
            videoRef.current.load();
            videoRef.current.onloadedmetadata = () => {
            console.log('Video duration:', videoRef.current.duration);
            };
        }
        setDisabled(false);
        }
    };

    const checkFileMimeType = (file) => {
    if (file !== '') {
      if (
        file.type === 'image/png' ||
        file.type === 'image/jpg' ||
        file.type === 'image/jpeg' ||
        file.type === 'video/mp4' ||
        file.type === 'video/mpeg' ||
        file.type === 'video/quicktime' ||
        file.type === 'video/x-ms-wmv' ||
        file.type === 'video/ogg' ||
        file.type === 'video/3gpp' ||
        file.type === 'video/x-msvideo'
      )
        return true;
      else return false;
    } else return true;
  };

    async function saveUserProfile() {
        // Check if there are any validation errors
        const hasErrors = Object.values(validationErrors).some((error) => error);
    
        if (!hasErrors) {
          setIsUploading(true);
    
          try {
            // Upload demo reel media if filmmaker
            if (user.role === 'Filmmaker' && demoReelFile) {
              let formDataBanner = new FormData();
              formDataBanner.append('file', demoReelFile);
    
              // Upload media (video or image)
              if (demoReelFile.size <= 350000000) {
                // 350MB limit
                const mediaResponse = await Axios.post(
                  `${process.env.REACT_APP_BACKEND_URL}/users/actorbanner`,
                  formDataBanner,
                  {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                  }
                );
    
                if (mediaResponse.data.key) {
                  userProfileData.bannerImg = mediaResponse.data.key;
                }
              } else {
                alert(t('File must be less than 350MB'));
                setIsUploading(false);
                return;
              }
            }
    
            // Update profile
            await Axios.put(
              `${process.env.REACT_APP_BACKEND_URL}/users/updateProfile/${userId}`,
              userProfileData
            );
    
            setIsUploading(false);
          } catch (err) {
            alert(err.response?.data?.message || 'An error occurred');
            setIsUploading(false);
          }
        } else {
          alert(t('Please fix the validation errors before saving.'));
        }
    }

      // Helper function to determine if existing bannerImg is a video
    const isExistingVideo = (bannerImg) => {
        if (!bannerImg) return false;
        const videoExtensions = [
        '.mp4',
        '.mov',
        '.avi',
        '.wmv',
        '.flv',
        '.webm',
        '.m4v',
        ];
        return videoExtensions.some((ext) => bannerImg.toLowerCase().includes(ext));
    };
    */
    const processFile = (file, field, index) => {
        const previewUrl = URL.createObjectURL(file);
        const key = index !== null ? `prof${index}` : field;
        setForm(prev => ({
            ...prev,
            filesToUpload: { ...prev.filesToUpload, [key]: file },
            previews: { ...prev.previews, [key]: previewUrl }
        }));
    };

    const getMediaUrl = (key, previewKey) => {
        if (form.previews[previewKey]) return form.previews[previewKey];
        if (!key || key === "" || key.includes("default_pic") || key.endsWith(".png")) return null;
        return key.startsWith("http") ? key : `${process.env.REACT_APP_AWS_URL}/${key}`;
    };

    const videoRef = React.useRef(null);
    const [thumbnailImage, setThumbnailImage] = useState(null);

    const captureThumbnail = () => {
        const video = videoRef.current;
        if (!video) return;
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageUrl = canvas.toDataURL("image/jpeg");
        setThumbnailImage(imageUrl);
        setForm(prev => ({
            ...prev,
            filesToUpload: { ...prev.filesToUpload, videoThumbnail: imageUrl }
        }));
    };

    const handleSave = async () => {
        // Validation check (if you have validationErrors defined like in Profile)
        // if (Object.values(validationErrors).some((error) => error)) {
        //     toast.warning(t('Please fix the validation errors before saving.'));
        //     return;
        // }

        setSaving(true);
        try {
            const uploadTasks = [];
            
            // Create a clean payload for the database
            // We strip out the internal UI state like 'filesToUpload' and 'previews'
            let updatePayload = {
                ...form,
                gender: form.gender,
                aboutMe: form.aboutMe,
                filesToUpload: undefined,
                previews: undefined
            };

            const uploadToS3 = async (file) => {
                const fd = new FormData();
                fd.append("file", file);
                const { data } = await http.post("users/actorbanner", fd);
                return data.key;
            };

            // 1. Handle Main Picture
            if (form.filesToUpload.picture) {
                uploadTasks.push(uploadToS3(form.filesToUpload.picture).then(k => updatePayload.picture = k));
            }
            
            // 2. Handle Banner (Video or Image)
            if (form.filesToUpload.bannerImg) {
                uploadTasks.push(uploadToS3(form.filesToUpload.bannerImg).then(k => updatePayload.bannerImg = k));
            }

            // 3. Handle Portfolio/Profile Images
            [0, 1, 2].forEach(i => {
                if (form.filesToUpload[`prof${i}`]) {
                    uploadTasks.push(uploadToS3(form.filesToUpload[`prof${i}`]).then(k => {
                        const newProfiles = [...updatePayload.profiles];
                        newProfiles[i] = k;
                        updatePayload.profiles = newProfiles;
                    }));
                }
            });

            // Wait for all S3 uploads to complete
            await Promise.all(uploadTasks);
            
            // 4. Update the Database
            // Using the same base logic as Profile, but keeping your specific Actor route
            await http.put(`users/actor/files/${user.id}`, updatePayload);
            
            toast.success(t("Profile updated successfully!"));
            
        } catch (err) { 
            console.error(err);
            toast.error(err.response?.data?.message || t("Error saving profile changes")); 
        } finally { 
            setSaving(false); 
        }
    };

    if (loading) return <LoadingSpin />;

    const videoSrc = getMediaUrl(form.bannerImg, 'bannerImg');
    const isImage = videoSrc && videoSrc.toLowerCase().match(/\.(png|jpg|jpeg|gif)$/);

    return (
        <div className="tw-flex tw-flex-col tw-gap-6 tw-items-center tw-w-full tw-p-4">
            
            {/* 1. MEDIA SECTION */}
            <div className="tw-w-[95%] tw-flex tw-flex-col tw-gap-2">
                <h2 className="tw-text-xl tw-font-bold tw-text-[#1E0039] tw-ml-2">{t("Media Portfolio")}</h2>
                <div className="tw-w-full tw-h-auto tw-rounded-[10px] tw-shadow-[0px_0px_5px_2px_purple] tw-flex tw-flex-col md:tw-flex-row tw-gap-8 tw-p-8 tw-bg-white">
                    
                    {/* Only Show Headshots for Actors */}
                    {isActor && (
                        <div className="tw-w-full tw-max-w-[360px] tw-aspect-[4/5] tw-shadow-[0px_0px_5px_2px_purple] tw-rounded-[10px] tw-grid tw-grid-cols-3 tw-grid-rows-3 tw-gap-2 tw-p-4 tw-bg-cover tw-bg-center"
                            style={{ backgroundImage: `url(${getMediaUrl(form.picture, 'picture')})` }}>
                            <div className="tw-col-span-3 tw-row-span-2 tw-flex tw-justify-center tw-items-center">
                                <label className="tw-text-xs tw-font-bold tw-cursor-pointer tw-shadow-md tw-rounded-lg tw-px-4 tw-py-2 tw-bg-white/90 tw-text-[#712cb0] hover:tw-bg-[#712cb0] hover:tw-text-white tw-transition-all">
                                    {t("Upload Headshot")}
                                    <input type="file" className="tw-hidden" onChange={(e) => handleFileChange(e, 'picture')} />
                                </label>
                            </div>
                            {[0, 1, 2].map((i) => (
                                <div key={i} className="tw-row-start-3 tw-flex tw-justify-center tw-items-end">
                                    <label className="tw-w-full tw-aspect-square tw-max-w-[55px] tw-flex tw-items-center tw-justify-center tw-text-xl tw-shadow-md tw-rounded-lg tw-bg-white/90 tw-text-[#712cb0] hover:tw-bg-[#712cb0] hover:tw-text-white tw-cursor-pointer tw-bg-cover tw-bg-center"
                                        style={{ backgroundImage: `url(${getMediaUrl(form.profiles[i], `prof${i}`)})` }}>
                                        +
                                        <input type="file" className="tw-hidden" onChange={(e) => handleFileChange(e, 'profiles', i)} />
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="tw-flex-1 tw-flex tw-flex-col tw-gap-4">
                        <label className="tw-block tw-text-lg tw-font-bold tw-text-gray-800">
                            {isFilmmaker ? t("Upload Company Reel / Portfolio Video") : t("Upload Demo Reel")}
                        </label>
                        <input type="file" accept="video/mp4,video/*" onChange={(e) => handleFileChange(e, 'bannerImg')} className="tw-text-sm" />
                        {videoSrc && !isImage ? (
                            <div className="tw-w-full tw-aspect-video tw-bg-black tw-rounded-lg tw-overflow-hidden tw-border-4 tw-border-purple-100">
                                <video ref={videoRef} key={videoSrc} src={videoSrc} controls className="tw-w-full tw-h-full tw-object-contain" />
                            </div>
                        ) : (
                            <div className="tw-w-full tw-aspect-video tw-bg-gray-100 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-border-2 tw-border-dashed tw-border-gray-300">
                                <p className="tw-text-gray-400">{t("No video selected (Max 5 min)")}</p>
                            </div>
                        )}
                        <div className="tw-flex tw-items-center tw-gap-4 tw-mt-2">
                            <button onClick={captureThumbnail} className="tw-px-4 tw-py-2 tw-bg-purple-50 tw-text-purple-700 tw-border tw-border-purple-200 tw-rounded tw-text-xs tw-font-bold hover:tw-bg-purple-100">
                                {t("Capture Thumbnail")}
                            </button>
                            {thumbnailImage && <img src={thumbnailImage} className="tw-w-16 tw-h-12 tw-object-cover tw-rounded tw-border-2 tw-border-purple-500" alt="Preview" />}
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. STATS SECTION - Hidden for Filmmakers */}
            {isActor && (
                <div className="tw-w-[95%] tw-flex tw-flex-col tw-gap-2">
                    <h2 className="tw-text-xl tw-font-bold tw-text-[#1E0039] tw-ml-2">{t("Physical Attributes")}</h2>
                    <div className="tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-4 tw-p-8 tw-bg-white tw-rounded-[10px] tw-shadow-[0px_0px_5px_2px_purple]">
                        <select name="gender" value={form.gender} onChange={handleChange} className="tw-h-10 tw-rounded-lg tw-border-2 tw-px-4 tw-text-[#1E0039]">
                            <option value="">{t('Playing Gender')}</option>
                            {GENDER_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{t(opt.label)}</option>)}
                        </select>

                        <select name="ethnicity" value={form.ethnicity} onChange={handleChange} className="tw-h-10 tw-rounded-lg tw-border-2 tw-px-4 tw-text-[#1E0039]">
                            <option value="">{t('Ethnicity')}</option>
                            {ETHNICITY_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{t(`ethnicities.${opt.value}`)}</option>)}
                        </select>

                        <select name="age" value={form.age} onChange={handleChange} className="tw-h-10 tw-rounded-lg tw-border-2 tw-px-4 tw-text-[#1E0039]">
                            <option value="">{t('Age Range')}</option>
                            {AGE_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{t(opt.label)}</option>)}
                        </select>

                        <select name="height" value={form.height} onChange={handleChange} className="tw-h-10 tw-rounded-lg tw-border-2 tw-px-4 tw-text-[#1E0039]">
                            <option value="">{t('Height')}</option>
                            <option value={"5'0"}>5'0"</option><option value={"5'6"}>5'6"</option><option value={"6'0"}>6'0"</option>
                        </select>

                        <select name="eyesColor" value={form.eyesColor} onChange={handleChange} className="tw-h-10 tw-rounded-lg tw-border-2 tw-px-4 tw-text-[#1E0039]">
                            <option value="">{t('Eyes Color')}</option>
                            <option value="Black">{t('Black')}</option><option value="Blue">{t('Blue')}</option><option value="Brown">{t('Brown')}</option>
                        </select>

                        <select name="hairColor" value={form.hairColor} onChange={handleChange} className="tw-h-10 tw-rounded-lg tw-border-2 tw-px-4 tw-text-[#1E0039]">
                            <option value="">{t('Hair Color')}</option>
                            <option value="Black">{t('Black')}</option><option value="Blonde">{t('Blonde')}</option>
                        </select>

                        <select name="bodyBuild" value={form.bodyBuild} onChange={handleChange} className="tw-h-10 tw-rounded-lg tw-border-2 tw-px-4 tw-text-[#1E0039]">
                            <option value="">{t('Body Build')}</option>
                            <option value="Slim">{t('Slim')}</option><option value="Athletic">{t('Athletic')}</option>
                        </select>
                    </div>
                </div>
            )}

            {/* 3. BIO SECTION - Visible to All */}
            <div className="tw-w-[95%] tw-flex tw-flex-col tw-gap-2">
                <h2 className="tw-text-xl tw-font-bold tw-text-[#1E0039] tw-ml-2">
                    {isFilmmaker ? t("Company Biography") : t("Biography")}
                </h2>
                <div className="tw-w-full tw-shadow-[0px_0px_5px_2px_purple] tw-rounded-[15px] tw-bg-white">
                    <textarea
                        className="tw-w-full tw-h-[150px] tw-p-6 tw-outline-none tw-border-none tw-resize-none tw-rounded-[15px]"
                        placeholder={isFilmmaker ? t("Tell us about your production house...") : t("About me...")}
                        value={form.aboutMe}
                        onChange={(e) => setForm({...form, aboutMe: e.target.value})}
                    />
                </div>
                
                <div className="tw-flex tw-justify-center md:tw-justify-end tw-mt-4 tw-mb-10">
                    <button 
                        onClick={handleSave} 
                        disabled={saving}
                        className="tw-px-16 tw-py-2 tw-bg-white tw-border-2 tw-border-purple-600 tw-text-purple-700 tw-shadow-[0px_0px_5px_1px_purple] tw-rounded-full tw-font-bold tw-uppercase tw-text-sm hover:tw-bg-purple-700 hover:tw-text-white tw-transition-all"
                    >
                        {saving ? t("Saving...") : t("Save Profile")}
                    </button>
                </div>
            </div>
        </div>

        /* old filmmaker demo upload in case it's useful
    { Filmmaker Information }
        {userProfileData.role === 'Filmmaker' && (
          <div className="tw-mx-4 tw-my-8 tw-flex tw-flex-col lg:tw-w-1/3">
            <div className="tw-mb-4">
              <label
                htmlFor="demoReel"
                className="tw-mb-2 tw-block tw-text-lg tw-font-semibold tw-text-[#1E0039]"
              >
                {t('Upload Demo Reel (Image or Video)')}
              </label>
              <input
                id="demoReel"
                type="file"
                ref={inputDemoReelRef}
                onChange={demoReelSelected}
                accept="image/*,video/*"
                className="tw-w-full tw-rounded-lg tw-border-2 tw-p-2 tw-text-[#1E0039] tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] lg:tw-w-3/4"
              />
            </div>


            {(demoReelPreview || userProfileData.bannerImg) && (
              <div className="tw-mb-4">

                {(demoReelFileType && demoReelFileType.startsWith('video/')) ||
                (!demoReelFileType &&
                  userProfileData.bannerImg &&
                  isExistingVideo(userProfileData.bannerImg)) ? (
                  <video
                    ref={videoRef}
                    width="320"
                    height="240"
                    controls
                    className="tw-rounded-lg tw-shadow-md"
                  >
                    <source
                      src={
                        demoReelPreview ||
                        (userProfileData.bannerImg &&
                          `${process.env.REACT_APP_AWS_URL}/${userProfileData.bannerImg}`)
                      }
                      type="video/mp4"
                    />
                    {t('Your browser does not support the video tag.')}
                  </video>
                ) : (
                  <img
                    src={
                      demoReelPreview ||
                      (userProfileData.bannerImg &&
                        `${process.env.REACT_APP_AWS_URL}/${userProfileData.bannerImg}`)
                    }
                    alt="Demo Reel"
                    className="tw-h-60 tw-w-80 tw-rounded-lg tw-object-cover tw-shadow-md"
                  />
                )}
              </div>
            )}
          </div>
        )} */
    );
}