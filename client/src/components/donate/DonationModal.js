import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Modal from "react-modal";
import { useTranslation } from 'react-i18next';

const customStyles = {
  content: {
    maxWidth: "37%",
    height: "550px",
    margin: "auto",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "#503764E0",
    border: "none",
    display: "flex",
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
                marginTop: "55px",
                marginBottom: "75px",
                fontSize: "45px",
                textAlign: "center",
              }}
            >
              <p>{t('Support the filmmaker by')}</p>
              <p>{t(' making a one-time donation.')}</p>
            </h1>

            {epkDonatePayPal && (
              <Button
                onClick={handleDonationPaypalSubmit}
                style={{
                  color: "#0081C9",
                  marginTop: "10%",
                  marginLeft: "20%",
                  backgroundColor: "#FFD600",
                  width: "70%",
                  height: "60px",
                  borderRadius: "5px",
                  border: "1px solid #1E0039",
                  fontSize: "30px",
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
                  marginLeft: "20%",
                  backgroundColor: "#5B1DDF",
                  width: "70%",
                  height: "60px",
                  borderRadius: "5px",
                  border: "1px solid #1E0039",
                  boxShadow: "4px 4px 10px 0px #1E0039",
                  fontSize: "30px",
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
              style={{ width: "75%", height: "75%", marginTop: "20%" }}
            />
          </Col>
        </Row>
      </Container>
    </Modal>
  );
};

export default DonationModal;
