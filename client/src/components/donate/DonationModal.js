import React, { useState } from "react";
import { Form, Modal, Button, Col, Container, Row } from "react-bootstrap";
import paypalImage from "../../images/PayPal-Logo.png";

const DonationModal = ({
  isOpen,
  onRequestClose,
  epkImage,
  epkDonatePayPal,
  epkDonateStripe,
}) => {
  const [donationAmount, setDonationAmount] = useState(0);

  const handleDonationSubmit = async () => {
    try {
      // Create a Payment Intent using the Stripe API
      const response = await fetch("/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: donationAmount,
          // Add other necessary payment details here
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Payment was successful
        // Display a success message to the user
      } else {
        // Payment failed
        // Display an error message to the user
      }
    } catch (error) {
      console.error(error);
      // Handle errors here
    }
  };

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
                  alt="EPK Image"
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
              alt="PayPal Image"
              style={{ width: "50px", height: "30px" }}
            />
          </div>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default DonationModal;
