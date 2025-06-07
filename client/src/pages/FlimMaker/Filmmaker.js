/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import '../Actor/Actor.css';
import worldIcon from '../../images/icons/noun-world-icon.svg';
import ActorPageHeader from '../../components/EpkView/EpkHeader/ActorPageHeader';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import http from '../../http-common';
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from '@mui/icons-material';
import StarIcon from '@mui/icons-material/Star';
import AddIcon from '@mui/icons-material/Add';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { addToChat } from '../../api/epks';
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
  const [indexPic, setPicIndex] = useState(0);
  const [likes, setLikes] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [allUserList, setAllUserList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedActors, setSelectedActors] = useState([]);
  const videoRef = useRef(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [studioData, setStudioData] = useState(null);
  const [epksList, setEpksList] = useState([]);
  const [showVideoErrorMsg, setShowVideoErrorMsg] = useState(false);
  const [totalAudienceReach, setTotalAudienceReach] = useState({
    total: 0,
    instagram: 0,
    facebook: 0,
    twitter: 0,
    youtube: 0,
  });

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

  // Format numbers for display (e.g., 1000 -> 1k)
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return Math.floor(num / 1000000) + 'M';
    } else if (num >= 1000) {
      return Math.floor(num / 1000) + 'k';
    }
    return num.toString();
  };

  useEffect(() => {
    const biography = document.querySelector('.filmmaker-biography');
    if (biography) {
      const contentLength = biography.textContent.length;
      console.log('Biography Character Length: ' + contentLength);
      if (contentLength > 500) {
        biography.classList.add('scrollable');
      }
    }
  }, [epkInfo]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const handlePlay = () => setIsVideoPlaying(true);
      const handlePause = () => setIsVideoPlaying(false);
      const handleEnded = () => setIsVideoPlaying(false);

      videoElement.addEventListener('play', handlePlay);
      videoElement.addEventListener('pause', handlePause);
      videoElement.addEventListener('ended', handleEnded);

      return () => {
        videoElement.removeEventListener('play', handlePlay);
        videoElement.removeEventListener('pause', handlePause);
        videoElement.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching filmmaker and users data
        const [filmmakerResponse, usersResponse] = await Promise.all([
          http.get(`/users/getfilmmaker/${id}`),
          http.get('/users/getallusers'),
        ]);

        const filmmakerData = filmmakerResponse.data;
        setEpkInfo(filmmakerData);

        // Check if bannerImg exists and is valid
        if (
          !filmmakerData.bannerImg ||
          filmmakerData.bannerImg.startsWith('https')
        ) {
          setShowVideoErrorMsg(true);
        }

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
        setAllUserList(usersResponse.data);

        // Calculate total audience reach
        const socialMedia = {
          instagram: parseInt(filmmakerData.instagram_followers) || 0,
          facebook: parseInt(filmmakerData.facebook_followers) || 0,
          twitter: parseInt(filmmakerData.twitter_followers) || 0,
          youtube: parseInt(filmmakerData.youtube_subs) || 0,
        };

        const total = Object.values(socialMedia).reduce(
          (sum, count) => sum + count,
          0
        );
        setTotalAudienceReach({
          total,
          ...socialMedia,
        });

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

  // user is added to the list of recommendations
  const addUserToRecommendations = (count) => {
    http.post(`/users/recommend/${id}`, { count }).then((res) => {
      setRecommendations(res.data.recommendations);
    });
  };

  // filmmaker is recommended to actors
  const recommendToActor = (actor) => {
    setSelectedActors((prevSelected) => {
      console.log('Incoming actor:', actor);
      console.log('Previous Selection:', prevSelected);

      const isAlreadySelected = prevSelected.some(
        (selected) => selected._id === actor._id
      );

      if (isAlreadySelected) {
        return prevSelected.filter((selected) => selected._id !== actor._id);
      } else {
        return [...prevSelected, actor];
      }
    });
  };

  const sendRecommendations = () => {
    if (!user || !user.token) {
      return console.error('User or user token is not available');
    }
    if (selectedActors.length === 0) {
      return console.error('No actors selected for recommendation');
    }

    console.log('User Role:', user.role);
    console.log('Selected Actors:', selectedActors);

    const message1 = `Hey, check out this Filmmaker: <a href="/filmmaker/${epkInfo._id}">${epkInfo.firstName} ${epkInfo.lastName}</a>`;
    const message2 = `<a href="/filmmaker/${epkInfo._id}"><img src="${process.env.REACT_APP_AWS_URL}/${pics[indexPic]}" alt="${epkInfo.firstName}" style="width: 60px; height: 70px;" /></a>`;

    Promise.all(
      selectedActors.map((actor) => {
        return addToChat(message1, user, actor._id).then((res) => {
          if (res && res.status === 200) {
            showModal();
            return addToChat(message2, user, actor._id);
          } else {
            console.error('Unexpected response for message 1', res);
            throw new Error('Unexpected response for message 1');
          }
        });
      })
    )
      .then(() => {
        addUserToRecommendations(selectedActors.length);
        setSelectedActors([]);
        closeModal();
      })
      .catch((error) => {
        console.error('Error sending recommendations:', error);
      });
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    const searchWord = event.target.value.toLowerCase();

    const newFilter = allUserList.filter((user) => {
      const firstName = user.firstName.toLowerCase();
      const lastName = user.lastName.toLowerCase();
      return (
        (user.role === 'Actor' &&
          Array.from({ length: searchWord.length }).every(
            (_, index) => firstName[index] === searchWord[index]
          )) ||
        Array.from({ length: searchWord.length }).every(
          (_, index) => lastName[index] === searchWord[index]
        )
      );
    });
    if (!searchWord.trim() || newFilter.length === 0) {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const handleClick = (direction) => {
    if (direction === 'left') {
      setPicIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : pics.length - 1
      );
    } else if (direction === 'right') {
      setPicIndex((prevIndex) =>
        prevIndex < pics.length - 1 ? prevIndex + 1 : 0
      );
    }
  };

  const openModal = () => {
    if (userId === '0') {
      alert(t('Please log in first!'));
      return;
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const showModal = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 2500);
  };

  return (
    <div className="tw-bg-[#1E0039]">
      <div className="actor-top-container">
        <Navbar className={props.className} title={props.title} />
      </div>
      <div className="actor-navbar">
        <ActorPageHeader epkInfo={epkInfo} role="filmmaker" id={id} />
      </div>
      <div className="tw-w-9/10 tw-mx-[5%] tw-mb-[5%] tw-h-auto tw-max-w-full tw-rounded-[40px] tw-bg-white">
        {/* Original Layout for Larger Screens */}
        <div className="tw-relative tw-hidden md:tw-block">
          {epkInfo.bannerImg ? (
            <div className="video-container tw-relative">
              <video
                loop
                ref={videoRef}
                className="tw-z-[-1] tw-block tw-h-auto tw-w-full tw-bg-[#1e0039] tw-bg-cover"
                src={
                  epkInfo.bannerImg && !epkInfo.bannerImg.startsWith('https')
                    ? `${process.env.REACT_APP_AWS_URL}/${epkInfo.bannerImg}`
                    : null
                }
                poster={
                  epkInfo.thumbnail && !epkInfo.thumbnail.startsWith('https')
                    ? `${process.env.REACT_APP_AWS_URL}/${epkInfo.thumbnail}`
                    : null
                }
                controls
                playsInline
              ></video>
            </div>
          ) : null}
          {showVideoErrorMsg && (
            <p className="md:tw-txsm:tw-text-[15px] xsm:tw-text-[5px] tw-absolute tw-left-1/2 tw-top-1/2 tw--translate-x-1/2 tw--translate-y-1/2 tw-transform tw-text-center tw-text-[10px] tw-text-white sm:tw-text-[10px] lg:tw-text-[20px]">
              Video source not available
            </p>
          )}
          {pics.length > 0 && !isVideoPlaying && (
            <div
              className="tw-absolute tw-left-0 tw-top-[10%] tw-z-10 tw-h-[80%] tw-w-full md:tw-left-[3%] md:tw-w-[35%]"
              style={{
                backgroundImage: `url(${process.env.REACT_APP_AWS_URL}/${pics[indexPic]})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            >
              <ArrowBackIosOutlined
                className="xs:tw-text-xl tw-absolute tw-left-0 tw-top-1/2 tw--translate-y-1/2 tw-cursor-pointer tw-text-3xl tw-text-white sm:tw-text-2xl"
                onClick={() => handleClick('left')}
              />
              <ArrowForwardIosOutlined
                className="xs:tw-text-xl tw-absolute tw-right-0 tw-top-1/2 tw--translate-y-1/2 tw-cursor-pointer tw-text-3xl tw-text-white sm:tw-text-2xl"
                onClick={() => handleClick('right')}
              />
            </div>
          )}
        </div>

        {/* Filmmaker's Image for Small Screens */}
        {pics.length > 0 && (
          <div
            className="tw-relative tw-block tw-h-[500px] tw-w-full tw-bg-[#1e0039] tw-bg-cover md:tw-hidden"
            style={{
              backgroundImage: `url(${process.env.REACT_APP_AWS_URL}/${pics[indexPic]})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          >
            <ArrowBackIosOutlined
              className="xs:tw-text-xl tw-absolute tw-left-0 tw-top-1/2 tw--translate-y-1/2 tw-cursor-pointer tw-text-3xl tw-text-white sm:tw-text-2xl"
              onClick={() => handleClick('left')}
            />
            <ArrowForwardIosOutlined
              className="xs:tw-text-xl tw-absolute tw-right-0 tw-top-1/2 tw--translate-y-1/2 tw-cursor-pointer tw-text-3xl tw-text-white sm:tw-text-2xl"
              onClick={() => handleClick('right')}
            />
          </div>
        )}

        {/* Reordered Content for Small Screens */}
        <div className="tw-grid tw-grid-cols-1 tw-gap-4 tw-p-4 md:tw-hidden">
          <div className="tw-flex tw-items-center tw-justify-around">
            <div className="tw-flex tw-items-center tw-gap-4">
              <p className="tw-text-md tw-text-center tw-font-bold tw-text-black">
                {t('Filmmaker')}
              </p>
            </div>
            <p className="tw-text-center tw-text-xl tw-font-bold tw-text-black">
              {epkInfo.firstName} {epkInfo.lastName}
            </p>
            <p className="tw-text-md tw-text-center tw-font-bold tw-text-black">
              {epkInfo.city}
            </p>
          </div>

          <div className="tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-center">
            <div className="tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-center tw-justify-center">
              <div className="tw-m-1 tw-flex tw-w-auto tw-flex-col md:tw-m-2">
                <button
                  className="tw-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-full tw-bg-[#712cb0] tw-px-3 tw-py-2 tw-text-[0.7rem] tw-font-bold tw-text-white md:tw-px-4 md:tw-text-[0.85rem]"
                  onClick={addUserToFollowers}
                >
                  {t('Follow')}
                  <AddIcon
                    className="tw-ml-1 tw-h-4 tw-w-4 md:tw-ml-2 md:tw-h-5 md:tw-w-5"
                    style={{ color: 'white' }}
                  />
                </button>
                <p className="follower-number actor-detail-item tw-my-1 tw-text-center tw-text-base tw-font-bold tw-text-black md:tw-text-xl">
                  {kkFollower}
                </p>
              </div>

              <div className="tw-m-1 tw-flex tw-w-auto tw-flex-col md:tw-m-2">
                <button
                  className="tw-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-full tw-bg-[#712cb0] tw-px-3 tw-py-2 tw-text-[0.7rem] tw-font-bold tw-text-white md:tw-px-4 md:tw-text-[0.85rem]"
                  onClick={addUserToLikes}
                >
                  {t('Star')}
                  <StarIcon
                    className="tw-ml-1 tw-h-4 tw-w-4 md:tw-ml-2 md:tw-h-5 md:tw-w-5"
                    style={{ color: 'white' }}
                  />
                </button>
                <p className="follower-number actor-detail-item tw-my-1 tw-text-center tw-text-base tw-font-bold tw-text-black md:tw-text-xl">
                  {likes}
                </p>
              </div>

              <div className="tw-m-1 tw-flex tw-w-auto tw-flex-col md:tw-m-2">
                <button
                  className="tw-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-full tw-bg-[#712cb0] tw-px-3 tw-py-2 tw-text-[0.7rem] tw-font-bold tw-text-white md:tw-px-4 md:tw-text-[0.85rem]"
                  onClick={openModal}
                  disabled={epkInfo._id === (user ? user.id : null)}
                >
                  {t('Recommend')}
                  <ConnectWithoutContactIcon
                    className="tw-ml-1 tw-h-4 tw-w-4 md:tw-ml-2 md:tw-h-5 md:tw-w-5"
                    style={{ color: 'white' }}
                  />
                </button>
                <p className="follower-number actor-detail-item tw-my-1 tw-text-center tw-text-base tw-font-bold tw-text-black md:tw-text-xl">
                  {recommendations}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Original Layout for Larger Screens */}
        <div className="tw-m-4 tw-hidden tw-grid-cols-12 tw-items-center md:tw-grid md:tw-justify-center">
          <p className="tw-col-span-4 tw-text-center tw-text-xl tw-font-bold tw-text-black md:tw-col-span-2">
            {epkInfo.firstName} {epkInfo.lastName}
          </p>
          <p className="tw-text-md tw-col-span-2 tw-text-center tw-font-bold tw-text-black md:tw-col-span-1">
            {t('Filmmaker')}
          </p>
          <p className="tw-text-md tw-col-span-2 tw-text-center tw-font-bold tw-text-black md:tw-col-span-1">
            {epkInfo.city || 'Montreal'}
          </p>
          <div className="tw-col-span-2 tw-flex tw-flex-row tw-items-center md:tw-col-span-1">
            <img src="../Vector.png" alt="" className="tw-h-6 tw-w-9" />
            <p
              className="follower-number actor-detail-item tw-my-0"
              style={{ color: 'black' }}
            >
              {epksList.length}
            </p>
          </div>
          {!isOwnFilmmakerPage && (
            <div className="tw-col-span-2 tw-bg-white tw-text-center tw-text-lg md:tw-col-span-1 md:tw-text-2xl">
              <button
                onClick={() => {
                  const chatUrl = userIsActor
                    ? `/userdashboard/chat/${id}`
                    : `/dashboard/chat/${id}`;
                  navigate(chatUrl);
                }}
                className="tw-bg-white"
              >
                <FontAwesomeIcon
                  icon={faMessage}
                  style={{
                    width: '37px',
                    height: '25px',
                  }}
                />
              </button>
            </div>
          )}
          <button
            className="tw-col-span-6 tw-flex tw-h-9 tw-max-w-[150px] tw-items-center tw-justify-center tw-rounded-full tw-border-none tw-bg-[#712cb0] tw-px-4 tw-text-[0.75rem] tw-font-bold tw-text-white md:tw-col-span-1"
            style={{ justifySelf: 'end' }}
            onClick={addUserToFollowers}
          >
            <span className="tw-hidden md:tw-hidden lg:tw-inline">
              {t('Follow')}
            </span>
            <AddIcon className="actor-page-star" style={{ color: 'white' }} />
          </button>
          <p
            className="follower-number actor-detail-item tw-my-0"
            style={{ fontSize: '24px' }}
          >
            {kkFollower}
          </p>
          <button
            className="tw-col-span-6 tw-flex tw-h-9 tw-max-w-[150px] tw-items-center tw-justify-center tw-rounded-full tw-border-none tw-bg-[#712cb0] tw-px-4 tw-text-[0.75rem] tw-font-bold tw-text-white tw-transition-all tw-duration-200 md:tw-col-span-1"
            style={{ justifySelf: 'end' }}
            onClick={addUserToLikes}
          >
            <span className="tw-hidden md:tw-hidden lg:tw-inline">
              {t('Star')}
            </span>
            <StarIcon className="actor-page-star" style={{ color: 'white' }} />
          </button>
          <p
            className="follower-number actor-detail-item tw-my-0"
            style={{ fontSize: '24px' }}
          >
            {likes}
          </p>
          <button
            className="tw-col-span-6 tw-flex tw-h-9 tw-max-w-[150px] tw-items-center tw-justify-center tw-rounded-full tw-border-none tw-bg-[#712cb0] tw-px-4 tw-text-[0.75rem] tw-font-bold tw-text-white tw-transition-all tw-duration-200 md:tw-col-span-1"
            style={{ justifySelf: 'end' }}
            onClick={openModal}
            disabled={epkInfo._id === (user ? user.id : null)}
          >
            <span className="tw-hidden md:tw-hidden lg:tw-inline">
              {t('Recommend')}
            </span>
            <ConnectWithoutContactIcon
              className="actor-page-star"
              style={{ color: 'white' }}
            />
          </button>
          <div className={`actor-modal ${modalIsOpen ? 'is-open' : ''}`}>
            <div
              className="shared-style"
              style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              <div
                style={{
                  alignSelf: 'flex-end',
                  cursor: 'pointer',
                }}
                onClick={closeModal}
              >
                X
              </div>
              <h2>{t('Recommend Filmmaker To Actor')}:</h2>
              <input
                type="text"
                className="form-control shared-styles"
                value={searchValue}
                placeholder={t('Search name ...')}
                onChange={handleSearch}
              />
              <div className="selected-filmmakers-display">
                {selectedActors.map((actor, index) => (
                  <div key={index} className="selected-filmmaker-display">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src={actor.picture}
                        alt={actor.firstName}
                        style={{
                          display: 'inline',
                          maxWidth: '100%',
                          height: 'auto',
                          borderRadius: '50%',
                          marginRight: '10px',
                        }}
                      />
                      {actor.firstName} {actor.lastName || ''}
                    </div>
                    <button
                      style={{
                        background: 'transparent',
                        marginRight: '30px',
                      }}
                      onClick={() => recommendToActor(actor)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
              {searchValue && (
                <div className={`results-div shared-styles`}>
                  {filteredData.length > 0 ? (
                    filteredData.map((actor) => (
                      <div
                        key={actor._id}
                        onClick={() => recommendToActor(actor)}
                        className={
                          selectedActors.some(
                            (selected) => selected._id === actor._id
                          )
                            ? 'selected-filmmaker'
                            : ''
                        }
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <div
                          style={{
                            marginRight: '30px',
                            marginBottom: '10px',
                          }}
                        >
                          <img
                            src={actor.picture}
                            alt={`${actor.firstName} ${actor.lastName}`}
                            style={{
                              width: '30px',
                              height: '30px',
                              borderRadius: '25%',
                            }}
                          />
                        </div>
                        <div>
                          {actor.firstName} {actor.lastName || ''}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ padding: '5px' }}>{t('No actor found.')}</div>
                  )}
                </div>
              )}
              {selectedActors.length > 0 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '20px',
                  }}
                >
                  <button className="btn-send" onClick={sendRecommendations}>
                    {t('Send')} <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
                </div>
              )}
            </div>
          </div>
          <p
            className="follower-number actor-detail-item tw-my-0"
            style={{ fontSize: '24px' }}
          >
            {recommendations}
          </p>
        </div>

        {/* Biography Section */}
        <div className="filmmaker-biography tw-m-4 tw-rounded-lg tw-bg-white tw-p-4">
          <p>{epkInfo.aboutMe}</p>
        </div>

        {/* Contact Information Section */}
        {(epkInfo.website || epkInfo.email || epkInfo.phone) && (
          <div className="tw-m-4 tw-flex tw-items-center tw-justify-center tw-rounded-lg tw-bg-white md:tw-justify-start md:tw-p-4">
            <div className="tw-flex tw-flex-col tw-gap-2 md:tw-flex-row md:tw-gap-6">
              {epkInfo.website && (
                <a
                  href={epkInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tw-text-[#1E0039] tw-underline"
                >
                  {epkInfo.website}
                </a>
              )}
              {epkInfo.email && (
                <a
                  href={`mailto:${epkInfo.email}`}
                  className="tw-text-[#1E0039] tw-underline"
                >
                  {epkInfo.email}
                </a>
              )}
              {epkInfo.phone && (
                <span className="tw-text-black">{epkInfo.phone}</span>
              )}
            </div>
            <div className="tw-ml-auto tw-hidden md:tw-block">
              <img
                src={worldIcon}
                style={{ width: '55px', height: '45px', display: 'inline' }}
                alt="globe icon"
              />
              <p
                style={{
                  display: 'inline',
                  marginLeft: '10px',
                  color: '#1E0039',
                  fontSize: '24px',
                  fontWeight: '700',
                }}
              >
                {epkInfo.city || 'Montreal'}
              </p>
            </div>
          </div>
        )}

        {/* Video Section for Small Screens */}
        <div className="tw-relative tw-block md:tw-hidden">
          {epkInfo.bannerImg ? (
            <div className="video-container tw-relative">
              <video
                loop
                ref={videoRef}
                className="tw-z-[-1] tw-mb-3 tw-block tw-h-auto tw-w-full tw-rounded-none"
                src={
                  epkInfo.bannerImg && !epkInfo.bannerImg.startsWith('https')
                    ? `${process.env.REACT_APP_AWS_URL}/${epkInfo.bannerImg}`
                    : null
                }
                poster={
                  epkInfo.thumbnail && !epkInfo.thumbnail.startsWith('https')
                    ? `${process.env.REACT_APP_AWS_URL}/${epkInfo.thumbnail}`
                    : null
                }
                controls
                playsInline
              ></video>
            </div>
          ) : null}
          {showVideoErrorMsg && (
            <p className="md:tw-txsm:tw-text-[15px] xsm:tw-text-[5px] tw-absolute tw-left-1/2 tw-top-1/2 tw--translate-x-1/2 tw--translate-y-1/2 tw-transform tw-text-center tw-text-[10px] tw-text-white sm:tw-text-[10px] lg:tw-text-[20px]">
              Video source not available
            </p>
          )}
        </div>

        {/* Social Media/Audience Reach Section */}
        <div className="tw-m-9 tw-hidden tw-grid-cols-2 tw-gap-4 md:tw-grid">
          <p className="tw-font-bold tw-text-black">
            {t('Instagram Followers')}:{' '}
            {formatNumber(totalAudienceReach.instagram)}
          </p>
          <p className="tw-font-bold tw-text-black">
            {t('Facebook Followers')}:{' '}
            {formatNumber(totalAudienceReach.facebook)}
          </p>
          <p className="tw-font-bold tw-text-black">
            {t('Twitter Followers')}: {formatNumber(totalAudienceReach.twitter)}
          </p>
          <p className="tw-font-bold tw-text-black">
            {t('YouTube Subscribers')}:{' '}
            {formatNumber(totalAudienceReach.youtube)}
          </p>
          <p className="tw-font-bold tw-text-black">
            {t('Total Audience Reach')}:{' '}
            {formatNumber(totalAudienceReach.total)}
          </p>
        </div>

        {/* Film Projects Section */}
        {epksList && epksList.length > 0 && (
          <div className="tw-h-[36rem] tw-overflow-x-auto tw-rounded-lg tw-bg-gray-100 tw-p-4 tw-text-center">
            <p className="tw-py-4 tw-font-semibold">
              {t('Film Projects by this Filmmaker')}{' '}
              <span style={{ fontWeight: 'bolder' }}>
                {epkInfo.firstName} {epkInfo.lastName}
              </span>
            </p>
            <div className="tw-flex tw-flex-col tw-gap-4 md:tw-flex-row">
              {epksList.map((epk) => (
                <a
                  key={epk._id}
                  href={`/epk/${epk._id}`}
                  className="tw-block md:tw-inline-block"
                >
                  <div className="listItem tw-py-4 md:tw-py-0">
                    <img
                      src={
                        epk.image_details
                          ? epk.banner_url?.startsWith('https')
                            ? epk.image_details
                            : `${process.env.REACT_APP_AWS_URL}/${epk.image_details}`
                          : emptyBanner
                      }
                      alt={epk.title}
                      className="tw-h-[200px] tw-w-full tw-object-cover md:tw-h-full md:tw-min-w-[300px]"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
