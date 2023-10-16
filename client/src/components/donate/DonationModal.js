import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const DonationModal = ({ isOpen, onRequestClose, epkImage }) => {
  console.log("epkImage:", epkImage); 
  const [donationAmount, setDonationAmount] = useState(0);
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCVC] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const handleDonationSubmit = () => {
    // Send the donation data to Stripe or your backend for processing
    // You'll need to implement this part based on your backend setup.
    // For example, you can use the Stripe API to handle the payment.
  };

  return (
    <Modal show={isOpen} onHide={onRequestClose} animation={true} centered>
      <Modal.Header closeButton>
        <Modal.Title>Support the filmmaker by making a one-time donation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Container>
        
        <Row>
          <Col style={{ width: "300%" }}>
            <Row>
              <Col>
                <Button variant="outline-primary" onClick={() => setDonationAmount(3)}>
                  $3
                </Button>
              </Col>
              <Col>
                <Button variant="outline-primary" onClick={() => setDonationAmount(5)}>
                  $5
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button variant="outline-primary" onClick={() => setDonationAmount(8)}>
                  $8
                </Button>
              </Col>
              <Col>
                <Button variant="outline-primary" onClick={() => setDonationAmount(10)}>
                  $10
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Other amount:0.00$"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                />
              </Col>
            </Row>
          </Col>
          <Col style={{ width: "300%" }}>
            <Form.Group>
              {/* <Form.Label>Name as on the card</Form.Label> */}
              <Form.Control
                type="text"
                placeholder="Name as on the card"
                value={nameOnCard}
                onChange={(e) => setNameOnCard(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              {/* <Form.Label>Card Number</Form.Label> */}
              <Form.Control
                type="text"
                value={cardNumber}
                placeholder="Card Number"
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group>
                  {/* <Form.Label>MM/YY</Form.Label> */}
                  <Form.Control
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  {/* <Form.Label>CVC</Form.Label> */}
                  <Form.Control
                    type="text"
                    placeholder="CVC"
                    value={cvc}
                    onChange={(e) => setCVC(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              {/* <Form.Label>Billing Address</Form.Label> */}
              <Form.Control
                type="text"
                placeholder="Billing Address"
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group>
                  {/* <Form.Label>City</Form.Label> */}
                  <Form.Control
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  {/* <Form.Label>Province</Form.Label> */}
                  <Form.Control
                    type="text"
                    placeholder="Province"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  {/* <Form.Label>Postal Code</Form.Label> */}
                  <Form.Control
                    type="text"
                    placeholder="Postal Code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  {/* <Form.Label>Country</Form.Label> */}
                  <Form.Control
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Col>
          <Col>
            {/* Epkimge */}
            <img src={epkImage} alt="EPK Image" className="img-fluid" />
          </Col>
        </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onRequestClose}>
          Close
        </Button>
        <Button className="tw-inline-block tw-rounded-lg tw-bg-violet-800 tw-px-4 tw-py-2 tw-text-xl tw-font-bold tw-tracking-wider tw-text-white tw-shadow-lg hover:tw--translate-y-0.5 hover:tw-bg-violet-600 focus:tw-outline-none sm:tw-text-base" variant="primary" onClick={handleDonationSubmit}>
          Donate
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DonationModal;


// import React, { useState } from "react";
// import Modal from "react-bootstrap/Modal";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// //import { login } from "../../../api/user";
// import Cookies from "js-cookie";
// import { useDispatch } from "react-redux";

// const DonationModal = ({ isOpen, onRequestClose }) => {
//   const handleDonationSubmit = () => {
//     window.location.href = "https://donate.stripe.com/test_3csbMw5L92Kz8lGdQQ"
//   };
//   return (
//     <Modal show={isOpen} onHide={onRequestClose} animation={false}>
//       <Modal.Header closeButton>
//         <Modal.Title>Donation Form</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         {/* Your donation form fields and content go here */}
//         <Form>
//           <Form.Group>
//             <Form.Label htmlFor="amount">Donation Amount:</Form.Label>
//             <Form.Control type="text" id="amount" name="amount" />
//             {/* Add more form fields as needed */}
//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onRequestClose}>
//           Close
//         </Button>
//         <Button variant="primary" onClick={handleDonationSubmit}>
//           Submit Donation
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default DonationModal;

// import React from "react";
// import axios from "axios";
// import Modal from 'react-modal';

// const DonationModal = ({ closeModal }) => {
//   return (
//     <Modal
//       isOpen={true} // Open the modal for the Donation Form
//       onRequestClose={closeModal}
//       contentLabel="Donation Form"
//       style={{
//         content: {
//           width: "1114px",
//           height: "603px",
//           position: "relative",
//           top: "-7322px",
//           left: "-402px",
//           fontFamily: "Roboto",
//           fontSize: "40px",
//           fontWeight: 800,
//           lineHeight: "47px",
//           letterSpacing: "0em",
//           textAlign: "left",
//           backgroundColor: "#503764E0",
//         },
//       }}
//     >
//       <button
//         className="cancel-button"
//         onClick={closeModal}
//       >
//         Cancel
//       </button>
//       <h2>Support the filmmaker by making a one-time donation.</h2>
//       <form onSubmit={(e) => e.preventDefault()}>
//         {/* Donation form fields go here */}
//         <button type="submit">Submit Donation</button>
//       </form>
//     </Modal>
//   );
// };

// export default DonationModal;
