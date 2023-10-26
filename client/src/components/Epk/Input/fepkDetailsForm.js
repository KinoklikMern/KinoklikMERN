/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Button } from "antd";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import BasicMenu from "./fepkMenu";
import Modal from "react-modal";
import http from "../../../http-common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTrashCan } from "@fortawesome/free-solid-svg-icons";

function FepkDetailsForm() {
  const [file, setFile] = useState("");
  // const [userList, setUserList] = useState([]);
  const [allUserList, setAllUserList] = useState([]);
  const [fepk, setFepk] = useState({});
  const [disabledSaveButton, setDisabledSaveButton] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [status, setStatus] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [disabledAdd, setDisabledAdd] = useState(true);
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState(""); // Assuming you have a 'role' in the user object. Adjust if necessary.
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
  //image url state
  const [imageUrl, setImageUrl] = useState(""); // Initially, it can be the default image or empty.
  const [uploadedImageUrl, setUploadedImageUrl] = useState(""); // state to store the uploaded image URL
  //To work with modal notifications
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContentType, setModalContentType] = useState("save"); // need to change modal content based on wht button was clicked

  const inputFileRef = useRef(null);

  let { fepkId } = useParams();

  //roles for invited users
  const [invitedUserRole, setInvitedUserRole] = useState("Actor");
  // const [invitedUserFirstName, setInvitedUserFirstName] = useState("");
  //const [invitedUserLastName, setInvitedUserLastName] = useState("");

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
    "Actor",
    "Director",
    "Producer",
    "Cinematographer",
    "Editor",
    "Writer",
    "Sound",
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

  const fileSelected = (event) => {
    let formData = new FormData();
    console.log(event.target.files[0]);
    formData.append("file", event.target.files[0]);
    console.log(formData);
    if (checkFileMimeType(event.target.files[0])) {
      http
        .post("fepks/uploadFile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data !== undefined) {
            const newImageUrl =
              process.env.REACT_APP_AWS_URL + "/" + response.data.key;
            setUploadedImageUrl(newImageUrl); // store the uploaded image URL
            epkFilmDetailsData.image_details = response.data.key;
          }
          setDisabledSaveButton(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setMessage("File must be a image(jpeg or png)");
    }
  };

  useEffect(() => {
    console.log("useEffect is running");

    Promise.all([http.get(`/fepks/${fepkId}`), http.get("/users/getallusers")])
      .then(([fepkResponse, userResponse]) => {
        setFepk(fepkResponse.data);
        //setUserList(fepkResponse.data.crew); no need????
        setAllUserList(userResponse.data);
        setCurrentFepkUsers(fepkResponse.data.actors);

        // Check if image_details starts with 'http'
        if (
          fepkResponse.data.image_details &&
          fepkResponse.data.image_details.startsWith("http")
        ) {
          setImageUrl(fepkResponse.data.image_details);
        } else {
          setImageUrl(
            process.env.REACT_APP_AWS_URL +
              "/" +
              fepkResponse.data.image_details
          );
        }

        //console.log(imageUrl);
        //console.log(currentFepkUsers);
        console.log(fepk);
        //console.log("i");

        //initial data for epkFilmDetailsData
        setEpkFilmDetailsData({
          ...epkFilmDetailsData,
          image_details: fepkResponse.data.image_details,
          productionCo: fepkResponse.data.productionCo,
          distributionCo: fepkResponse.data.distributionCo,
          productionYear: fepkResponse.data.productionYear,
          durationMin: fepkResponse.data.durationMin,
          actors: fepkResponse.data.actors,
        });

        return http.get("invitations/get-invitation-by-filmmaker-movie", {
          params: {
            movie: fepkResponse.data._id,
            invitedBy: fepkResponse.data.film_maker._id,
          },
        });
      })
      .then((invitations) => {
        setInvitationsByFilmmakerMovie(invitations.data);
      });
    //console.log(invitationsByFilmmakerMovie);
    //console.log(allUserList);
    //console.log(userList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //NEEDED???? empty email when search input
  useEffect(() => {
    setInvitationEmailValue(""); // Clear the email input whenever searchValue changes
  }, [searchValue]);
  //
  //temporary to see selected user data
  // useEffect(() => {
  //   console.log(currentFepkUsers);
  // }, [currentFepkUsers]);

  useEffect(() => {
    console.log(
      "Invitations on that filmmaker and movie",
      invitationsByFilmmakerMovie
    );
  }, [invitationsByFilmmakerMovie]);

  useEffect(() => {
    console.log("Current fepk users", currentFepkUsers);
  }, [currentFepkUsers]);

  useEffect(() => {
    console.log(emailError);
  }, [emailError]);

  const [epkFilmDetailsData, setEpkFilmDetailsData] = useState({
    image_details: fepk.image_details,
    productionCo: fepk.productionCo,
    distributionCo: fepk.distributionCo,
    productionYear: fepk.productionYear,
    durationMin: fepk.durationMin,
    actors: fepk.actors,
  });

  function saveEpkDetails() {
    const tempEpkDetails = { ...epkFilmDetailsData };

    http
      .put(`fepks/update/${fepkId}`, epkFilmDetailsData)
      .then((res) => {
        setModalContentType("save");
        setModalIsOpen(true);
        console.log("saved");

        // Here, if your backend returns the updated data, update the state with that:
        if (res.data && res.data.updatedEpkData) {
          setEpkFilmDetailsData(res.data.updatedEpkData);
        }
      })
      .catch((err) => {
        console.log(err);
        // Rollback: In case of an error, revert to the original state
        setEpkFilmDetailsData(tempEpkDetails);
      });

    setDisabledSaveButton(true);
    //window.location.reload();
  }

  const handleDetailsChange = (event) => {
    const { name, value } = event.target;
    //setEpkFilmDetailsData({ ...epkFilmDetailsData, [name]: value });
    setEpkFilmDetailsData((prevState) => ({ ...prevState, [name]: value }));
    setDisabledSaveButton(false);
  };

  const checkFileMimeType = (file) => {
    if (file !== "") {
      if (
        file.type === "video/mp4" ||
        file.type === "video/mpeg" ||
        file.type === "video/quicktime" ||
        file.type === "video/x-ms-wmv" ||
        file.type === "video/ogg" ||
        file.type === "video/3gpp" ||
        file.type === "video/x-msvideo" ||
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg"
      )
        return true;
      else return false;
    } else return true;
  };

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

    //2nd option, if user already exists in the table ( and in db in that fepk ) then do not display him in search

    // const newFilter = allUserList.filter((value) => {
    //   const actorName = value.firstName
    //     ? (value.firstName + " " + (value.lastName || "")).toLowerCase()
    //     : "";
    //   const userExistsInFepk = currentFepkUsers
    //     .map((user) => user._id)
    //     .includes(value._id);
    //   return actorName.includes(searchWord) && !userExistsInFepk;
    // });

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
      //console.log(filteredData);
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

    console.log(selectedUser);
  };

  function addUserToTable() {
    const userExistsInFepk = currentFepkUsers
      .map((user) => user._id)
      .includes(selectedUser._id);

    console.log("user Exists In Fepk:", userExistsInFepk);

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
        .put(`fepks/update/${fepkId}`, updatedEpkFilmDetailsData)
        .then((res) => {
          setCurrentFepkUsers([...currentFepkUsers, selectedUser]);
          setEpkFilmDetailsData(updatedEpkFilmDetailsData);
          console.log("saved");
        })
        .catch((err) => {
          console.log(err);
          setEpkFilmDetailsData(epkFilmDetailsData); // Reverting back to the previous epkFilmDetailsData
        });

      setDisabledAdd(true);
    } else {
      console.log("User already added.");
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
          console.log("Invitation deleted");

          const updatedInvitationsList = invitationsByFilmmakerMovie.filter(
            (user) => user._id !== userToDelete._id
          );

          setInvitationsByFilmmakerMovie(updatedInvitationsList);
        })
        .catch((error) => {
          console.error("Error deleting invitation:", error);
        });
    } else {
      console.log("user to delete", userToDelete);
      const updatedFepkUsers = currentFepkUsers.filter(
        (user) => user._id !== userToDelete._id
      );

      console.log("updated list", updatedFepkUsers);
      // Remove the user's ID from the actors array in epkFilmDetailsData
      const updatedEpkFilmDetailsData = {
        ...epkFilmDetailsData,
        actors: updatedFepkUsers,
      };

      console.log("updatedEpkFilmDetailsData:", updatedEpkFilmDetailsData);
      // Make an HTTP request to the backend to persist this change
      http
        .put(`fepks/update/${fepkId}`, updatedEpkFilmDetailsData)
        .then((res) => {
          // Successful database update, so we update the frontend state
          console.log("res.data:", res.data);
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
      setEmailError("Please enter a valid email address.");
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
      //console.log("Excisting user:", userExists);
      const { firstName, lastName } = userExists;
      setEmailError(
        `User with that email is already registered under name: ${firstName} ${lastName}`
      );
    } else {
      console.log("Sending invitation...");

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

      console.log(
        "movie, invitedBy, email",
        fepk._id,
        fepk.film_maker._id,
        invitationEmailValue
      );

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
            //console.log("response data:", response.data);
            // Invitation already exists
            setEmailError(
              "Invitation for that project was already sent to the person"
            );
            console.log("Invitation already exists");
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
                setModalContentType("invitation");
                setModalIsOpen(true);

                console.log("send invitation response data", response.data);
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

                console.log("Invitation saved and user added to frontend");

                //console.log(response.data);
                //console.log("Invitation saved");
              })
              .catch((error) => {
                console.error("Error sending invitation:", error);
                // Handle the error appropriately.
              });
          }
        })
        .catch((error) => {
          console.error("Error checking for existing invitation:", error);
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

  //console.log(combinedUsers);

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
  };

  return (
    <>
      <div
        style={{
          boxShadow: "inset 1px 2px 9px #311465",
          padding: "0px 10px",
          marginLeft: "10%",
          width: "80%",
          borderRadius: "10px",
          // background: "linear-gradient(rgba(128,128,128,0.65),transparent)",
          backgroundColor: "white",
        }}
      >
        <form>
          <div
            className="row"
            style={{
              background:
                "linear-gradient(to bottom, #1E0039 0%, #1E0039 35%, #1E0039 35%, #FFFFFF 100%)",
            }}
          >
            <div className="col-1">
              <Link className="navbar-brand text-headers-style" to="/home">
                <img
                  style={{ width: "100%", height: "80px" }}
                  src={require("../../../images/logo.png")}
                  alt="Logo"
                  className="navbar-logo"
                />
              </Link>
            </div>
            <div className="col-3  m-3">
              <h2
                className="col align-items-start"
                style={{
                  color: "#FFFFFF",
                  fontWeight: "normal",
                  fontSize: "25px",
                }}
              >
                EPK Dashboard
              </h2>
            </div>
            <div className="col-3 m-3">
              <BasicMenu />
            </div>
            <div className="col-1 m-3"></div>
            <div className="col-2 m-3">
              <Link
                className="col align-items-end"
                to={`/epk/${fepk.title}`}
                style={{
                  color: "#FFFFFF",
                  textDecoration: "none",
                  fontWeight: "normal",
                  fontSize: "20px",
                }}
              >
                View EPK Page
              </Link>
            </div>
          </div>
          <div
            style={{
              marginLeft: "10%",
              marginRight: "10%",
              color: "#311465",
              fontWeight: "normal",
            }}
          >
            <div className="card-body" style={{ height: "500px" }}>
              <h5
                className="card-title "
                style={{ color: "#311465", fontWeight: "normal" }}
              >
                Film Details
              </h5>
              <form>
                <div className="row">
                  <div className="col-3 mt-2">
                    <input
                      style={{
                        height: "30px",
                        width: "100%",
                        borderRadius: "5px",
                        marginBottom: "5px",
                        boxShadow: "1px 2px 9px #311465",
                        textAlign: "left",
                        fontSize: "14px",
                      }}
                      className="form-control m-10 mb-4"
                      //value={fepk.productionCo}
                      value={epkFilmDetailsData.productionCo}
                      placeholder="Production Company Name"
                      onChange={handleDetailsChange}
                      name="productionCo"
                    />
                    <input
                      style={{
                        height: "30px",
                        width: "100%",
                        borderRadius: "5px",
                        marginBottom: "5px",
                        boxShadow: "1px 2px 9px #311465",
                        textAlign: "left",
                        fontSize: "14px",
                      }}
                      className="form-control m-10 "
                      //value={fepk.distributionCo}
                      value={epkFilmDetailsData.distributionCo}
                      placeholder="Distribution Company Name"
                      onChange={handleDetailsChange}
                      name="distributionCo"
                    />
                    <div className="row">
                      <div className="col-6 my-3">
                        <input
                          style={{
                            height: "30px",
                            width: "100%",
                            borderRadius: "5px",
                            marginBottom: "5px",
                            boxShadow: "1px 2px 9px #311465",
                            textAlign: "left",
                            fontSize: "14px",
                          }}
                          type="number"
                          min="1895"
                          className="form-control m-10"
                          //value={fepk.productionYear}
                          value={epkFilmDetailsData.productionYear}
                          placeholder="Year"
                          onChange={handleDetailsChange}
                          name="productionYear"
                        />
                      </div>
                      <div className="col-6 mt-3">
                        <input
                          style={{
                            height: "30px",
                            width: "100%",
                            borderRadius: "5px",
                            marginBottom: "5px",
                            boxShadow: "1px 2px 9px #311465",
                            textAlign: "left",
                            fontSize: "14px",
                          }}
                          type="number"
                          min="0"
                          className="form-control m-10"
                          //value={fepk.durationMin}
                          value={epkFilmDetailsData.durationMin}
                          placeholder="Min."
                          onChange={handleDetailsChange}
                          name="durationMin"
                        />
                      </div>
                    </div>
                    <label
                      for="filePoster"
                      class="form-label text-dark"
                      style={{ fontSize: "25px" }}
                    >
                      {" "}
                      <h6 style={{ fontSize: "20px" }}>Upload Poster</h6>
                    </label>
                    <input
                      style={{ fontSize: "15px" }}
                      className="form-control form-control-sm"
                      filename={file}
                      onChange={fileSelected}
                      ref={inputFileRef}
                      type="file"
                      id="fileDetails"
                      name="files"
                      accept="image/*"
                    ></input>
                    {uploadedImageUrl ? (
                      <img
                        style={{
                          height: "150px",
                          width: "auto",
                          marginTop: "5px",
                        }}
                        src={uploadedImageUrl}
                        alt="Uploaded"
                      />
                    ) : (
                      <img
                        src={imageUrl}
                        style={{
                          height: "150px",
                          width: "auto",
                          marginTop: "5px",
                        }}
                        alt="no img"
                      />
                    )}
                    <br />
                  </div>
                  <div className="col-3 mt-2">
                    <div className="row">
                      <div className="col-9 ">
                        <input
                          style={{
                            height: "30px",
                            width: "100%",
                            borderRadius: "5px",
                            marginBottom: "24px",
                            boxShadow: "1px 2px 9px #311465",
                            textAlign: "left",
                            fontSize: "14px",
                          }}
                          className="form-control"
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
                              width: "15%",
                              backgroundColor: "white",
                              borderRadius: "5px",
                              marginBottom: "5px",
                              overflow: "auto",
                              position: "absolute",
                              zIndex: "1",
                            }}
                          >
                            {filteredData.map((userObj) => {
                              // Determine the display name based on available properties
                              const displayName = `${userObj.firstName || ""} ${
                                userObj.lastName || ""
                              }`.trim();

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
                                <p
                                  key={userObj._id}
                                  style={{
                                    fontSize: "10px",
                                    padding: "5px",
                                    margin: "0px",
                                  }}
                                  onClick={() => displayChosenUserData(userObj)}
                                >
                                  {!imageUrlDisplay ? (
                                    <FontAwesomeIcon
                                      icon={faUser}
                                      style={{
                                        height: "27px",
                                        marginRight: "10px",
                                      }}
                                    />
                                  ) : (
                                    <img
                                      src={imageUrlDisplay}
                                      style={{
                                        width: "20px",
                                        height: "auto",
                                        marginRight: "10px",
                                      }}
                                      alt={displayName}
                                    />
                                  )}
                                  {displayName}
                                </p>
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
                      </div>
                      {/* <div className="col-3" style={{ textAlign: "left" }}>
                        {status === false ? (
                          <div className="hover:tw-scale-110">
                            <FontAwesomeIcon
                              icon={faUserPlus}
                              style={{
                                height: "20px",
                                paddingBottom: "12px",
                                cursor: "pointer",
                              }}
                              //onClick={() => createNewCrew()}
                            />
                          </div>
                        ) : (
                          <FontAwesomeIcon
                            icon={faUserCheck}
                            style={{
                              height: "20px",
                              paddingBottom: "12px",
                              color: "green",
                            }}
                          />
                        )}
                      </div> */}
                    </div>
                    {filteredData.length > 0 && (
                      <>
                        <input
                          style={{
                            height: "30px",
                            width: "100%",
                            borderRadius: "5px",
                            marginBottom: "20px",
                            boxShadow: "1px 2px 9px #311465",
                            textAlign: "left",
                            fontSize: "14px",
                          }}
                          className="form-control m-10"
                          value={userName}
                          placeholder="Name"
                          name="name"
                          readOnly
                          //onChange={handleCrewChange}
                        />
                        <input
                          style={{
                            height: "30px",
                            width: "100%",
                            borderRadius: "5px",
                            marginBottom: "20px",
                            boxShadow: "1px 2px 9px #311465",
                            textAlign: "left",
                            fontSize: "14px",
                          }}
                          className="form-control m-10"
                          value={role}
                          placeholder="Role"
                          name="role"
                          readOnly
                          //onChange={handleCrewChange}
                        />
                      </>
                    )}
                    {showEmailInput ? (
                      <>
                        <p
                          style={{
                            fontSize: "16px",
                            color: "black",
                            margin: "15px",
                          }}
                        >
                          User is not found. Invite via email:
                        </p>
                        <input
                          style={{
                            height: "30px",
                            width: "100%",
                            borderRadius: "5px",
                            marginBottom: "20px",
                            boxShadow: "1px 2px 9px #311465",
                            textAlign: "left",
                            fontSize: "14px",
                          }}
                          className="form-control m-10"
                          defaultValue=""
                          placeholder="First Name"
                          name="firstName"
                          onChange={(e) => {
                            setInvitationData((prevState) => ({
                              ...prevState,
                              [e.target.name]: e.target.value,
                            }));
                          }}
                        />
                        <input
                          style={{
                            height: "30px",
                            width: "100%",
                            borderRadius: "5px",
                            marginBottom: "20px",
                            boxShadow: "1px 2px 9px #311465",
                            textAlign: "left",
                            fontSize: "14px",
                          }}
                          className="form-control m-10"
                          defaultValue=""
                          placeholder="Last Name"
                          name="lastName"
                          onChange={(e) => {
                            setInvitationData((prevState) => ({
                              ...prevState,
                              [e.target.name]: e.target.value,
                            }));
                          }}
                        />
                        <input
                          style={{
                            height: "30px",
                            width: "100%",
                            borderRadius: "5px",
                            marginBottom: "20px",
                            boxShadow: "1px 2px 9px #311465",
                            textAlign: "left",
                            fontSize: "14px",
                          }}
                          className="form-control m-10"
                          value={invitationEmailValue}
                          placeholder="Email Address"
                          name="email"
                          // onChange={(e) =>
                          //   setInvitationEmailValue(e.target.value)
                          // }
                          onChange={handleEmailChange}
                        />
                        {emailError && (
                          <p style={{ fontSize: "16px", color: "red" }}>
                            {emailError}
                          </p>
                        )}
                        <select
                          style={{
                            height: "30px",
                            width: "100%",
                            borderRadius: "5px",
                            marginBottom: "20px",
                            boxShadow: "1px 2px 9px #311465",
                          }}
                          className="form-select form-select-sm"
                          name="epkRole"
                          onChange={(e) => setInvitedUserRole(e.target.value)}
                        >
                          <option value="" disabled>
                            Epk role...
                          </option>
                          {epkRoles.map(makeEpkRole)}
                        </select>
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
                            width: "100%",
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
                          Send Invitation
                        </Button>
                      </>
                    ) : disabledAdd ? (
                      <Button
                        disabled
                        style={{
                          boxShadow: "1px 2px 9px #311465",
                          color: "grey",
                          backgroundColor: "#ffffff",
                          fontWeight: "bold",
                          width: "100%",
                        }}
                        type="outline-primary"
                        block
                        onClick={addUserToTable}
                        value="save"
                      >
                        Add to EPK
                      </Button>
                    ) : (
                      <Button
                        className="hover:tw-scale-110 hover:tw-bg-[#712CB0] hover:tw-text-white"
                        style={{
                          boxShadow: "1px 2px 9px #311465",
                          fontWeight: "bold",
                          width: "100%",
                        }}
                        type="outline-primary"
                        block
                        onClick={addUserToTable}
                        value="save"
                      >
                        Add to EPK
                      </Button>
                    )}
                  </div>
                  <div
                    className="col-5 mt-2"
                    style={{
                      overflow: "auto",
                      height: "440px",
                      scrollbarWidth: "none",
                    }}
                  >
                    <table
                      className="table table-striped table-bordered"
                      style={{ fontSize: "9px" }}
                    >
                      <thead className="thead-dark">
                        <tr>
                          <th>NAME</th>
                          <th>EPK ROLE</th>
                          <th>IMAGE</th>
                          <th>FACE</th>
                          <th>INSTA</th>
                          <th>TWIT</th>
                          <th>STATUS</th>
                          <th></th>
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
                            <tr key={user._id}>
                              <td>{user.firstName + " " + user.lastName}</td>
                              <td>{user.role}</td>
                              <td>
                                <img
                                  src={imageUrlDisplay}
                                  alt=""
                                  style={{ height: "15px", width: "auto" }}
                                />
                              </td>
                              <td>
                                <a
                                  href={
                                    user.facebook_url ? user.facebook_url : "#"
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {user.facebook_followers
                                    ? user.facebook_followers
                                    : "-"}
                                </a>
                              </td>
                              <td>
                                <a
                                  href={
                                    user.instagram_url
                                      ? user.instagram_url
                                      : "#"
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {user.instagram_followers
                                    ? user.instagram_followers
                                    : "-"}
                                </a>
                              </td>
                              <td>
                                <a
                                  href={
                                    user.twitter_url ? user.twitter_url : "#"
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {user.twitter_followers
                                    ? user.twitter_followers
                                    : "-"}
                                </a>
                              </td>
                              <td>
                                {user.status
                                  ? user.status
                                  : currentFepkUsers
                                      .map((user) => user._id)
                                      .includes(user._id)
                                  ? "Added"
                                  : "Invited"}
                              </td>
                              <td
                                style={{
                                  textAlign: "center",
                                  cursor: "pointer",
                                }}
                                onClick={() => deleteFromUsersList(user)}
                              >
                                <FontAwesomeIcon icon={faTrashCan} />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-1 align-self-end">
                    <div
                      style={{
                        height: "50px",
                        width: "100px",
                        // marginLeft: "100%",
                        marginTop: "5%",
                        // border: "1px solid black",
                      }}
                    >
                      {disabledSaveButton === true ? (
                        <Button
                          disabled
                          style={{
                            boxShadow: "1px 2px 9px #311465",
                            color: "grey",
                            backgroundColor: "#ffffff",
                            fontWeight: "bold",
                          }}
                          type="outline-primary"
                          block
                          onClick={saveEpkDetails}
                          //onClick={saveHandler}
                          value="save"
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          className="hover:tw-scale-110 hover:tw-bg-[#712CB0] hover:tw-text-white"
                          style={{
                            boxShadow: "1px 2px 9px #311465",
                            fontWeight: "bold",
                          }}
                          type="outline-primary"
                          block
                          onClick={saveEpkDetails}
                          value="save"
                        >
                          Save
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </form>
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
                // position: "fixed",
                // top: 0,
                // left: 0,
                // right: 0,
                // bottom: 0,
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
              {modalContentType === "invitation"
                ? "Invitation is Sent Successfully!"
                : "Film Details Saved Successfully!"}
              <br />
              <button className="btn btn-secondary btn-sm" onClick={closeModal}>
                Ok
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}
export default FepkDetailsForm;
