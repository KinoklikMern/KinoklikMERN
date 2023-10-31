import React from "react";
import { Modal, Button, Col, Container, Row } from "react-bootstrap";
import paypalImage from "../../images/PayPal-Logo.png";

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

  return (
    <>
      <style>
        {`
         .modal-backdrop {
           z-index: -1;
         }
       `}
      </style>

      <Modal
        show={isOpen}
        onHide={onRequestClose}
        animation={true}
        centered
        style={{ maxWidth: "1000px", backgroundColor: "#503764E0" }}
      >
        <Modal.Body style={{ backgroundColor: "#503764E0" }}>
          <Container>
            <Row>
              {/* First Column */}
              <Col md={8}>
                <Modal.Title
                  style={{
                    color: "white",
                    marginBottom: "15px",
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  Support the filmmaker by making a one-time donation
                </Modal.Title>

                {epkDonatePayPal && (
                  <Button
                    onClick={handleDonationPaypalSubmit}
                    style={{
                      marginTop: "20px",
                      backgroundColor: "#FFD600",
                      width: "100%",
                    }}
                  >
                    Donate with PayPal
                  </Button>
                )}

                {epkDonateStripe && (
                  <Button
                    onClick={handleDonationStripeSubmit}
                    style={{
                      marginTop: "20px",
                      backgroundColor: "#5B1DDF",
                      width: "100%",
                    }}
                  >
                    Donate with Stripe
                  </Button>
                )}
              </Col>

              {/* Second Column */}
              <Col md={4}>
                {/* EPK image */}
                <img
                  src={epkImage}
                  alt="EPK Img"
                  className="tw-my-4 tw-h-full tw-shadow-[6px_6px_3px_#1E0039]"
                  style={{ width: "100%", height: "100%" }}
                />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DonationModal;
