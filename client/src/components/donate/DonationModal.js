import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Modal from "react-modal";

const customStyles = {
  content: {
    maxWidth: "650px",
    maxHeight: "450px",
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
                fontSize: "20px",
                textAlign: "center",
              }}
            >
             <p>Support the filmmaker by</p>
             <p>making a one-time donation.</p>
            </h1>

            {epkDonatePayPal && (
              <Button
                onClick={handleDonationPaypalSubmit}
                style={{
                  color: "#0081C9",
                  
                  marginTop: "20px",
                  backgroundColor: "#FFD600",
                  width: "100%",
                  borderRadius: "5px", 
                  border: "1px solid #1E0039",
                  boxShadow: "4px 4px 10px 0px #1E0039",
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
              borderRadius: "5px",
              border: "1px solid #1E0039",
              boxShadow: "4px 4px 10px 0px #1E0039", 
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
              style={{ width: "100%" }}
            />
          </Col>
        </Row>
      </Container>
    </Modal>
 
  );
};

export default DonationModal;
