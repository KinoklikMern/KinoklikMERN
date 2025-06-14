/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import '../Actor/Actor.css';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import http from '../../http-common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { getFepksByFilmmakerId } from '../../api/epks';
import emptyBanner from '../../images/empty_banner.jpeg';
import {
  faMessage,
  faGlobe,
  faPlay,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookSquare,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import Audience from '../../images/audienceIcon.svg';

export default function Filmmaker(props) {
  const { t } = useTranslation();
  const [epkInfo, setEpkInfo] = useState({});
  const { id } = useParams();
  const [kkFollower, setKKFollower] = useState([]);
  const [pics, setPics] = useState([]);
  const [likes, setLikes] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [studioData, setStudioData] = useState(null);
  const [epksList, setEpksList] = useState([]);
  const [userHasLiked, setUserHasLiked] = useState(false);
  const [userIsFollowing, setUserIsFollowing] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const navigate = useNavigate();

  // Social Media States
  const [socialMediafollowerTotalNum, setSocialMediaFollowerTotalNum] =
    useState(0);
  const [socialMediasList, setSocialMediasList] = useState([
    {
      name: 'facebook',
      fontawesome_icon: faFacebookSquare,
      followers: 0,
      color: '#285FB2',
    },
    {
      name: 'instagram',
      fontawesome_icon: faInstagram,
      followers: 0,
      color: '#E938C2',
    },
    {
      name: 'twitter',
      fontawesome_icon: faTwitter,
      followers: 0,
      color: '#4FBAF7',
    },
  ]);

  // fetching user
  const user = useSelector((state) => state.user);
  let userId;
  if (!user) {
    userId = '0';
  } else {
    userId = user.id;
  }

  const userIsActor = user && user.role === 'Actor';
  const isOwnFilmmakerPage = user && user.id === id;

  // Helper function to check if bannerImg is a video
  const isVideo = (bannerImg) => {
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

  // Get full video URL
  const getVideoUrl = () => {
    if (!epkInfo.bannerImg) return '';
    return epkInfo.bannerImg.startsWith('https')
      ? epkInfo.bannerImg
      : `${process.env.REACT_APP_AWS_URL}/${epkInfo.bannerImg}`;
  };

  // Get banner image URL
  const getBannerUrl = () => {
    if (!epkInfo.bannerImg) return '';
    return epkInfo.bannerImg.startsWith('https')
      ? epkInfo.bannerImg
      : `${process.env.REACT_APP_AWS_URL}/${epkInfo.bannerImg}`;
  };

  // Format number function
  function formatCompactNumber(number) {
    if (number < 1000) {
      return number;
    } else if (number >= 1000 && number < 1_000_000) {
      return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    } else if (number >= 1_000_000 && number < 1_000_000_000) {
      return (number / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (number >= 1_000_000_000 && number < 1_000_000_000_000) {
      return (number / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
    } else if (number >= 1_000_000_000_000 && number < 1_000_000_000_000_000) {
      return (number / 1_000_000_000_000).toFixed(1).replace(/\.0$/, '') + 'T';
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching filmmaker data
        const filmmakerResponse = await http.get(`/users/getfilmmaker/${id}`);
        const filmmakerData = filmmakerResponse.data;
        setEpkInfo(filmmakerData);
        console.log('Filmmaker Data:', filmmakerData);

        const images =
          filmmakerData.picture && !filmmakerData.picture.startsWith('https')
            ? [filmmakerData.picture]
            : [];

        if (filmmakerData.profiles) {
          filmmakerData.profiles.forEach((picture) => {
            if (picture) {
              images.push(picture);
            }
          });
        }

        setPics(images);
        setLikes(filmmakerData.likes?.length || 0);
        setKKFollower(filmmakerData.kkFollowers?.length || 0);
        setRecommendations(filmmakerData.recommendations || 0);

        // Check if current user has liked or followed this filmmaker
        if (userId !== '0') {
          setUserHasLiked(filmmakerData.likes?.includes(userId) || false);
          setUserIsFollowing(
            filmmakerData.kkFollowers?.includes(userId) || false
          );
        }

        // Fetch social media followers
        try {
          const followersResponse = await http.get(`/users/getfollower/${id}`);
          const followers = followersResponse.data;

          const facebookFollowers = parseInt(followers.facebook) || 0;
          const instagramFollowers = parseInt(followers.instagram) || 0;
          const twitterFollowers = parseInt(followers.twitter) || 0;

          const totalFollowers =
            facebookFollowers + instagramFollowers + twitterFollowers;

          const updatedSocialMediasList = socialMediasList.map((media) => {
            let followerCount = 0;
            if (media.name === 'facebook') {
              followerCount = facebookFollowers || 0;
            } else if (media.name === 'instagram') {
              followerCount = instagramFollowers || 0;
            } else if (media.name === 'twitter') {
              followerCount = twitterFollowers || 0;
            }
            return { ...media, followers: formatCompactNumber(followerCount) };
          });

          setSocialMediasList(updatedSocialMediasList);
          setSocialMediaFollowerTotalNum(formatCompactNumber(totalFollowers));
        } catch (error) {
          console.log('Error fetching social media followers:', error);
          // Use dummy data if API doesn't exist yet
          setSocialMediasList([
            {
              ...socialMediasList[0],
              followers: formatCompactNumber(
                filmmakerData.facebookFollowers || 0
              ),
            },
            {
              ...socialMediasList[1],
              followers: formatCompactNumber(
                filmmakerData.instagramFollowers || 0
              ),
            },
            {
              ...socialMediasList[2],
              followers: formatCompactNumber(
                filmmakerData.twitterFollowers || 0
              ),
            },
          ]);
          const total =
            (filmmakerData.facebookFollowers || 0) +
            (filmmakerData.instagramFollowers || 0) +
            (filmmakerData.twitterFollowers || 0);
          setSocialMediaFollowerTotalNum(formatCompactNumber(total));
        }

        // Fetch studio data
        try {
          const studioResponse = await http.get(
            `${process.env.REACT_APP_BACKEND_URL}/company/getCompanyByUser/${id}`
          );
          if (studioResponse.data) {
            setStudioData(studioResponse.data);
          }
        } catch (error) {
          console.log('No studio data found');
        }

        // Fetch movies by filmmaker
        try {
          const movies = await getFepksByFilmmakerId(id);
          setEpksList(movies);
        } catch (error) {
          console.log('Error fetching filmmaker movies:', error);
          setEpksList([]);
        }
      } catch (error) {
        console.error('An error occurred while fetching data.', error);
      }
    };

    fetchData();
  }, [id, userId]);

  // user is added to the list of +(followers)
  function addUserToFollowers() {
    if (userId === '0') {
      alert(t('Please log in first!'));
      return;
    }
    http.post(`/users/follow/${id}/${userId}`).then((res) => {
      setKKFollower(res.data.kkFollowers.length);
      setUserIsFollowing(res.data.kkFollowers.includes(userId));
    });
  }

  // user is added to the list of star(likes)
  function addUserToLikes() {
    if (userId === '0') {
      alert(t('Please log in first!'));
      return;
    }
    http.post(`/users/like/${id}/${userId}`).then((res) => {
      setLikes(res.data.likes.length);
      setUserHasLiked(res.data.likes.includes(userId));
    });
  }

  const handleMessage = () => {
    if (userId === '0') {
      alert(t('Please log in first!'));
      return;
    }
    const chatUrl = userIsActor
      ? `/userdashboard/chat/${id}`
      : `/dashboard/chat/${id}`;
    navigate(chatUrl);
  };

  const handlePlayVideo = () => {
    setShowVideoModal(true);
  };

  const handleCloseVideo = () => {
    setShowVideoModal(false);
  };

  const getButtonClasses = () => {
    return 'tw-relative tw-inline-flex tw-p-[2px] tw-rounded-full tw-bg-gradient-to-r tw-from-[#E938C2] tw-to-[#1E0039]';
  };

  const getButtonInnerClasses = (isActive) => {
    const baseClasses =
      'tw-flex tw-items-center tw-justify-center tw-gap-1 sm:tw-gap-2 tw-rounded-full tw-px-3 sm:tw-px-6 tw-py-2 tw-text-xs sm:tw-text-sm tw-font-medium tw-transition-all tw-duration-200';

    if (isActive) {
      return `${baseClasses} tw-bg-gradient-to-r tw-from-[#E938C2] tw-to-[#1E0039] tw-text-white`;
    }

    return `${baseClasses} tw-bg-white tw-text-[#712cb0] hover:tw-text-[#5a239a]`;
  };

  return (
    <div className="tw-min-h-screen tw-bg-[#1E0039]">
      <Navbar className={props.className} title={props.title} />

      {/* Video Modal */}
      {showVideoModal && (
        <div className="tw-fixed tw-inset-0 tw-z-50 tw-flex tw-items-center tw-justify-center tw-bg-black tw-bg-opacity-90">
          <div className="tw-relative tw-w-full tw-max-w-6xl tw-px-4">
            {/* Close Button */}
            <button
              onClick={handleCloseVideo}
              className="tw-absolute tw-right-4 tw-top-4 tw-z-10 tw-rounded-full tw-bg-black tw-bg-opacity-50 tw-p-2 tw-text-white tw-transition-colors hover:tw-bg-opacity-70"
            >
              <FontAwesomeIcon icon={faTimes} className="tw-text-xl" />
            </button>

            {/* Video Player */}
            <video
              controls
              autoPlay
              className="tw-h-auto tw-max-h-[80vh] tw-w-full tw-rounded-lg"
              src={getVideoUrl()}
            >
              {t('Your browser does not support the video tag.')}
            </video>
          </div>
        </div>
      )}

      {/* Social Media Total Audience Reach Section */}
      <div className="tw-mx-auto tw-my-8 tw-max-w-[100rem] tw-rounded-2xl tw-bg-[#1E0039] tw-p-6">
        <div className="tw-flex tw-flex-col tw-items-center tw-gap-6 md:tw-flex-row md:tw-justify-between">
          {/* Total Reach */}
          <div className="tw-flex tw-items-center tw-gap-4">
            <div className="tw-text-center md:tw-text-left">
              <h3 className="tw-text-lg tw-font-semibold tw-text-white/90">
                {t('Total Audience Reach')}
              </h3>
              <p className="tw-text-3xl tw-font-bold tw-text-white">
                {socialMediafollowerTotalNum}
              </p>
            </div>
            <img
              src={Audience}
              alt="audience icon"
              className="tw-h-12 tw-w-12 tw-opacity-90"
            />
          </div>

          {/* Social Media Breakdown */}
          <div className="tw-flex tw-gap-12">
            {socialMediasList.map((media, index) => (
              <div
                key={index}
                className="tw-flex tw-items-center tw-gap-6 tw-rounded-lg tw-bg-white/10 tw-p-3 tw-backdrop-blur-sm"
              >
                <FontAwesomeIcon
                  icon={media.fontawesome_icon}
                  className="tw-mb-1 tw-text-2xl"
                  style={{ color: media.color }}
                />
                <span className="tw-text-sm tw-font-semibold tw-text-white">
                  {media.followers}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="tw-relative tw-mx-auto tw-max-w-[100rem] tw-px-4 tw-pb-8">
        {/* Header Section with Background */}
        <div className="tw-relative tw-mt-4 tw-h-96 tw-overflow-hidden tw-rounded-t-3xl tw-bg-gradient-to-b tw-from-[#2a0e4a] tw-to-[#1E0039]">
          {/* Background Image/Video bannerImg */}
          {epkInfo.bannerImg && (
            <>
              {isVideo(epkInfo.bannerImg) ? (
                <>
                  {/* Video Background */}
                  <video
                    src={getVideoUrl()}
                    muted
                    loop
                    playsInline
                    className="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-object-cover tw-opacity-40"
                    style={{ filter: 'brightness(0.7)' }}
                  />

                  {/* Play Button Overlay */}
                  <div className="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center">
                    <button
                      onClick={handlePlayVideo}
                      className="tw-group tw-flex tw-h-20 tw-w-20 tw-items-center tw-justify-center tw-rounded-full tw-bg-white tw-bg-opacity-20 tw-backdrop-blur-sm tw-transition-all tw-duration-300 hover:tw-scale-110 hover:tw-bg-opacity-30"
                    >
                      <FontAwesomeIcon
                        icon={faPlay}
                        className="tw-ml-1 tw-text-3xl tw-text-white tw-transition-all tw-duration-300 group-hover:tw-text-4xl"
                      />
                    </button>
                  </div>

                  {/* Demo Reel Label */}
                  <div className="tw-absolute tw-right-4 tw-top-4">
                    <span className="tw-rounded-full tw-bg-black/50 tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-white tw-backdrop-blur-sm">
                      {t('Demo Reel')}
                    </span>
                  </div>
                </>
              ) : (
                /* Image Background */
                <div
                  className="tw-absolute tw-inset-0 tw-bg-cover tw-bg-center tw-opacity-40"
                  style={{
                    backgroundImage: `url(${getBannerUrl()})`,
                    filter: 'brightness(0.7)',
                  }}
                />
              )}
            </>
          )}
        </div>

        {/* Profile Image - Now outside the banner container */}
        {pics.length > 0 && (
          <div
            className="tw-absolute tw-left-12 tw-top-[calc(100%-76px)] tw-z-10"
            style={{ top: 'calc(384px + 1rem - 76px)' }}
          >
            <img
              src={`${process.env.REACT_APP_AWS_URL}/${pics[0]}`}
              alt={`${epkInfo.firstName} ${epkInfo.lastName}`}
              className="tw-h-32 tw-w-32 tw-rounded-2xl tw-border-4 tw-border-white tw-bg-white tw-object-cover tw-shadow-lg"
            />
          </div>
        )}

        {/* White Content Card */}
        <div className="tw-rounded-b-3xl tw-bg-white tw-px-8 tw-pb-8 tw-pt-20">
          {/* Name and Basic Info */}
          <div className="tw-mb-6">
            <h2 className="tw-mb-2 tw-text-2xl tw-font-bold tw-text-gray-900">
              {epkInfo.firstName} {epkInfo.lastName}
            </h2>
            <div className="tw-flex tw-items-center tw-gap-6 tw-text-gray-600">
              <div className="tw-flex tw-items-center tw-gap-2 tw-font-bold">
                <span className="tw-text-lg">🎬</span>
                <span>{t('Filmmaker')}</span>
              </div>
              <div className="tw-flex tw-items-center tw-gap-2 tw-font-bold">
                <FontAwesomeIcon icon={faGlobe} className="tw-text-[#712cb0]" />
                <span>{epkInfo.city || 'Montreal'}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="tw-mb-6 tw-flex tw-flex-wrap tw-gap-2 sm:tw-gap-4">
            {/* Like Button */}
            <button className={getButtonClasses()} onClick={addUserToLikes}>
              <div className={getButtonInnerClasses(userHasLiked)}>
                <span>❤️ {t('Like')}</span>
                <span className="tw-font-bold">{likes}</span>
              </div>
            </button>

            {/* Follow Button */}
            <button className={getButtonClasses()} onClick={addUserToFollowers}>
              <div className={getButtonInnerClasses(userIsFollowing)}>
                <span>➕ {t('Follow')}</span>
                <span className="tw-font-bold">{kkFollower}</span>
              </div>
            </button>

            {!isOwnFilmmakerPage && (
              <button
                className="tw-flex tw-items-center tw-gap-1 tw-rounded-full tw-bg-[#712cb0] tw-px-3 tw-py-2 tw-text-xs tw-text-white tw-transition-colors hover:tw-bg-[#5a239a] sm:tw-gap-2 sm:tw-px-6 sm:tw-text-sm"
                onClick={handleMessage}
              >
                <FontAwesomeIcon icon={faMessage} />
                <span>{t('Message')}</span>
              </button>
            )}
          </div>

          {/* Contact Information */}
          {(epkInfo.website || epkInfo.email || epkInfo.phone) && (
            <div className="tw-mb-6 tw-flex tw-flex-wrap tw-gap-4 tw-text-gray-600">
              {epkInfo.website && (
                <a
                  href={epkInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tw-flex tw-items-center tw-gap-2 tw-text-[#712cb0] tw-transition-colors hover:tw-text-[#5a239a]"
                >
                  <span>🌐</span>
                  <span className="hover:tw-underline">{epkInfo.website}</span>
                </a>
              )}
              {epkInfo.email && (
                <a
                  href={`mailto:${epkInfo.email}`}
                  className="tw-flex tw-items-center tw-gap-2 tw-text-[#712cb0] tw-transition-colors hover:tw-text-[#5a239a]"
                >
                  <span>✉️</span>
                  <span className="hover:tw-underline">{epkInfo.email}</span>
                </a>
              )}
              {epkInfo.phone && (
                <span className="tw-flex tw-items-center tw-gap-2 tw-text-gray-700">
                  <span>📱</span>
                  <span>{epkInfo.phone}</span>
                </span>
              )}
            </div>
          )}

          {/* Biography */}
          {epkInfo.aboutMe && (
            <div className="tw-mb-8">
              <h3 className="tw-mb-3 tw-text-lg tw-font-semibold tw-text-gray-800">
                {t('About')}
              </h3>
              <div className="tw-rounded-lg tw-border tw-border-gray-100 tw-bg-gray-50 tw-p-4">
                <p className="tw-leading-relaxed tw-text-gray-700">
                  {epkInfo.aboutMe}
                </p>
              </div>
            </div>
          )}

          {/* Film Projects Section */}
          {epksList && epksList.length > 0 && (
            <div className="tw-border-t tw-pt-6">
              <h3 className="tw-mb-4 tw-text-xl tw-font-semibold">
                {t('Film Projects by this Filmmaker')}
              </h3>
              <div className="scrollbar-hide tw-flex tw-gap-4 tw-overflow-x-auto tw-pb-4">
                {epksList.map((epk) => (
                  <a
                    key={epk._id}
                    href={`/epk/${epk._id}`}
                    className="tw-group tw-flex-shrink-0"
                  >
                    <div className="tw-relative tw-overflow-hidden tw-rounded-lg">
                      <img
                        src={
                          epk.image_details
                            ? epk.banner_url?.startsWith('https')
                              ? epk.image_details
                              : `${process.env.REACT_APP_AWS_URL}/${epk.image_details}`
                            : emptyBanner
                        }
                        alt={epk.title}
                        className="tw-h-72 tw-w-48 tw-object-cover tw-transition-transform tw-duration-300 group-hover:tw-scale-105"
                      />
                      <div className="tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-bg-gradient-to-t tw-from-black/80 tw-to-transparent tw-p-3">
                        <p className="tw-truncate tw-text-sm tw-font-semibold tw-text-white">
                          {epk.title}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
