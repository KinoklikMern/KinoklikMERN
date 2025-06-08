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
import { faMessage } from '@fortawesome/free-solid-svg-icons';

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
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching filmmaker data
        const filmmakerResponse = await http.get(`/users/getfilmmaker/${id}`);
        const filmmakerData = filmmakerResponse.data;
        setEpkInfo(filmmakerData);

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
  }, [id]);

  // user is added to the list of +(followers)
  function addUserToFollowers() {
    if (userId === '0') {
      alert(t('Please log in first!'));
      return;
    }
    http.post(`/users/follow/${id}/${userId}`).then((res) => {
      setKKFollower(res.data.kkFollowers.length);
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

  return (
    <div className="tw-min-h-screen tw-bg-[#1E0039]">
      <Navbar className={props.className} title={props.title} />

      {/* Main Container */}
      <div className="tw-relative tw-mx-auto tw-max-w-6xl tw-px-4 tw-pb-8">
        {/* Header Section with Background */}
        <div className="tw-relative tw-mt-4 tw-h-64 tw-rounded-t-3xl tw-bg-gradient-to-b tw-from-[#2a0e4a] tw-to-[#1E0039]">
          {/* Background Image/Video Thumbnail */}
          {epkInfo.thumbnail && !epkInfo.thumbnail.startsWith('https') && (
            <div
              className="tw-absolute tw-inset-0 tw-rounded-t-3xl tw-bg-cover tw-bg-center tw-opacity-30"
              style={{
                backgroundImage: `url(${process.env.REACT_APP_AWS_URL}/${epkInfo.thumbnail})`,
              }}
            />
          )}

          {/* Title Overlay */}
          <div className="tw-absolute tw-inset-0 tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-white">
            <h1 className="tw-text-4xl tw-font-bold tw-text-white">
              {epkInfo.firstName} {epkInfo.lastName}
            </h1>
            <p className="tw-mt-2 tw-text-lg">Profile Page</p>
          </div>

          {/* Profile Image */}
          {pics.length > 0 && (
            <div className="tw-absolute tw-bottom-0 tw-left-8 tw-translate-y-1/2">
              <img
                src={`${process.env.REACT_APP_AWS_URL}/${pics[0]}`}
                alt={`${epkInfo.firstName} ${epkInfo.lastName}`}
                className="tw-h-32 tw-w-32 tw-rounded-2xl tw-border-4 tw-border-white tw-bg-white tw-object-cover"
              />
            </div>
          )}
        </div>

        {/* White Content Card */}
        <div className="tw-rounded-b-3xl tw-bg-white tw-px-8 tw-pb-8 tw-pt-20">
          {/* Name and Basic Info */}
          <div className="tw-mb-6">
            <h2 className="tw-mb-2 tw-text-2xl tw-font-bold tw-text-gray-900">
              {epkInfo.firstName} {epkInfo.lastName}
            </h2>
            <div className="tw-flex tw-items-center tw-gap-6 tw-text-gray-600">
              <div className="tw-flex tw-items-center tw-gap-2">
                <span className="tw-text-lg">🎬</span>
                <span>{t('Filmmaker')}</span>
              </div>
              <div className="tw-flex tw-items-center tw-gap-2">
                <span className="tw-text-lg">📍</span>
                <span>{epkInfo.city || 'Montreal'}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="tw-mb-6 tw-flex tw-gap-4">
            <button
              className="tw-flex tw-items-center tw-gap-2 tw-rounded-full tw-border-2 tw-border-[#712cb0] tw-px-6 tw-py-2 tw-text-[#712cb0] tw-transition-colors hover:tw-bg-[#712cb0] hover:tw-text-white"
              onClick={addUserToLikes}
            >
              <span>❤️ {t('Like')}</span>
              <span className="tw-font-bold">{likes}</span>
            </button>

            <button
              className="tw-flex tw-items-center tw-gap-2 tw-rounded-full tw-bg-[#712cb0] tw-px-6 tw-py-2 tw-text-white tw-transition-colors hover:tw-bg-[#5a239a]"
              onClick={addUserToFollowers}
            >
              <span>➕ {t('Follow')}</span>
              <span className="tw-font-bold">{kkFollower}</span>
            </button>

            {!isOwnFilmmakerPage && (
              <button
                className="tw-flex tw-items-center tw-gap-2 tw-rounded-full tw-bg-[#712cb0] tw-px-6 tw-py-2 tw-text-white tw-transition-colors hover:tw-bg-[#5a239a]"
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
