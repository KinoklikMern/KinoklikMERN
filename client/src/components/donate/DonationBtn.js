// DonationButton.js
import React from 'react';
import { BiDonateHeart } from 'react-icons/bi'; 

const DonationButton = ({ onClick }) => {
  return (
    <div>
      
    <BiDonateHeart size={75} color="white" onClick={onClick}/>
    </div>
  );
};

export default DonationButton;
// import React, { useState } from "react";


// import { useNavigate } from 'react-router-dom';

// const DonationBtn = ({ userIsLoggedIn, openDonationModal }) => {
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const navigate = useNavigate();

//   const openModal = () => {
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//   };

//   const handleDonateClick = () => {
//     if (userIsLoggedIn) {
//       openDonationModal(); // Open the Donation Form
//     } else {
//       // Redirect unauthenticated users to the login page
//       navigate("/login");
//     }
//   };

//   return (
//     <div>
//       <button
//         className="donate-button"
//         onClick={handleDonateClick}
//       >
//         Donate
//       </button>
//     </div>
//   );
// };

// export default DonationBtn;






// // import React from "react";
// // import { useNavigate } from 'react-router-dom';

// // // Define the navigate function
// // const DonationBtn = ({ userIsLoggedIn }) => {
// //   const navigate = useNavigate();

// //   // Define the fetchUserData function to fetch user data from your API
// //   const fetchUserData = async () => {
// //     try {
// //       // Make a GET request to your API endpoint that fetches user data
// //       const response = await fetch("/api/user-data"); // Replace with your actual API endpoint
// //       if (!response.ok) {
// //         throw new Error("Failed to fetch user data");
// //       }

// //       const userData = await response.json();
// //       return userData;
// //     } catch (error) {
// //       console.error("Error fetching user data:", error);
// //       return null; // Handle the error gracefully
// //     }
// //   };

// //   const handleDonateClick = async () => {
// //     if (userIsLoggedIn) {
// //       try {
// //         // Fetch user ID and FEPK ID from your API using fetchUserData
// //         const userData = await fetchUserData();

// //         window.location.href = "https://donate.stripe.com/test_3csbMw5L92Kz8lGdQQ";

// //         // Check if you have the user ID and FEPK ID
// //         if (userData && userData.userId && userData.fepkId) {
// //           // Create an object with the donation details
// //           const donationData = {
// //             amount: 1000, // Example donation amount in cents
// //             token: "token_from_stripe", // Replace with the actual Stripe token
// //             userId: userData.userId,
// //             epkId: userData.fepkId,
// //           };

// //           // Send a POST request to your backend
// //           const response = await fetch("/donations", {
// //             method: "POST",
// //             headers: {
// //               "Content-Type": "application/json",
// //             },
// //             body: JSON.stringify(donationData),
// //           });

// //           if (response.ok) {
// //             console.log("userId");
// //             // Donation processed successfully
// //             // You can handle the success response here (e.g., show a success message).
// //           } else {
// //             // Handle donation processing errors
// //             console.error("Donation processing failed");
// //           }
// //         } else {
// //           console.error("User ID and FEPK ID not available.");
// //         }
// //       } catch (error) {
// //         console.error("Error processing donation:", error);
// //       }
// //     } else {
// //       // Redirect unauthenticated users to the login page
// //       navigate("/login");
// //     }
// //   };

// //   return (
// //     <div>
// //       <button
// //         className="tw-inline-block tw-rounded-lg tw-bg-violet-800 tw-px-4 tw-py-2 tw-text-xl tw-font-bold tw-tracking-wider tw-text-white tw-shadow-lg hover:tw--translate-y-0.5 hover:tw-bg-violet-600 focus:tw-outline-none sm:tw-text-base"
// //         onClick={handleDonateClick}
// //       >
// //         Donate
// //       </button>
// //     </div>
// //   );
// // };

// // export default DonationBtn;





// // import React from "react";
// // import { useNavigate } from 'react-router-dom';

// // const DonationBtn = ({ userIsLoggedIn }) => {
// //   const navigate = useNavigate();

// //   const handleDonateClick = () => {
// //     if (userIsLoggedIn) {
// //       // Redirect to the Stripe payment link
// //       window.location.href = "https://donate.stripe.com/test_3csbMw5L92Kz8lGdQQ";
// //     } else {
// //       navigate("/login"); // Redirect unauthenticated users to the login page
// //     }
// //   };

// //   return (
// //     <div>
// //       <button
// //         className="tw-inline-block tw-rounded-lg tw-bg-violet-800 tw-px-4 tw-py-2 tw-text-xl tw-font-bold tw-tracking-wider tw-text-white tw-shadow-lg hover:tw--translate-y-0.5 hover:tw-bg-violet-600 focus:tw-outline-none sm:tw-text-base"
// //         onClick={handleDonateClick}
// //       >
// //         Donate
// //       </button>
// //       <script async
// //   src="https://js.stripe.com/v3/buy-button.js">
// // </script>

// // <stripe-buy-button
// //   buy-button-id="buy_btn_1NyECmFUe1qDSl4qed1WY90J"
// //   publishable-key="pk_test_51NxuBqFUe1qDSl4qBv7tJzcJGDaaWJIS3rTmBLJQjfYImdIN3BJ6d3EOXV0Fsojid0ahlIJ01PEcMtljBAHvZEwy00WNPg5WOf"
 
// // >
// // </stripe-buy-button>

// //     </div>
// //   );
// // };

// // export default DonationBtn;