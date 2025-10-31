import React, { useState, useEffect, useRef } from 'react';
import './Actor.css';
import { ReactComponent as WorldIcon } from '../../images/icons/world-icon.svg';
import { ReactComponent as ActorIcon } from '../../images/icons/actor-icon.svg';
import { ReactComponent as HeartIcon } from '../../images/icons/heart-icon.svg';
import { ReactComponent as PlusIcon } from '../../images/icons/plus-icon.svg';
import { ReactComponent as MessageIcon } from '../../images/icons/messages.svg';
import { ReactComponent as RecommendIcon } from '../../images/icons/recommend-icon.svg';

import ActorPageHeader from '../../components/EpkView/EpkHeader/ActorPageHeader';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import starIcon from "../../images/icons/Star FULL.svg";
// import refralIcon from "../../images/icons/referral sign.svg";
import http from '../../http-common';
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from '@mui/icons-material';
// import PlayCircleIcon from '@mui/icons-material/PlayCircle';
// import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
// import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { addToChat } from '../../api/epks';
import { useTranslation } from 'react-i18next';
import { getMoviesByActors } from '../../api/epks';
import emptyBanner from '../../images/empty_banner.jpeg';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { width } from '@mui/system';

export default function Actor(props) {
  const { t } = useTranslation();
  const [epkInfo, setEpkInfo] = useState({});
  const { id } = useParams();
  const [kkFollower, setKKFollower] = useState([]);
  const [range, setRange] = useState(2);
  // const [isMoved, setIsMoved] = useState(false);
  // const [slideNumber, setSlideNumber] = useState(0);
  const [pics, setPics] = useState([]);
  const [indexPic, setPicIndex] = useState(0);
  const [likes, setLikes] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  // const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [allUserList, setAllUserList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilmmakers, setSelectedFilmmakers] = useState([]);
  const videoRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [isModalVisible, setModalVisible] = useState(false);
  const [studioData, setStudioData] = useState(null);
  const [epksList, setEpksList] = useState([]);
  const [showVideoErrorMsg, setShowVideoErrorMsg] = useState(false);

  const navigate = useNavigate();

  // fetching user
  const user = useSelector((state) => state.user);
  let userId;
  if (!user) {
    userId = '0';
  } else {
    userId = user.id;
  }

  const userIsFilmmaker = user && user.role === 'Filmmaker';
  const isOwnActorPage = user && user.id === id;

  const age_range = [
    [20, 24],
    [25, 29],
    [30, 34],
    [35, 39],
    [40, 44],
    [45, 49],
  ];

  function setAge(age) {
    if (age >= 20 && age <= 24) setRange(0);
    else if (age >= 25 && age <= 29) setRange(1);
    else if (age >= 30 && age <= 34) setRange(2);
    else if (age >= 35 && age <= 39) setRange(3);
    else if (age >= 40 && age <= 44) setRange(4);
    else if (age >= 45 && age <= 49) setRange(5);
  }

  useEffect(() => {
    const biography = document.querySelector('.actor-biography');
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
        // Fetching actor and users data
        const [actorResponse, usersResponse] = await Promise.all([
          http.get(`/users/getactor/${id}`),
          http.get('/users/getallusers'),
        ]);

        const actorData = actorResponse.data;
        setEpkInfo(actorData);

        // Check if bannerImg exists and is valid
        if (!actorData.bannerImg || actorData.bannerImg.startsWith('https')) {
          setShowVideoErrorMsg(true);
        }

        const images = actorData.picture.startsWith('https')
          ? []
          : [actorData.picture];

        actorData.profiles.forEach((picture) => {
          if (picture) {
            images.push(picture);
          }
        });

        setPics(images);
        setAge(actorData.age);
        setLikes(actorData.likes.length);
        setKKFollower(actorData.kkFollowers.length);
        setRecommendations(actorData.recommendations);
        setAllUserList(usersResponse.data);

        // Fetch studio data
        const studioResponse = await http.get(
          `${process.env.REACT_APP_BACKEND_URL}/company/getCompanyByUser/${id}`
        );
        if (studioResponse.data) {
          setStudioData(studioResponse.data);
        }

        // Fetch movies by actor
        const movies = await getMoviesByActors(id);
        setEpksList(movies);
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
  // user is recommended to filmmakers
  const recommendToFilmmaker = (filmmaker) => {
    setSelectedFilmmakers((prevSelected) => {
      console.log('Incoming filmmaker:', filmmaker);
      console.log('Previous Selection:', prevSelected);

      const isAlreadySelected = prevSelected.some(
        (selected) => selected._id === filmmaker._id
      );

      if (isAlreadySelected) {
        return prevSelected.filter(
          (selected) => selected._id !== filmmaker._id
        );
      } else {
        return [...prevSelected, filmmaker];
      }
    });
  };

  const sendRecommendations = () => {
    if (!user || !user.token) {
      return console.error('User or user token is not available');
    }
    if (selectedFilmmakers.length === 0) {
      return console.error('No filmmakers selected for recommendation');
    }

    console.log('User Role:', user.role); // Add this
    console.log('Selected Filmmakers:', selectedFilmmakers); // Add this

    const message1 = `Hey, check out this Actor: <a href="/actor/${epkInfo._id}">${epkInfo.firstName} ${epkInfo.lastName}</a>`;
    const message2 = `<a href="/actor/${epkInfo._id}"><img src="${process.env.REACT_APP_AWS_URL}/${pics[indexPic]}" alt="${epkInfo.firstName}" style="width: 60px; height: 70px;" /></a>`;

    Promise.all(
      selectedFilmmakers.map((filmmaker) => {
        return addToChat(message1, user, filmmaker._id).then((res) => {
          if (res && res.status === 200) {
            showModal();
            return addToChat(message2, user, filmmaker._id);
          } else {
            console.error('Unexpected response for message 1', res);
            throw new Error('Unexpected response for message 1');
          }
        });
      })
    )
      .then(() => {
        addUserToRecommendations(selectedFilmmakers.length);
        setSelectedFilmmakers([]);
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
        (user.role === 'Filmmaker' &&
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
      // Move to the previous image
      setPicIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : pics.length - 1
      );
    } else if (direction === 'right') {
      // Move to the next image
      setPicIndex((prevIndex) =>
        prevIndex < pics.length - 1 ? prevIndex + 1 : 0
      );
    }
  };

  // const playVideo = () => {
  //   const video = videoRef.current;
  //   if (video && video.src) {
  //     if (video.paused) {
  //       video
  //         .play()
  //         .then(() => {
  //           setIsPlaying(true);
  //           setShowVideoErrorMsg(false);
  //         })
  //         .catch((error) => {
  //           console.error('Error playing video:', error);
  //           setShowVideoErrorMsg(true);
  //         });
  //     } else {
  //       video.pause();
  //       setIsPlaying(false);
  //     }
  //   } else {
  //     setShowVideoErrorMsg(true);
  //   }
  // };

  const displaySex = (sex) => {
    switch (sex) {
      case 'Male':
        return 'M';
      case 'Female':
        return 'F';
      default:
        return 'N/A';
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

    <div className="tw-w-9/10 tw-mx-auto tw-max-w-full  tw-px-4  tw-bg-[#1E0039]  ">
      <div className="actor-top-container">
        <Navbar className={props.className} title={props.title} />
      </div>

      <div className="actor-navbar">
        <ActorPageHeader epkInfo={epkInfo} role="actor" id={id} />
      </div>

      {/* video and image section */}
      <div className="tw-hidden md:tw-flex tw-gap-5">

        <div
          className={`tw-relative ${pics.length > 0 ? 'tw-w-1/3' : 'tw-hidden'}  tw-aspect-[16/9] tw-bg-cover tw-bg-center tw-rounded-xl`}
          style={{
            backgroundImage: `url(${process.env.REACT_APP_AWS_URL}/${pics[indexPic]})`
          }}
        >

          <ArrowBackIosOutlined
            className="tw-absolute tw-left-0 tw-top-1/2 tw--translate-y-1/2  tw-cursor-pointer tw-text-3xl xs:tw-text-xl  sm:tw-text-2xl  tw-text-white "
            onClick={() => handleClick('left')}
          />
          <ArrowForwardIosOutlined
            className="tw-absolute tw-right-0 tw-top-1/2 tw--translate-y-1/2  tw-cursor-pointer tw-text-3xl xs:tw-text-xl  sm:tw-text-2xl  tw-text-white "
            onClick={() => handleClick('right')}
          />
        </div>


        <div className={` tw-relative tw-aspect-[16/9] ${epkInfo.bannerImg ? 'tw-w-full' : 'tw-hidden'}  `} >
          <video
            loop
            ref={videoRef}
            className="tw-w-full tw-h-full tw-object-cover !tw-pt-0  !tw-rounded-xl "
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
          />

          {showVideoErrorMsg && (
            <p className=" tw-absolute md:tw-txsm:tw-text-[15px] xsm:tw-text-[5px] tw-left-1/2 tw-top-1/2 tw--translate-x-1/2 tw--translate-y-1/2 tw-text-[10px] tw-text-white sm:tw-text-[10px] lg:tw-text-[20px]">
              Video source not available
            </p>
          )}
        </div>
      </div>



      {/* Actor's Image for Small Screens */}
      {pics.length > 0 && (
        <div
          className="tw-rounded-[40px] tw-relative tw-block tw-h-[500px] tw-w-full tw-bg-[#1e0039] tw-bg-cover md:tw-hidden"
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

      <div className="tw-mb-[5%] tw-mt-[3%] tw-h-auto tw-rounded-[40px] tw-bg-white">
        {/* Reordered Content for Small Screens */}
        {/* <div className="tw-grid tw-grid-cols-1 tw-gap-4 tw-p-4 md:tw-hidden">
          <div className="tw-flex tw-items-center tw-justify-around">
            <div className="tw-flex tw-items-center tw-gap-4">
              <p className="tw-text-md tw-text-center tw-font-bold tw-text-black">
                {t('Actor')}
              </p>
              <p className="tw-text-md tw-text-center tw-font-bold tw-text-black">
                {displaySex(epkInfo.sex)}
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
        </div> */}

        {/* refactored by Armita*/}

        <div className='tw-grid tw-grid-cols-[auto_1fr] grid-rows-[auto_1fr] tw-gap-y-16 tw-gap-x-8 lg:tw-gap-x-16 xl:tw-gap-x-64 tw-py-8 tw-px-4 sm:tw-px-6 lg:tw-px-12 xl:tw-px-24  tw-text-midnight tw-font-bold tw-font-roboto'>
          <div id='profile-header' className='tw-col-span-2 tw-flex tw-flex-wrap tw-items-center tw-justify-evenly ' >
            <p className='tw-text-3xl lg:tw-text-[2.5rem] tw-basis-full lg:tw-basis-auto  tw-flex tw-justify-center tw-mb-4'>
              {epkInfo.firstName} {epkInfo.lastName}
            </p>

            <button className=' tw-relative tw-p-[3px] tw-rounded-[90px] tw-bg-gradient-to-r tw-from-[#E938C2] tw-to-midnight'
              onClick={addUserToLikes}>
              <div className='tw-flex tw-gap-2 sm:tw-gap-3 tw-bg-white  tw-py-2 tw-px-2  md:tw-px-4  tw-rounded-[90px] tw-items-center'>
                <HeartIcon />
                <span className='tw-inline-block tw-text-[1rem]' >
                  {t('Like')}
                </span>
              </div>
              <p className="tw-absolute tw-top-[-12px] tw-right-[-12px]   tw-text-[1rem]">
                {likes}
              </p>
            </button>

            <button className=' tw-relative tw-p-[3px] tw-rounded-[90px] tw-bg-gradient-to-r tw-from-[#E938C2] tw-to-midnight'
              onClick={addUserToFollowers}>
              <div className='tw-flex tw-gap-2 sm:tw-gap-3 tw-bg-white  tw-py-2 tw-px-2 md:tw-px-4  tw-rounded-[90px] tw-items-center'>
                <PlusIcon />
                <span className='tw-inline-block tw-text-[1rem]'>
                  {t('Follow')}
                </span>
              </div>
              <p className="tw-absolute tw-top-[-12px] tw-right-[-12px]   tw-text-[1rem]">
                {kkFollower}
              </p>
            </button>

            <button className='tw- tw-relative tw-p-[3px] tw-rounded-[90px] tw-bg-gradient-to-r tw-from-[#E938C2] tw-to-midnight'
              onClick={openModal}
              disabled={epkInfo._id === (user ? user.id : null)}>
              <div className='tw-flex tw-gap-2 sm:tw-gap-3 tw-bg-white  tw-py-2 tw-px-2 md:tw-px-4  tw-rounded-[90px] tw-items-center'>
                <RecommendIcon />
                <span className='tw-inline-block tw-text-[1rem]' >
                  {t('Recommend')}
                </span>
              </div>
              <p className="tw-absolute tw-top-[-12px] tw-right-[-12px]  tw-text-[1rem] tw-font-bold">
                {recommendations}
              </p>
            </button>
            {!isOwnActorPage && (
              <button className='tw-p-[3px] tw-rounded-[90px] tw-bg-gradient-to-r tw-from-[#E938C2] tw-to-midnight'
                onClick={() => {
                  const chatUrl = userIsFilmmaker
                    ? `/dashboard/chat/${id}`
                    : `/userdashboard/chat/${id}`;
                  navigate(chatUrl);
                }}>
                <div className='tw-flex tw-gap-2 sm:tw-gap-3 tw-bg-white  tw-py-2 tw-px-2 md:tw-px-4  tw-rounded-[90px] tw-items-center'>
                  <MessageIcon />
                  <span>{t('Message')}</span>
                </div>
              </button>
            )}
          </div>

          <div id="biometric-section"
            className="tw-row-start-2 tw-col-start-1 tw-grid tw-grid-cols-2 tw-gap-x-16 tw-gap-y-2 tw-items-start tw-text-[1.125rem]">

            {/* first row*/}
            <div className="tw-flex tw-gap-2 tw-items-center">
              <ActorIcon />
              <p className='tw-text-2xl'>{t('Actor')}</p>
            </div>

            <div className="tw-flex tw-gap-2 tw-items-center">
              <WorldIcon />
              <span>{epkInfo.city || 'Montreal'}</span>
            </div>

            <p>{t('Age-Range')}</p>
            <p className='tw-font-normal'>{age_range[range][0]} - {age_range[range][1]}</p>

            <p>{t('Ethnicity')}</p>
            <p className='tw-font-normal'>{epkInfo.ethnicity}</p>

            <p>{t('Hair Color')}</p>
            <p className='tw-font-normal'> {epkInfo.hairColor}</p>

            <p>{t('Eye Color')}</p>
            <p className='tw-font-normal'>{epkInfo.eyesColor}</p>

            <p>{t('Body Build')}</p>
            <p className='tw-font-normal'>{epkInfo.bodyBuild}</p>

            <p>{t('Height')}</p>
            <p className='tw-font-normal'>{epkInfo.height}</p>
          </div>

          <div id='biography-section' className='xl:tw-w-[75%] xl:tw-justify-self-end tw-row-start-2 tw-col-start-2 tw-flex tw-flex-col tw-gap-8  '>
            {studioData && (
              <div id='respresented' className='tw-flex tw-justify-between tw-text-[1.125rem]'>
                <p>{t('Represented by:')}</p>
                <p>
                  {studioData ? studioData.name || 'N/A' : ''}
                </p>
              </div>
            )}
            <div className='tw-text-sm tw-font-normal tw-italic tw-p-5 tw-rounded-[1.25rem] tw-shadow-[3px_3px_10px_0_#712CB0]'>
              <p>{epkInfo.aboutMe}</p>
            </div>
          </div>
          {/* actor modal */}
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
              <h2>{t('Recommend Actor To Filmmaker')}:</h2>
              <input
                type="text"
                className="form-control shared-styles"
                value={searchValue}
                placeholder={t('Search name ...')}
                onChange={handleSearch}
              />
              <div className="selected-filmmakers-display">
                {selectedFilmmakers.map((filmmaker, index) => (
                  <div key={index} className="selected-filmmaker-display">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src={filmmaker.picture}
                        alt={filmmaker.firstName}
                        style={{
                          display: 'inline',
                          maxWidth: '100%',
                          height: 'auto',
                          borderRadius: '50%',
                          marginRight: '10px',
                        }}
                      />
                      {filmmaker.firstName} {filmmaker.lastName || ''}
                    </div>
                    <button
                      style={{
                        background: 'transparent',
                        marginRight: '30px',
                      }}
                      onClick={() => recommendToFilmmaker(filmmaker)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
              {searchValue && (
                <div className={`results-div shared-styles`}>
                  {filteredData.length > 0 ? (
                    filteredData.map((filmmaker) => (
                      <div
                        key={filmmaker._id}
                        onClick={() => recommendToFilmmaker(filmmaker)}
                        className={
                          selectedFilmmakers.some(
                            (selected) => selected._id === filmmaker._id
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
                            src={filmmaker.picture}
                            alt={`${filmmaker.firstName} ${filmmaker.lastName}`}
                            style={{
                              width: '30px',
                              height: '30px',
                              borderRadius: '25%',
                            }}
                          />
                        </div>
                        <div>
                          {filmmaker.firstName} {filmmaker.lastName || ''}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ padding: '5px' }}>
                      {t('No filmmaker found.')}
                    </div>
                  )}
                </div>
              )}
              {selectedFilmmakers.length > 0 && (
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
        </div>

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
              {/*
            <div
              className="tw-absolute tw-left-1/2 tw-top-1/2 tw-flex tw-transform tw-items-center tw-justify-center tw--translate-x-1/2 tw--translate-y-1/2"
              onClick={playVideo}
              style={{ display: showVideoErrorMsg ? "none" : "flex" }}
            >
              {isPlaying ? (
                <PauseCircleOutlineIcon
                  className=""
                  style={{ color: "#1E0039", fontSize: "3rem" }}
                />
              ) : (
                <PlayCircleIcon
                  className=""
                  style={{ color: "#1E0039", fontSize: "3rem" }}
                />
              )}
            </div>
            */}
            </div>
          ) : null}
          {showVideoErrorMsg && (
            <p className="md:tw-txsm:tw-text-[15px] xsm:tw-text-[5px] tw-absolute tw-left-1/2 tw-top-1/2 tw--translate-x-1/2 tw--translate-y-1/2 tw-transform tw-text-center tw-text-[10px] tw-text-white sm:tw-text-[10px] lg:tw-text-[20px]">
              Video source not available
            </p>
          )}
        </div>

        {/* Current Films by Actor Section */}
        {
          epksList && epksList.length > 0 && (
            <div className="tw-h-[36rem] tw-overflow-x-auto tw-rounded-lg tw-bg-white tw-p-4 tw-text-center">
              {/* <p className="tw-py-4 tw-font-semibold">
                {t('Current films by actor')}{' '}
                <span style={{ fontWeight: 'bolder' }}>
                  {epkInfo.firstName} {epkInfo.lastName}
                </span>
              </p> */}
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
                            ? epk.banner_url.startsWith('https')
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
          )
        }
      </div >
      {/*end main container */}
      <Footer />
    </div >
  );
}
