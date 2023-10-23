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
        <Button  onClick={handleDonationPaypalSubmit} style={{marginTop:'60px', marginLeft: '90px',backgroundColor: '#FFD600',width:'300px' }}>
              Donate with PayPal
        </Button>
        <Button  onClick={handleDonationStripeSubmit} style={{marginTop:'60px', marginLeft: '90px',backgroundColor: '#5B1DDF',width:'300px' }}>
          Donate with  Debit or Credit Card
        </Button>
            </Row>
          </Col>
          <Col>
            {/* Epkimge */}
            <img src={epkImage} alt="EPK Image" className="img-fluid" style={{ margin:'40px' }}/>
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