/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef} from 'react';
import EpkHeader from '../components/EpkView/EpkHeader/EpkHeader';
import EpkCover from '../components/EpkView/EpkCover/EpkCover';
import EpkSocialAction from '../components/EpkView/EpkSocialAction/EpkSocialAction';
import EpkDetail from '../components/EpkView/EpkDetail/EpkDetail';
import EpkLogline from '../components/EpkView/EpkLogline/EpkLogline';
import EpkSynopsis from '../components/EpkView/EpkSynopsis/EpkSynopsis';
import EpkUniqueness from '../components/EpkView/EpkUniqueness/EpkUniqueness';
import EpkCast from '../components/EpkView/EpkCast/EpkCast';
import EpkWorker from '../components/EpkView/EpkWorker/EpkWorker';
import EpkResources from '../components/EpkView/EpkResources/EpkResources';
import EpkVideoGallery from '../components/EpkView/EpkVideoGallery/EpkVideoGallery';
import EpkAward from '../components/EpkView/EpkAward/EpkAward';
import DonationModal from '../components/donate/DonationModal';
import RequestModal from '../components/common/Modals/RequestModal';
import LoginModal from '../components/common/Modals/LoginModal';
import NewMessageModal from '../components/common/Modals/NewMessageModal';
import { useParams } from 'react-router-dom';
import { getFepksById } from '../api/epks';
import { useSelector } from 'react-redux';
import { FepkContext } from '../context/FepkContext';
import Banner from '../components/EpkView/EpkBanner/EpkBanner';
import emptyBanner from '../images/empty_banner.jpeg';
import EpkSalesCalculator from '../components/EpkView/EpkSalesCalculator/EpkSalesCaculator';
import EpkPhotoGallery from '../components/EpkView/EpkPhotoGallery/EpkPhotoGallery';
import AnalyticsDataService from "../api/analytics";

