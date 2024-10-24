/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import EpkHeader from '../components/EpkView/EpkHeader/EpkHeader';
import EpkCover from '../components/EpkView/EpkCover/EpkCover';
import EpkSocialAction from '../components/EpkView/EpkSocialAction/EpkSocialAction';
import EpkDetail from '../components/EpkView/EpkDetail/EpkDetail';
import EpkLogline from '../components/EpkView/EpkLogline/EpkLogline';
import EpkSynopsis from '../components/EpkView/EpkSynopsis/EpkSynopsis';
import EpkUniqueness from '../components/EpkView/EpkUniqueness/EpkUniqueness';
import EpkCast from '../components/EpkView/EpkCast/EpkCast';
import EpkWorker from '../components/EpkView/EpkWorker/EpkWorker';
import EpkStills from '../components/EpkView/EpkStills/EpkStills';
import EpkResources from '../components/EpkView/EpkResources/EpkResources';
import EpkTrailer from '../components/EpkView/EpkTrailer/EpkTrailer';
import EpkAward from '../components/EpkView/EpkAward/EpkAward';
import DonationModal from '../components/donate/DonationModal';
import RequestModal from '../components/EpkView/miscellaneous/RequestModal';
import LoginModal from '../components/EpkView/miscellaneous/LoginModal';
import NewMessageModal from '../components/EpkView/miscellaneous/NewMessageModal';
import { useParams } from 'react-router-dom';
import { getFepksByTitle, getFepksById } from '../api/epks';
import { useSelector } from 'react-redux';
import { FepkContext } from '../context/FepkContext';
import Banner from '../components/EpkView/EpkBanner/EpkBanner';
import emptyBanner from '../images/empty_banner.jpeg';
import EpkSalesCalculator from '../components/EpkView/EpkSalesCalculator/EpkSalesCaculator';

function EpkViewPage() {
  const [fepkId, setFepkId, fepkMaker, setFepkMaker] =
    React.useContext(FepkContext);
  const user = useSelector((state) => state.user);
  const [epkInfo, setEpkInfo] = useState();
  const [requestStatus, setRequestStatus] = useState();
  const [refresh, setRefresh] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showDonationModal, setShowDonationModal] = useState(false); // State to control donation form visibility
  const [imageDetails, setImageDetails] = useState('');

  //let { title } = useParams();
  let { id } = useParams();

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

  // useEffect(() => {
  //   getFepksByTitle(title).then((res) => {
  //     if (res.message) {
  //       alert(res.message);
  //     } else {
  //       //Find epk
  //       setEpkInfo(res);
  //       setFepkId(res._id);
  //       setFepkMaker(res.film_maker);
  //       if (user?.id === res.film_maker._id) {
  //         setRequestStatus("approved");
  //       } else {
  //         res.requests.forEach((request) => {
  //           if (request.user === user?.id) {
  //             setRequestStatus(request.status);
  //           }
  //         });
  //       }
  //     }
  //   });
  // }, [title, refresh, setFepkId, setFepkMaker, user?.id]);

  useEffect(() => {
    getFepksById(id).then((res) => {
      if (res.message) {
        alert(res.message);
        console.log(id);
      } else {
        //Find epk
        console.log('res:', res);
        setEpkInfo(res);
        setFepkId(res._id);
        setFepkMaker(res.film_maker);
        if (user?.id === res.film_maker._id) {
          setRequestStatus('approved');
        } else {
          res.requests.forEach((request) => {
            if (request.user === user?.id) {
              setRequestStatus(request.status);
            }
          });
        }
      }
    });
  }, [id, refresh, setFepkId, setFepkMaker, user?.id]);

  useEffect(() => {
    if (
      !epkInfo?.image_details ||
      epkInfo?.image_details === '' ||
      epkInfo.image_details.startsWith('https')
    ) {
      setImageDetails(emptyBanner);
    } else {
      setImageDetails(
        `${process.env.REACT_APP_AWS_URL}/${epkInfo.image_details}`
      );
    }
  }, [epkInfo]);

  return (
    epkInfo && (
      <div className="tw-flex tw-justify-center tw-overflow-hidden tw-bg-[#1E0039]">
        <div className="tw-w-11/12">
          <EpkHeader epkInfo={epkInfo} />
          <EpkCover epkInfo={epkInfo} />
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
          <EpkStills
            epkInfo={epkInfo}
            requestStatus={requestStatus}
            handler={handleShow}
          />
          <EpkResources epkInfo={epkInfo} />
          <EpkTrailer epkInfo={epkInfo} />
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
              epkImage={
                // "https://kinomovie.s3.amazonaws.com/" + epkInfo.image_details
                imageDetails
              }
              epkDonatePayPal={epkInfo.DonatePayPal_url}
              epkDonateStripe={epkInfo.DonateStripe_url}
            />
          )}
          <EpkSalesCalculator />
          <Banner />
        </div>
      </div>
    )
  );
}
export default EpkViewPage;
