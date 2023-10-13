import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//import { login } from "../../../api/user";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

const DonationModal = ({ isOpen, onRequestClose }) => {
  const handleDonationSubmit = () => {
    window.location.href = "https://donate.stripe.com/test_3csbMw5L92Kz8lGdQQ"
  };
  return (
    <Modal show={isOpen} onHide={onRequestClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Donation Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Your donation form fields and content go here */}
        <Form>
          <Form.Group>
            <Form.Label htmlFor="amount">Donation Amount:</Form.Label>
            <Form.Control type="text" id="amount" name="amount" />
            {/* Add more form fields as needed */}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onRequestClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleDonationSubmit}>
          Submit Donation
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DonationModal;

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
