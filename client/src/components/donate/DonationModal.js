import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Modal from "react-modal";
import { useTranslation } from 'react-i18next';

const customStyles = {
  content: {
    maxWidth: "40%",
    height: "55%",
    margin: "auto",
    top: "50%",
    bottom: "25%",
    transform: "translateY(-50%)",
    backgroundColor: "#503764E0",
    border: "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

const DonationModal = ({
  isOpen,
  onRequestClose,
  epkImage,
  epkDonatePayPal,
  epkDonateStripe,

  
}) => {
  const handleDonationPaypalSubmit = () => {
    // Redirect to the PayPal donation page or URL
    if (epkDonatePayPal) {
      window.location.href = epkDonatePayPal;
    }
  };

  const handleDonationStripeSubmit = () => {
    // Redirect to the Stripe donation page or URL
    if (epkDonateStripe) {
      window.location.href = epkDonateStripe;
    }
  };

  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      style={customStyles}
    >
      <Container>
        <Row>
          {/* First Column */}
          <Col md={8}>
            <h1
              style={{
                color: "white",
                marginTop: "1px",
                marginBottom: "1px",
                fontSize: "2.7vw",
                textAlign: "center",
              }}
            >
              <p>{t('Support the filmmaker by')}</p>
              <p>{t('making a one-time donation.')}</p>
            </h1>

            {epkDonatePayPal && (
              <Button
                onClick={handleDonationPaypalSubmit}
                style={{
                  color: "#0081C9",
                  marginTop: "10%",
                  marginLeft: "5%",
                  backgroundColor: "#FFD600",
                  width: "100%",
                  height: "6.7vh",
                  borderRadius: "5px",
                  border: "1px solid #1E0039",
                  fontSize: "2.2vw",
                  padding: "0.1%",
                  boxShadow: "4px 4px 10px 0px #1E0039",
                  fontWeight: "bold",
                }}
              >
                {t('Donate with PayPal')}
              </Button>
            )}

            {epkDonateStripe && (
              <Button
                onClick={handleDonationStripeSubmit}
                style={{
                  marginTop: "2%",
                  marginLeft: "5%",
                  backgroundColor: "#5B1DDF",
                  width: "100%",
                  height: "6.7vh",
                  borderRadius: "5px",
                  border: "1px solid #1E0039",
                  boxShadow: "4px 4px 10px 0px #1E0039",
                  fontSize: "2.2vw",
                  padding: "0.1%",
                  fontWeight: "bold",
                  alignSelf: "center",
                }}
              >
                {t('Donate with Stripe')}
              </Button>
            )}
          </Col>

          {/* Second Column */}
          <Col
            md={4}
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            {/* EPK image */}
            <img
              src={epkImage}
              alt="EPK Img"
              className="tw-my-4 tw-h-full tw-shadow-[6px_6px_3px_#1E0039]"
              style={{ width: "100%", height: "auto", marginTop: "10%" }}
            />
          </Col>
        </Row>
      </Container>
    </Modal>
  );
};

export default DonationModal;
