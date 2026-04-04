import React from "react";
import Modal from "react-modal";
import { useTranslation } from 'react-i18next';
import emptyBanner from '../../images/empty_banner.jpeg'

const DonationModal = ({
  isOpen,
  onRequestClose,
  epkImage,
  epkDonatePayPal,
  epkDonateStripe,
}) => {
  const { t } = useTranslation();

  // TODO add actual links!
  const handleDonationPaypalSubmit = () => {
    // Redirect to the PayPal donation page or URL
    if (epkDonatePayPal) window.location.href = epkDonatePayPal;
  };

  const handleDonationStripeSubmit = () => {
     // Redirect to the Stripe donation page or URL
    if (epkDonateStripe) window.location.href = epkDonateStripe;
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false} 
      overlayClassName="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-flex tw-items-center tw-justify-center tw-z-[9999]"
      className="tw-relative tw-w-11/12 tw-max-w-4xl tw-bg-[#503764] tw-rounded-none tw-p-8 tw-outline-none tw-border-none"
    >
      <div className="tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-gap-6">
        
        <div className="tw-w-full md:tw-w-2/3 tw-text-center">
          <h1 className="tw-text-white tw-font-bold tw-mb-8 tw-leading-tight tw-text-[2.5vw] md:tw-text-3xl">
            {t('Support the filmmaker by')} <br />
            {t('making a one-time donation.')}
          </h1>

          <div className="tw-flex tw-flex-col tw-gap-5 tw-px-4">
            {epkDonatePayPal && (
              <button
                onClick={handleDonationPaypalSubmit}
                className="tw-w-full tw-h-[6.7vh] tw-bg-[#FFD600] tw-font-bold tw-text-xl tw-rounded-[5px] tw-border tw-border-[#1E0039] tw-shadow-[4px_4px_10px_0px_#1E0039] hover:tw-opacity-90"
              >
                {t('Donate with PayPal')}
              </button>
            )}

            {epkDonateStripe && (
              <button
                onClick={handleDonationStripeSubmit}
                className="tw-w-full tw-h-[6.7vh] tw-bg-[#5B1DDF] tw-text-white tw-font-bold tw-text-xl tw-rounded-[5px] tw-border tw-border-[#1E0039] tw-shadow-[4px_4px_10px_0px_#1E0039] hover:tw-opacity-90"
              >
                {t('Donate with Stripe')}
              </button>
            )}
          </div>
        </div>

        <div className="tw-w-full md:tw-w-1/3 tw-flex tw-justify-center">
          {epkImage && (
            <img
              src={epkImage}
              alt="EPK Poster"
              className="tw-w-full tw-h-auto tw-max-h-[40vh] tw-object-contain tw-shadow-[6px_6px_3px_#1E0039]"
              onError={(e) => {
                e.target.onerror = null; 
                
                if (typeof emptyBanner !== 'undefined') {
                  e.target.src = emptyBanner;
                } else {
                  e.target.style.display = 'none';
                }
              }}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DonationModal;