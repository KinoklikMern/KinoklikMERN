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
    <Modal
      show={isOpen}
      onHide={onRequestClose}
      animation={true}
      centered
      size="lg"
    >
      <div style={{ backgroundColor: "#503764E0" }}>
        <Modal.Header closeButton style={{ border: "none" }}></Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="justify-content-center">
              <Col md={8} style={{ textAlign: "center" }}>
                <Modal.Title style={{ color: "white", marginBottom: "15px" }}>
                  Support the filmmaker by making a one-time donation
                </Modal.Title>

                {/* EPK image */}
                <img
                  src={epkImage}
                  alt="EPK Img"
                  className="tw-my-4 tw-h-full tw-shadow-[6px_6px_3px_#1E0039]"
                  style={{ width: "300px", height: "500px" }}
                />

                {epkDonatePayPal && (
                  <Button
                    onClick={handleDonationPaypalSubmit}
                    style={{
                      marginTop: "60px",
                      backgroundColor: "#FFD600",
                      width: "300px",
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
                      width: "300px",
                    }}
                  >
                    Donate with Debit or Credit Card
                  </Button>
                )}
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer style={{ border: "none", float: "left" }}>
          <div>
            <img
              src={paypalImage}
              alt="PayPal Img"
              style={{ width: "50px", height: "30px" }}
            />
          </div>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default DonationModal;
