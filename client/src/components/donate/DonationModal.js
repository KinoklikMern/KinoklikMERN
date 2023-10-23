import React, { useState } from "react";
import { Form, Modal, Button ,Col,Container,Row  } from "react-bootstrap";
import paypalImage from '../../images/PayPal-Logo.png';


const DonationModal = ({ isOpen, onRequestClose, epkImage, epkDonatePayPal, epkDonateStripe }) => {
  //console.log("epkImage:", epkImage); 
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
  const handleDonationSubmit = async () => {
    try {
      // Create a Payment Intent using the Stripe API
      const response = await fetch('/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: donationAmount,
          name: nameOnCard,
          cardNumber,
          expiry,
          cvc,
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
    window.location.href = epkDonatePayPal; // Replace this with the actual PayPal donation page URL.
  };

  const handleDonationStripeSubmit = () => {
    // Redirect to the PayPal donation page or URL
    window.location.href = epkDonateStripe; // Replace this with the actual PayPal donation page URL.
  };

  const buttonStyle = {
    backgroundColor: 'white',
    color: '#1E0039',
    margin:'10px 0px',
    width: '50%',
    border: '2px #1E0039', 
   
  };
  
  const selectedButtonStyle = {
    backgroundColor:  '#1E0039',
    color: 'white',
    margin:'10px 0px',
    width: '50%',
    border: '2px #1E0039', 
  };

 

  return (
    <Modal show={isOpen} onHide={onRequestClose} animation={true} centered size="lg">
      <div style={{ backgroundColor: '#503764E0' }}>
        <Modal.Header closeButton style={{ border: 'none' }}>
         
        </Modal.Header>
      <Modal.Body>
      <Container>
      <Row>
          <Col>
          <Modal.Title style={{ color: 'white', textAlign: 'center', marginBottom: '15px' }}>
            Support the filmmaker by making a one-time donation
          </Modal.Title>
          </Col>
            </Row>
        <Row>
          <Col>
            <Row>
              <Col>
              <Button
                  style={donationAmount === 3 ? selectedButtonStyle : buttonStyle}
                  onClick={() => setDonationAmount(3)}
                >
                  $3
                </Button>
              </Col>
              <Col>
              <Button
                  style={donationAmount === 5 ? selectedButtonStyle : buttonStyle}
                  onClick={() => setDonationAmount(5)}
                >
                  $5
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
              <Button
                  style={donationAmount === 8 ? selectedButtonStyle : buttonStyle}
                  onClick={() => setDonationAmount(8)}
                >
                  $8
                </Button>
              </Col>
              <Col>
              <Button
                  style={donationAmount === 10 ? selectedButtonStyle : buttonStyle}
                  onClick={() => setDonationAmount(10)}
                >
                  $10
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Other amount : 0.00$"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                />
              </Col>
            </Row>
          </Col>
          <Col>
            <Form.Group style={{ margin: '5px 0px' }}>
              {/* <Form.Label>Name as on the card</Form.Label> */}
              <Form.Control
                type="text"
                placeholder="Name as on the card"
                value={nameOnCard}
                onChange={(e) => setNameOnCard(e.target.value)}
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: '5px' }}>
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
                <Form.Group style={{ marginBottom: '5px' }}>
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
                <Form.Group style={{ marginBottom: '5px' }}>
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
            <Form.Group style={{ marginBottom: '5px' }}>
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
                <Form.Group style={{ marginBottom: '5px' }}>
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
                <Form.Group style={{ marginBottom: '5px' }}>
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
                <Form.Group style={{ marginBottom: '5px' }}>
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
                <Form.Group style={{ marginBottom: '25px', }}>
                  {/* <Form.Label>Country</Form.Label> */}
                  <Form.Control
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </Form.Group>
                
              </Col>
        <Button  onClick={handleDonationPaypalSubmit} style={{ marginBottom: '10px',backgroundColor: '#FFD600' }}>
              Donate with PayPal
        </Button>
        <Button  onClick={handleDonationStripeSubmit} style={{ marginBottom: '5px',backgroundColor: '#5B1DDF' }}>
          Donate with  Debit or Credit Card
        </Button>
         
            </Row>
          </Col>
          <Col>
            {/* Epkimge */}
            <img src={epkImage} alt="EPK Image" className="img-fluid" />
          </Col>
        </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer style={{ border: 'none',float: 'left' }}>
      <div>
      <img src={paypalImage} alt="PayPal Image" style={{ width: '50px', height:'30px' }}  />
  </div>
        
      </Modal.Footer>
      </div>
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