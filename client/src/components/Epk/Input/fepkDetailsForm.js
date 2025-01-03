/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import BasicMenu from "./fepkMenu";
import Modal from "react-modal";
import http from "../../../http-common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { getFepksById } from "../../../api/epks";

function FepkDetailsForm() {
  const { t } = useTranslation();

  const [allUserList, setAllUserList] = useState([]);
  const [fepk, setFepk] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [status, setStatus] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [disabledAdd, setDisabledAdd] = useState(true);
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  //toggle search result
  const [isResultsVisible, setIsResultsVisible] = useState(true);
  //save selected user
  const [selectedUser, setSelectedUser] = useState(null);
  //show email if no user found
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [invitationEmailValue, setInvitationEmailValue] = useState("");
  const [emailError, setEmailError] = useState("");
  //have list of users that are currently in fepk
  const [currentFepkUsers, setCurrentFepkUsers] = useState([]);
  //To work with modal notifications
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //let { title } = useParams();
  let { id } = useParams();

  //roles for invited users
  const [invitedUserRole, setInvitedUserRole] = useState("Actor");

  const [invitationData, setInvitationData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: invitedUserRole,
    invitedBy: "",
    movie: "",
    invitedByName: "",
    movieTitle: "",
    status: "Invited",
  });

  const [invitationsByFilmmakerMovie, setInvitationsByFilmmakerMovie] =
    useState([]);

  const epkRoles = [
    t("Actor"),
    t("Director"),
    t("Producer"),
    t("Cinematographer"),
    t("Editor"),
    t("Writer"),
    t("Sound"),
  ];

  const makeEpkRole = (Y) => {
    return (
      <option key={Y} value={Y}>
        {" "}
        {Y}
      </option>
    );
  };

  //-------------------------
  const [epkFilmDetailsData, setEpkFilmDetailsData] = useState({
    actors: fepk?.actors ?? [],
  });

  useEffect(() => {
    // console.log("useEffect is running");

    Promise.all([getFepksById(id), http.get("/users/getallusers")])
      .then(([fepkResponse, userResponse]) => {
        setFepk(fepkResponse);
        //setUserList(fepkResponse.data.crew); no need????
        setAllUserList(userResponse.data);
        setCurrentFepkUsers(fepkResponse.actors);

        //initial data for epkFilmDetailsData
        setEpkFilmDetailsData({
          ...epkFilmDetailsData,
          actors: fepkResponse.actors,
        });

        return http.get("invitations/get-invitation-by-filmmaker-movie", {
          params: {
            movie: fepkResponse._id,
            invitedBy: fepkResponse.film_maker._id,
          },
        });
      })
      .then((invitations) => {
        setInvitationsByFilmmakerMovie(invitations.data);
      });
  }, [epkFilmDetailsData, id]);

  useEffect(() => {
    setInvitationEmailValue("");
  }, [searchValue]);

  const handleSearch = (event) => {
    setEmailError("");
    setStatus(false);
    setSearchValue(event.target.value);

    const searchWord = event.target.value.toLowerCase();

    //regular implementation
    const newFilter = allUserList.filter((value) => {
      // Check if it's a user based on the presence of a name or firstName/lastName
      const actorName = value.firstName
        ? (value.firstName + " " + (value.lastName || "")).toLowerCase()
        : "";

      return actorName.includes(searchWord);
    });

    if (searchWord === "") {
      setFilteredData([]);
      setShowEmailInput(false);
    } else if (newFilter.length === 0) {
      setShowEmailInput(true);
      setFilteredData([]); // No need to display the users
      setDisabledAdd(true);
    } else {
      setFilteredData(newFilter);
      setShowEmailInput(false);
    }
    setIsResultsVisible(true);
  };

  const displayChosenUserData = (user) => {
    //1st option if user exists in table (in db in that specific fepk as user) block add button
    const userExistsInFepk = currentFepkUsers
      .map((user) => user._id)
      .includes(user._id);

    if (userExistsInFepk) {
      setDisabledAdd(true);
    } else {
      setDisabledAdd(false);
    }
    //-----------------------------------------------------
    const displayName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
    setUserName(displayName);
    setRole(user.role || ""); // Assuming you have a 'role' in the user object. Adjust if necessary.
    setSearchValue("");
    setSelectedUser(user);
    setIsResultsVisible(false);
  };

  function addUserToTable() {
    const userExistsInFepk = currentFepkUsers
      .map((user) => user._id)
      .includes(selectedUser._id);

    if (!userExistsInFepk) {
      const userToSave = selectedUser._id;

      //const updatedUserList = [...userList, selectedUser];

      //setCurrentFepkUsers([...currentFepkUsers, selectedUser]);

      const updatedEpkFilmDetailsData = {
        ...epkFilmDetailsData,
        actors: [...epkFilmDetailsData.actors, userToSave], // append the user's ObjectId to the actors array
      };

      //setEpkFilmDetailsData(updatedEpkFilmDetailsData);

      http
        .put(`fepks/update/${fepk._id}`, updatedEpkFilmDetailsData)
        .then((res) => {
          setCurrentFepkUsers([...currentFepkUsers, selectedUser]);
          setEpkFilmDetailsData(updatedEpkFilmDetailsData);
          console.log(t("saved"));
        })
        .catch((err) => {
          console.log(err);
          setEpkFilmDetailsData(epkFilmDetailsData); // Reverting back to the previous epkFilmDetailsData
        });

      setDisabledAdd(true);
    } else {
      console.log(t("User already added."));
    }
  }

  const deleteFromUsersList = (userToDelete) => {
    if (userToDelete.status && userToDelete.status === "Invited") {
      axios
        .delete(
          `${process.env.REACT_APP_BACKEND_URL}/invitations/delete-invitation`,
          {
            data: {
              movie: fepk._id,
              invitedBy: fepk.film_maker._id,
              email: userToDelete.email,
            },
          }
        )
        .then(() => {
          console.log(t("Invitation deleted"));

          const updatedInvitationsList = invitationsByFilmmakerMovie.filter(
            (user) => user._id !== userToDelete._id
          );

          setInvitationsByFilmmakerMovie(updatedInvitationsList);
        })
        .catch((error) => {
          console.error(t("Error deleting invitation:"), error);
        });
    } else {
      const updatedFepkUsers = currentFepkUsers.filter(
        (user) => user._id !== userToDelete._id
      );
      // Remove the user's ID from the actors array in epkFilmDetailsData
      const updatedEpkFilmDetailsData = {
        ...epkFilmDetailsData,
        actors: updatedFepkUsers,
      };

      // Make an HTTP request to the backend to persist this change
      http
        .put(`fepks/update/${fepk._id}`, updatedEpkFilmDetailsData)
        .then((res) => {
          // Successful database update, so we update the frontend state
          setEpkFilmDetailsData(updatedEpkFilmDetailsData);
          setCurrentFepkUsers(updatedFepkUsers);
          //setEpkFilmDetailsData(res.data); // Update with returned data from the backend to ensure accuracy PROBABLY WAS BREAKING
          console.log("user deleted");
        })

        .catch((err) => {
          console.error(err);
        });
    }
  };

  //check if email input is valid
  const isValidEmail = (email) => {
    // Regular expression for basic email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setInvitationEmailValue(email);

    // Update the invitationData state
    setInvitationData((prevState) => ({
      ...prevState,
      email: email,
    }));

    if (!isValidEmail(email)) {
      setEmailError(t("Please enter a valid email address."));
    } else {
      setEmailError("");
    }
  };

  function sendInvitation() {
    //chek if user is already registered
    const userExists = allUserList.find(
      (user) => user.email === invitationEmailValue
    );

    if (userExists) {
      const { firstName, lastName } = userExists;
      setEmailError(
        t(
          `User with that email is already registered under name: ${firstName} ${lastName}`
        )
      );
    } else {
      console.log(t("Sending invitation..."));

      // Clear previous errors
      setEmailError("");

      // Used directly without state, because state was updated too late
      const updatedInvitationData = {
        ...invitationData,
        invitedByName:
          fepk.film_maker.firstName + " " + fepk.film_maker.lastName,
        movieTitle: fepk.title,
        invitedBy: fepk.film_maker._id,
        movie: fepk._id,
      };

      // Check if the invitation already exists
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/invitations/get-invitation-by-filmmaker-movie-email`,
          {
            params: {
              movie: fepk._id,
              invitedBy: fepk.film_maker._id,
              email: invitationEmailValue,
            },
          }
        )
        .then((response) => {
          if (response.data && response.data.length > 0) {
            // Invitation already exists
            setEmailError(
              t("Invitation for that project was already sent to the person")
            );
            console.log(t("Invitation already exists"));
          } else {
            // Clear previous errors
            setEmailError("");

            // Send the invitation
            axios
              .post(
                `${process.env.REACT_APP_BACKEND_URL}/invitations/send-invitation`,
                updatedInvitationData
              )
              .then((response) => {
                setModalIsOpen(true);
                // Add the invited user to the frontend
                const invitedUser = {
                  _id: response.data._id, // assuming the response data has the invitations ID
                  ...updatedInvitationData, // add other required user details from updatedInvitationData if needed
                  //status: "Invited", // Marking the user as Invited
                };
                //setUserList((prevList) => [...prevList, invitedUser]);
                // setCurrentFepkUsers((prevUsers) => [
                //   ...prevUsers,
                //   invitedUser,
                // ]); // ???????????????????????????????
                setInvitationsByFilmmakerMovie((prevUsers) => [
                  ...prevUsers,
                  invitedUser,
                ]);

                console.log(t("Invitation saved and user added to frontend"));
              })
              .catch((error) => {
                console.error(t("Error sending invitation:"), error);
                // Handle the error appropriately.
              });
          }
        })
        .catch((error) => {
          console.error(t("Error checking for existing invitation:"), error);
          // Handle the error appropriately.
        });
    }
  }

  // One common list of unique users, so they hold all currentFepkUsers
  const combinedUsers = [
    ...currentFepkUsers,
    ...invitationsByFilmmakerMovie.filter(
      (invitationUser) =>
        !currentFepkUsers.some(
          (currentUser) => currentUser.email === invitationUser.email
        )
    ),
  ];

  // Helper function to get user status
  const getUserStatus = (user) => {
    if (currentFepkUsers.some((currentUser) => currentUser._id === user._id)) {
      return "Added";
    } else {
      return "Invited";
    }
  };

  //close modal
  const closeModal = () => {
    setModalIsOpen(false);
    setSearchValue("");
    setInvitationEmailValue("");
    setEmailError("");
    setInvitationData({
      firstName: "",
      lastName: "",
      email: "",
      role: invitedUserRole,
      invitedBy: "",
      movie: "",
      invitedByName: "",
      movieTitle: "",
      status: "Invited",
    });
  };

  return (
    <>
      <div
        style={{
          // boxShadow: "inset 1px 2px 9px #311465",
          // marginLeft: "10%",
          // marginBottom: "2%",
          // width: "80%",
          // borderRadius: "10px",
          // backgroundColor: "white",
          // boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.4), -3px -3px 5px rgba(255, 255, 255, 0.6)",
        }}
      >
        <form>
          {/*<div className="tw-flex tw-items-center tw-justify-center tw-rounded-t-lg tw-bg-gradient-to-b tw-from-midnight tw-from-10% tw-via-transparent tw-via-20% tw-to-transparent tw-py-5">*/}
          {/*  <div className="col-3 tw-m-3 tw-text-center">*/}
          {/*    <h2*/}
          {/*      className="tw-text-lg tw-font-bold tw-text-[#1E0039] tw-no-underline md:tw-text-xl lg:tw-text-2xl"*/}
          {/*      // style={{*/}
          {/*      //   color: "#1E0039",*/}
          {/*      //   fontWeight: "bold",*/}
          {/*      //   fontSize: "25px",*/}
          {/*      // }}*/}
          {/*    >*/}
          {/*      {t("EPK Dashboard")}*/}
          {/*    </h2>*/}
          {/*  </div>*/}
          {/*  <div className="col-3 tw-m-3 tw-text-center">*/}
          {/*    <BasicMenu color="#1E0039" />*/}
          {/*  </div>*/}
          {/*  <div className="col-3 tw-m-3 tw-text-center">*/}
          {/*    <Link*/}
          {/*      className="tw-text-lg tw-font-bold tw-text-[#1E0039] tw-no-underline md:tw-text-xl lg:tw-text-2xl"*/}
          {/*      to={`/epk/${fepk._id}`}*/}
          {/*      // style={{*/}
          {/*      //   color: "#1E0039",*/}
          {/*      //   textDecoration: "none",*/}
          {/*      //   fontWeight: "bold",*/}
          {/*      //   fontSize: "25px",*/}
          {/*      // }}*/}
          {/*    >*/}
          {/*      {t("View EPK Page")}*/}
          {/*    </Link>*/}
          {/*  </div>*/}
          {/*</div>*/}
          <div
            style={{
              // marginLeft: "5%",
              // marginRight: "3%",
              color: "#311465",
              fontWeight: "normal",
            }}
          >
            <div
              className="card-body pb-2"
              style={
                {
                  // height: "500px"
                }
              }
            >
              <div className="row">
                {/*Titles, Search Input, Add to Film Page button */}
                <div className="col">
                  <div className="row">
                    <div className="col my-1">
                      {/*<h5*/}
                      {/*  className="card-title "*/}
                      {/*  style={{*/}
                      {/*    color: "#311465",*/}
                      {/*    marginTop: "1%",*/}
                      {/*    marginBottom: "1%",*/}
                      {/*  }}*/}
                      {/*>*/}
                      {/*  {t("Cast & Crew")}*/}
                      {/*</h5>*/}
                      <h5
                          className="card-title "
                          style={{
                            color: "black",
                            marginBottom: "3%",
                            fontSize: "0.9rem",
                          }}
                      >
                        {t("Add Cast & Crew members to your Film Page")}
                      </h5>
                      <div className="d-flex flex-wrap justify-content-between">
                        <div className="flex-grow-1 me-2">
                          <input
                              style={{
                                height: "30px",
                                // width: "auto",
                                borderRadius: "15px",
                                // marginBottom: "24px",
                                boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.4), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                                textAlign: "left",
                                fontSize: "14px",
                              }}
                              className="form-control w-100"
                              //defaultValue={""}
                              value={searchValue}
                              //value=""
                              placeholder="Search..."
                              onChange={handleSearch}
                          />
                          {isResultsVisible && filteredData.length !== 0 ? (
                              <div
                                  style={{
                                    height: "100px",
                                    width: "100%",
                                    backgroundColor: "white",
                                    borderRadius: "5px",
                                    marginBottom: "5px",
                                    overflow: "auto",
                                    position: "relative",
                                    zIndex: "1",
                                    maxHeight: "150px",
                                  }}
                              >
                                {filteredData.map((userObj) => {
                                  // Determine the display name based on available properties
                                  const displayName = `${
                                      userObj.firstName || ""
                                  } ${userObj.lastName || ""}`.trim();

                                  // Determine the appropriate image URL
                                  let imageUrlDisplay;
                                  if (
                                      userObj.picture &&
                                      !userObj.picture.startsWith("http")
                                  ) {
                                    imageUrlDisplay = `${process.env.REACT_APP_AWS_URL}/${userObj.picture}`;
                                  } else {
                                    imageUrlDisplay = userObj.picture;
                                  }

                                  return (
                                      <div
                                          key={userObj._id}
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            cursor: "pointer",
                                            // margin: "7% 3%",
                                            height: "auto",
                                          }}
                                      >
                                        <div>
                                          <p
                                              style={{
                                                fontSize: "0.9rem",
                                              }}
                                              onClick={() =>
                                                  displayChosenUserData(userObj)
                                              }
                                          >
                                            {displayName}
                                          </p>
                                        </div>
                                        <div
                                            style={
                                              {
                                                // marginLeft: "10%",

                                              }
                                            }
                                        >
                                          {!imageUrlDisplay ? (
                                              <FontAwesomeIcon
                                                  icon={faUser}
                                                  style={{
                                                    width: "25px",
                                                    height: "25px",
                                                    borderRadius: "25%",
                                                  }}
                                              />
                                          ) : (
                                              <img
                                                  src={imageUrlDisplay}
                                                  style={{
                                                    width: "25px",
                                                    height: "25px",
                                                    borderRadius: "25%",
                                                  }}
                                                  alt={displayName}
                                              />
                                          )}
                                        </div>
                                      </div>
                                  );
                                })}
                              </div>
                          ) : (
                              <div
                                  style={{
                                    // height: "100px",
                                    // width: "100%",
                                    marginBottom: "0px",
                                  }}
                              ></div>
                          )}

                          {filteredData.length > 0 && (
                              <>
                                <input
                                    style={{
                                      height: "30px",
                                      width: "100%",
                                      borderRadius: "15px",
                                      marginBottom: "20px",
                                      boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.4), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                                      textAlign: "left",
                                      fontSize: "14px",
                                      marginTop: "24px",
                                    }}
                                    className="form-control m-10"
                                    value={userName}
                                    placeholder={t("Name")}
                                    name="name"
                                    readOnly
                                    //onChange={handleCrewChange}
                                />
                                <input
                                    style={{
                                      height: "30px",
                                      width: "100%",
                                      borderRadius: "15px",
                                      // marginBottom: "20px",
                                      boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.4), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                                      textAlign: "left",
                                      fontSize: "14px",
                                    }}
                                    className="form-control m-10"
                                    value={role}
                                    placeholder={t("Role")}
                                    name="role"
                                    readOnly
                                    //onChange={handleCrewChange}
                                />
                              </>
                          )}
                          <div className="flex flex-col items-center w-full max-w-md mt-5">
                            {showEmailInput ? (
                                <>
                                  <p
                                      style={{
                                        fontSize: "0.8rem",
                                        color: "red",
                                        marginTop: "-5%",
                                        marginBottom: "3%",
                                      }}
                                  >
                                    {t("User is not found. Invite via email:")}
                                  </p>
                                  <div className="tw-flex tw-w-full tw-space-x-2 tw-mb-5">
                                    {/* First Name */}
                                  <input
                                      style={{
                                        height: "30px",
                                        borderRadius: "15px",
                                        boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.4), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                                        textAlign: "left",
                                        fontSize: "14px",
                                      }}
                                      className="form-control tw-w-1/2"
                                      // defaultValue=""
                                      value={invitationData.firstName}
                                      placeholder={t("First Name")}
                                      name="firstName"
                                      onChange={(e) => {
                                        setInvitationData((prevState) => ({
                                          ...prevState,
                                          [e.target.name]: e.target.value,
                                        }));
                                      }}
                                  />
                                    {/* Last Name Input */}
                                  <input
                                      style={{
                                        height: "30px",
                                        borderRadius: "15px",
                                        boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.4), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                                        textAlign: "left",
                                        fontSize: "14px",
                                      }}
                                      className="form-control tw-w-1/2"
                                      // defaultValue=""
                                      value={invitationData.lastName}
                                      placeholder={t("Last Name")}
                                      name="lastName"
                                      onChange={(e) => {
                                        setInvitationData((prevState) => ({
                                          ...prevState,
                                          [e.target.name]: e.target.value,
                                        }));
                                      }}
                                  />
                                  </div>

                                  {/* Email Input */}
                                  <input
                                      style={{
                                        height: "30px",
                                        width: "100%",
                                        borderRadius: "15px",
                                        marginBottom: "20px",
                                        boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.4), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                                        textAlign: "left",
                                        fontSize: "14px",
                                      }}
                                      className="form-control"
                                      value={invitationEmailValue}
                                      placeholder={t("Email Address")}
                                      name="email"
                                      // onChange={(e) =>
                                      //   setInvitationEmailValue(e.target.value)
                                      // }
                                      onChange={handleEmailChange}
                                  />
                                  {emailError && (
                                      <div
                                          style={{
                                            fontSize: "0.8rem",
                                            color: "red",
                                            width: "120%",
                                            // marginBottom: "3%",
                                          }}
                                      >
                                        {emailError}
                                      </div>
                                  )}
                                  <select
                                      style={{
                                        height: "30px",
                                        width: "100%",
                                        borderRadius: "15px",
                                        marginBottom: "20px",
                                        boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.4), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                                      }}
                                      className="form-select form-select-sm"
                                      name="epkRole"
                                      onChange={(e) =>
                                          setInvitedUserRole(e.target.value)
                                      }
                                  >
                                    <option value="" disabled>
                                      {t("Film Page role...")}
                                    </option>
                                    {epkRoles.map(makeEpkRole)}
                                  </select>
                                  <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginBottom: "50px",
                                      }}
                                  >
                                  <Button
                                      disabled={!!emailError || !invitationEmailValue}
                                      className={
                                        !!emailError || !invitationEmailValue
                                            ? "" // no hover effect when disabled
                                            : "hover:tw-scale-110 hover:tw-bg-[#712CB0] hover:tw-text-white" // apply hover effect when enabled
                                      }
                                      style={{
                                        boxShadow: "1px 2px 9px #311465",
                                        fontWeight: "bold",
                                        width: "auto",
                                        height: "25px",
                                        borderRadius: "15px",
                                        fontSize: "0.7rem",
                                        color:
                                            !!emailError || !invitationEmailValue
                                                ? "grey"
                                                : undefined,
                                        backgroundColor:
                                            !!emailError || !invitationEmailValue
                                                ? "#ffffff"
                                                : undefined,
                                      }}
                                      type="outline-primary"
                                      block
                                      onClick={sendInvitation}
                                      value="save"
                                  >
                                    {t("Send Invitation")}
                                  </Button>
                                  </div>
                                </>
                            ) : disabledAdd ? (
                                <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      marginBottom: "50px",
                                    }}
                                >
                                <Button
                                    disabled
                                    style={{
                                      width: "150px",
                                      boxShadow: "1px 2px 9px #311465",
                                      color: "grey",
                                      backgroundColor: "#ffffff",
                                      fontWeight: "bold",
                                      height: "25px",
                                      borderRadius: "15px",
                                      fontSize: "0.7rem",
                                    }}
                                    type="outline-primary"
                                    block
                                    onClick={addUserToTable}
                                    value="save"
                                >
                                  {t("Add to Film Page")}
                                </Button>
                                </div>
                            ) : (
                                <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      marginBottom: "50px",
                                    }}
                                >
                                <Button
                                    className="hover:tw-scale-110 hover:tw-bg-[#712CB0] hover:tw-text-white"
                                    style={{
                                      boxShadow: "1px 2px 9px #311465",
                                      fontWeight: "bold",
                                      width: "150px",
                                      height: "25px",
                                      borderRadius: "15px",
                                      fontSize: "0.7rem",

                                    }}
                                    type="outline-primary"
                                    block
                                    onClick={addUserToTable}
                                    value="save"
                                >
                                  {t("Add to Film Page")}
                                </Button>
                                </div>
                              )}
                          </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*Table with results */}
                {/* <div className="col"> */}
                {/* <div className="row"> */}
                <div className="col my-2"
                     style={{
                       boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.4), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                     }}
                >
                  {/* Responsive table container */}
                  <div
                    // className="overflow-x-auto"

                  >
                    {/* Table */}
                    <table
                      className="table bg-transparent"
                      style={{
                        fontSize: "0.8rem",
                        textAlign: "center",
                        tableLayout: "auto",


                      }}
                    >
                      <thead className="thead-dark">
                      <tr class="bg-transparent">
                        <th class="bg-transparent">{t("PICTURE")}</th>
                        <th class="bg-transparent">{t("NAME")}</th>
                        <th class="bg-transparent">{t("ROLE")}</th>

                        {/*<th>{t("FB")}</th>*/}
                        {/*<th>{t("IG")}</th>*/}
                        {/*<th>{t("TW")}</th>*/}
                        <th class="bg-transparent">{t("STATUS")}</th>
                        <th class="bg-transparent"></th>
                      </tr>
                      </thead>
                      <tbody>
                        {combinedUsers.map((user) => {
                          let imageUrlDisplay;
                          if (
                            user.picture &&
                            !user.picture.startsWith("http")
                          ) {
                            imageUrlDisplay = `${process.env.REACT_APP_AWS_URL}/${user.picture}`;
                          } else {
                            imageUrlDisplay = user.picture;
                          }
                          return (
                              <tr
                                  class="bg-transparent"
                                  key={user._id}
                                  style={{
                                    textAlign: "center",
                                    verticalAlign: "middle",
                                    fontSize: "0.7rem",
                                  }}
                              >
                                <td class="bg-transparent">
                                  <img
                                      src={imageUrlDisplay}
                                      alt=""
                                      style={{
                                        height: "75px",
                                        width: "75px",
                                        borderRadius: "0px",
                                        objectFit: "cover"
                                      }}
                                  />
                                </td>
                                <td class="bg-transparent">{user.firstName + " " + user.lastName}</td>
                                <td class="bg-transparent">{user.role}</td>

                                {/*<td>*/}
                                {/*  <a*/}
                                {/*    href={*/}
                                {/*      user.facebook_url ? user.facebook_url : "#"*/}
                                {/*    }*/}
                                {/*    target="_blank"*/}
                                {/*    rel="noopener noreferrer"*/}
                                {/*  >*/}
                                {/*    {user.facebook_followers*/}
                                {/*      ? user.facebook_followers*/}
                                {/*      : "-"}*/}
                                {/*  </a>*/}
                                {/*</td>*/}
                                {/*<td>*/}
                                {/*  <a*/}
                                {/*    href={*/}
                                {/*      user.instagram_url*/}
                                {/*        ? user.instagram_url*/}
                                {/*        : "#"*/}
                                {/*    }*/}
                                {/*    target="_blank"*/}
                                {/*    rel="noopener noreferrer"*/}
                                {/*  >*/}
                                {/*    {user.instagram_followers*/}
                                {/*      ? user.instagram_followers*/}
                                {/*      : "-"}*/}
                                {/*  </a>*/}
                                {/*</td>*/}
                                {/*<td>*/}
                                {/*  <a*/}
                                {/*    href={*/}
                                {/*      user.twitter_url ? user.twitter_url : "#"*/}
                                {/*    }*/}
                                {/*    target="_blank"*/}
                                {/*    rel="noopener noreferrer"*/}
                                {/*  >*/}
                                {/*    {user.twitter_followers*/}
                                {/*      ? user.twitter_followers*/}
                                {/*      : "-"}*/}
                                {/*  </a>*/}
                                {/*</td>*/}
                                <td class="bg-transparent">
                                  {user.status
                                      ? user.status
                                      : currentFepkUsers
                                          .map((user) => user._id)
                                          .includes(user._id)
                                          ? "Added"
                                          : "Invited"}
                                </td>
                                <td
                                    class="bg-transparent"
                                    style={{
                                      textAlign: "center",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => deleteFromUsersList(user)}
                                >
                                  <FontAwesomeIcon icon={faTrashCan}/>
                                </td>
                              </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    {/* </div> */}
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div>
          <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
            appElement={document.getElementById("root")}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              content: {
                position: "absolute",
                border: "2px solid #000",
                backgroundColor: "white",
                boxShadow: "2px solid black",
                height: 120,
                width: 300,
                margin: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "green" }}>
                {t("Invitation is Sent Successfully!")}
              </div>
              <br />
              <button
                className="btn btn-secondary btn-sm"
                onClick={closeModal}
                style={{ backgroundColor: "#712CB0", color: "white" }}
              >
                {t("Ok")}
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}
export default FepkDetailsForm;