function EpkViewPage() {
  const {fepkId, setFepkId, fepkMaker, setFepkMaker} =
    React.useContext(FepkContext);
  const user = useSelector((state) => state.user);
  const [epkInfo, setEpkInfo] = useState();
  const [requestStatus, setRequestStatus] = useState();
  const [refresh, setRefresh] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showDonationModal, setShowDonationModal] = useState(false); // State to control donation form visibility
  const [globalTotalReach, setGlobalTotalReach] = useState(0);

  //let { title } = useParams();
  let { id } = useParams();

  // Refs for photo and video elements
  const photoRef = useRef(null);
  const videoRef = useRef(null);

  // Scroll handlers for photo and video sections
  const scrollToPhotos = () => photoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const scrollToVideos = () => videoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const handleClose = (modalType) => {
    if (user) {
      // eslint-disable-next-line default-case
      switch (modalType) {
        case 'message':
          setShowMessageModal(false);
          break;

        case 'request':
          setShowRequestModal(false);
          break;

        case 'wish_to_donate':
          setShowDonationModal(true); // Show the donation modal
          break;
      }
    } else {
      setShowLoginModal(false);
    }
  };

  const handleShow = (modalType) => {
    if (modalType === 'login') {
      setShowLoginModal(true);
    } else if (user) {
      switch (modalType) {
        case 'message':
          setShowMessageModal(true);
          break;
        case 'request':
          setShowRequestModal(true);
          break;
        case 'wish_to_donate':
          setShowDonationModal(true);
          break;
        default:
          break;
      }
    } else {
      setShowLoginModal(true);
    }
  };

  useEffect(() => {
    getFepksById(id).then((res) => {
      if (res.message) {
        return console.error(res.message); 
      }

      setEpkInfo(res);
      setFepkId(res._id);
      setFepkMaker(res.film_maker);

      if (user?.id === res.film_maker?._id) {
        setRequestStatus('approved');
      } else {
        const myRequest = res.requests?.find(r => r.user === user?.id);
        if (myRequest) setRequestStatus(myRequest.status);
      }
    });
  }, [id, refresh, user?.id, setFepkId, setFepkMaker]);

  const posterImage = React.useMemo(() => {
    const img = epkInfo?.image_details;

    if (!img || img === '') return emptyBanner;

    if (img.startsWith('http')) return img;

    return `${process.env.REACT_APP_AWS_URL}/${img}`;
  }, [epkInfo?.image_details]);

  useEffect(() => {
    // Only track the view if we have the data and the user is NOT the owner
    if (id && epkInfo && user?.id !== epkInfo.film_maker?._id) {
      AnalyticsDataService.trackView(id, 'EPK')
        .catch(err => console.log("Analytics failed", err));
    }
  }, [id, epkInfo, user?.id]);

  return (
    epkInfo && (
      <div className="tw-flex tw-justify-center tw-overflow-hidden tw-bg-[#1E0039]">
        <div className="tw-w-11/12">
          <EpkHeader 
          epkInfo={epkInfo}
          setGlobalTotalReach={setGlobalTotalReach}
           />
          <EpkCover 
          epkInfo={epkInfo} 
          scrollToPhotos={scrollToPhotos}
          scrollToVideos={scrollToVideos}
          />
          {/* <EpkSocialAction epkInfo={epkInfo} handler={handleShow} /> */}
          <EpkSocialAction
            epkInfo={epkInfo}
            handler={handleShow}
            showDonationModal={showDonationModal}
            setShowDonationModal={setShowDonationModal}
          />

          <EpkDetail epkInfo={epkInfo} handler={handleShow} />
          <EpkLogline
            epkInfo={epkInfo}
            requestStatus={requestStatus}
            handler={handleShow}
          />
          <EpkSynopsis
            epkInfo={epkInfo}
            requestStatus={requestStatus}
            handler={handleShow}
          />
          <EpkUniqueness
            epkInfo={epkInfo}
            requestStatus={requestStatus}
            handler={handleShow}
          />
          <EpkCast epkInfo={epkInfo} />
          <EpkWorker epkInfo={epkInfo} />
          {/* <EpkStills
            epkInfo={epkInfo}
            requestStatus={requestStatus}
            handler={handleShow}
          /> */}
          {/* New photo gallery component */}
          <div ref={photoRef}>
          <EpkPhotoGallery epkInfo={epkInfo} />
          </div>
          {/* New video component */ }
          <div ref={videoRef}>
            <EpkVideoGallery epkInfo={epkInfo} />
          </div>
          <EpkResources epkInfo={epkInfo} />
          <EpkAward epkInfo={epkInfo} />
          
          {showRequestModal && (
            <RequestModal
              close={handleClose}
              open={handleShow}
              epkId={epkInfo._id}
              filmmakerId={epkInfo.film_maker._id}
              user={user}
              setRefresh={setRefresh}
            />
          )}
          {showLoginModal && (
            <LoginModal
              close={handleClose}
              open={handleShow}
              epkId={epkInfo._id}
              filmmakerId={epkInfo.film_maker._id}
              user={user}
              setRefresh={setRefresh}
            />
          )}
          {showMessageModal && (
            <NewMessageModal
              close={handleClose}
              open={handleShow}
              epkId={epkInfo._id}
              filmmakerId={epkInfo.film_maker._id}
              user={user}
              setRefresh={setRefresh}
            />
          )}
          {showDonationModal && (
            <DonationModal
              isOpen={showDonationModal}
              onRequestClose={() => setShowDonationModal(false)}
              epkId={epkInfo._id}
              userId={user.id}
              epkImage={posterImage} // Use the useMemo variable here!
              epkDonatePayPal={epkInfo.DonatePayPal_url}
              epkDonateStripe={epkInfo.DonateStripe_url}
            />
          )}
          <EpkSalesCalculator 
          globalTotalReach={globalTotalReach}
           />
          <Banner />
        </div>
      </div>
    )
  );
}
export default EpkViewPage;