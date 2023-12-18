/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import LeftSidebar from "../../components/AdminDashboard/LeftSidebar";
import TopToolBar from "../../components/AdminDashboard/TopToolBar";
import TrashIcon from "../../images/icons/trash.svg";
import TrashIconWhite from "../../images/icons/trash-white.svg";
import EditPencilIcon from "../../images/icons/edit-pencil.svg";
import EditPencilIconWhite from "../../images/icons/edit-pencil-white.svg";
import MessageIcon from "../../images/icons/messageIcon.svg";
import MessageIconWhite from "../../images/icons/messageIcon-white.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import Triangle from "../../images/icons/triangle.svg";
import http from "../../http-common";
import { useTranslation } from "react-i18next";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UsersPage() {
  const { t } = useTranslation();
  const { user } = useSelector((user) => ({ ...user }));
  const [actionStatus, setActionStatus] = useState(0); //0: list, 1: view, 2: edit,
  const dropdownRef = useRef(null);
  const [userInfo, setUserInfo] = useState();
  const [epkInfo, setEpkInfo] = useState();
  const [userFilterInfo, setUserFilterInfo] = useState();
  const [item, setItem] = useState();
  const [epks, setEpks] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);

  //dropdown
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    t("Filmmaker"),
    t("Sales Agent"),
    t("Distributor"),
    t("Film Festival"),
    t("Viewer"),
    t("Investor"),
    t("Actor"),
    t("Director"),
    t("Editor"),
    t("Producer"),
    t("Cinematographer"),
    t("Sound"),
    t("Writer"),
    t("Admin"),
  ];

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    console.log(`Selected: ${option}`);
    setItem({ ...item, role: option });
    setIsOpen(false);
  };

  const handleMouseEnter = (index) => {
    setHoveredRow(index);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  const getRowClass = (index) => {
    if (index === hoveredRow) {
      return true;
    } else {
      return false;
    }
  };

  const handleBackClick = () => {
    setActionStatus(0);
    setItem(null);
  };
  const handleViewClick = (item) => {
    setItem(item);

    setActionStatus(1);
  };

  const handleEditClick = (item) => {
    // alert("Edit clicked");
    setItem(item);

    setActionStatus(2);
  };

  const handleSaveClick = () => {
    const currentUser = userInfo.find((user) => user._id === item._id);

    //Check if the user has changed the item or not,oringinal item is saved in userInfo
    if (
      item.firstName === currentUser.firstName &&
      item.lastName === currentUser.lastName &&
      item.role === currentUser.role &&
      item.phone === currentUser.phone &&
      item.email === currentUser.email &&
      item.picture === currentUser.picture
    ) {
      //if not changed, return
      setActionStatus(1);
      return;
    } else {
      //Validate the item
      if (item.firstName === "" || !/^[a-zA-Z0-9]+$/.test(item.firstName)) {
        alert("Please enter valid first name");
        return;
      }
      if (item.lastName === "" || !/^[a-zA-Z0-9]+$/.test(item.lastName)) {
        alert("Please enter valid last name");
        return;
      }
      if (item.role === "Admin") {
        const confirmed = window.confirm(
          "Are you sure you want to set this user as an adminstrator?"
        );
        if (!confirmed) {
          setItem({ ...item, role: currentUser.role }); //set the role back to the original one
          return;
        }
      }
      if (item.phone !== "" && !/^\d{10}$/.test(item.phone)) {
        alert("Phone number must be 10 digits!");
        return;
      }
      if (item.email === "") {
        alert("Please enter email");
        return;
      }
    }

    //if changed, update the item
    http
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/users/updateProfile/${item._id}`,
        item
      )
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          // Success: HTTP status code is in the 2xx range
          //update the userInfo
          const userIndex = userInfo.findIndex((user) => user._id === item._id);
          if (userIndex !== -1) {
            const newUserInfo = [...userInfo];
            newUserInfo[userIndex] = item;
            setUserInfo(newUserInfo);
          }
          alert("Changes saved successfully!");
        } else {
          // Handle non-successful response
          alert("Request was not successful. Status code: " + res.status);
        }
        //If the user was editd, the filtered user info should be updated
        setUserFilterInfo((prev) => {
          const userIndex = prev.findIndex((user) => user._id === item._id);
          if (userIndex !== -1) {
            const newUserInfo = [...prev];
            newUserInfo[userIndex] = item;
            return newUserInfo;
          } else {
            return prev;
          }
        });

        setActionStatus(1);
      })
      .catch((err) => {
        alert("fail Error: ", err);
      });
  };
  const handleDeleteClick = (item) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this user's account?"
    );

    if (userConfirmed) {
      http
        .delete(
          `${process.env.REACT_APP_BACKEND_URL}/users/deleteAccount/${item._id}`
        )
        .then((res) => {
          alert(res.data.message);
          window.location.reload();
        })
        .catch((err) => {
          alert("Error: ", err);
        });
    } else {
      alert("Delete operation canceled");
    }
  };

  const checkFileMimeType = (file) => {
    if (file !== "") {
      if (
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg"
      )
        return true;
      else return false;
    } else return true;
  };

  //Upload user img in Edit page
  async function fileSelected(event) {
    const file = event.target.files[0];
    let formData = new FormData();
    formData.append("file", event.target.files[0]);

    if (checkFileMimeType(file)) {
      console.log(formData);
      try {
        const response = await http.post(
          `${process.env.REACT_APP_BACKEND_URL}/users/uploadUserAvatar`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data !== undefined) {
          console.log(response.data.key);
          setItem({ ...item, picture: response.data.key });
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("error");
      alert("File must be a image(jpeg or png)");
    }
  }

  //For dropdown
  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);
  const handleDocumentClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  //Init data
  useEffect(() => {
    Promise.all([http.get(`/fepks/`), http.get("/users/getallusers")])
      .then(([fepkResponse, usersResponse]) => {
        const usersData = usersResponse.data;
        const fepksData = fepkResponse.data;

        setUserInfo(usersData);
        setEpkInfo(fepksData);
        setUserFilterInfo(usersData);
      })
      .catch((error) => {
        console.error("An error occurred while fetching data.", error);
      });
  }, []);

  //Get User related EPKs
  useEffect(() => {
    const relatedEPKs = async () => {
      const relatedEPKs = [];

      if (epkInfo !== undefined && item !== undefined) {
        await Promise.all(
          epkInfo.map(async (epk) => {
            http.get(`/fepks/${epk._id}`).then((res) => {
              const epkData = res.data;
              if (item?.role === "Actor" && epkData.actors.length > 0) {
                if (epkData.actors.some((actor) => actor?._id === item?._id)) {
                  relatedEPKs.push(epkData);
                }
              } else if (item?.role === "Filmmaker") {
                if (
                  epkData.film_maker?.firstName === item.firstName &&
                  epkData.film_maker?.lastName === item.lastName
                ) {
                  relatedEPKs.push(epkData);
                }
              } else if (epkData.crew.length > 0) {
                //Crew

                epkData.crew.map((crew) => {
                  const fullName = crew.crewId.name;

                  if (fullName) {
                    const [firstName, lastName] = fullName.split(" ");
                    if (
                      firstName === item?.firstName &&
                      lastName === item?.lastName
                    ) {
                      const isAlreadyIncluded = relatedEPKs.some(
                        (item) => item === epkData
                      );
                      if (!isAlreadyIncluded) {
                        relatedEPKs.push(epkData);
                      }
                    }
                  }
                  return null;
                });
              }
              setEpks(relatedEPKs);
            });
          })
        );
      }
    };
    relatedEPKs();
  }, [item, epkInfo]);

  const activeString = (item) => {
    if (item.lastActive) {
      const lastActive = new Date(item.lastActive);
      const now = new Date();

      if (
        lastActive.getDate() === now.getDate() &&
        lastActive.getMonth() === now.getMonth() &&
        lastActive.getFullYear() === now.getFullYear()
      ) {
        return `Today`;
      } else if (
        lastActive.getDate() === now.getDate() - 1 &&
        lastActive.getMonth() === now.getMonth() &&
        lastActive.getFullYear() === now.getFullYear()
      ) {
        return `Yesterday`;
      } else {
        const diff = now - lastActive;
        const diffInMinutes = Math.round(diff / 60000);
        return `${Math.round(diffInMinutes / 1440)} days ago`;
      }
    } else {
      return ``;
    }
  };

  return (
    <div className="tw-flex tw-h-screen tw-flex-col tw-bg-white">
      <div className="tw-mb-8 tw-mt-24 tw-flex tw-justify-start tw-pl-24 tw-text-[#1E0039]">
        {/* <p className="tw-text-4xl">Admin Dashboard</p> */}
      </div>
      <div className="tw-mx-8 tw-flex tw-h-5/6 tw-flex-row">
        <div className="tw-ml-16 tw-mt-12 tw-h-[70vh]">
          <LeftSidebar selectedTab="Users" role={user.role} />
        </div>
        {/* tw-overflow-auto */}
        <div className="tw-ml-16 tw-mt-8 tw-flex tw-h-5/6 tw-w-5/6  tw-flex-col tw-rounded-lg tw-bg-white tw-p-4">
          {/* line */}
          <div className="tw-h-0.5 tw-w-full tw-bg-[#1E0039]"></div>
          {/* box */}
          <TopToolBar
            selectedTab="Users"
            setFilteredData={setUserFilterInfo}
            dataInfo={userInfo}
          />

          {/* List */}
          {actionStatus === 0 ? (
            <div className=" tw-w-full tw-rounded-md tw-bg-white ">
              <div className=" tw-w-full tw-overflow-auto tw-py-4">
                <div className="tw-scrollbar-width-thin tw-flex tw-h-[50px] tw-min-w-full tw-items-center tw-justify-between tw-overflow-auto tw-rounded-xl tw-bg-gray-300  tw-scrollbar-track-gray-300 tw-scrollbar-thumb-blue-500">
                  <p className="tw-text-md tw-w-3/12  tw-rounded-l-lg   tw-py-3 tw-text-center tw-font-normal tw-tracking-wider tw-text-[#1E0039]">
                    {t("Name")}
                  </p>
                  <p className=" tw-text-md tw-w-2/12 tw-py-3  tw-text-left tw-font-normal  tw-tracking-wider tw-text-[#1E0039]">
                    {t("Role")}
                  </p>
                  <p className=" tw-text-md tw-w-4/12 tw-py-3  tw-text-left  tw-font-normal tw-tracking-wider tw-text-[#1E0039]">
                    {t("Contact")}
                  </p>
                  <p className="tw-text-md  tw-w-2/12 tw-py-3 tw-text-left tw-font-normal tw-tracking-wider tw-text-[#1E0039]">
                    {t("Last Active")}
                  </p>
                  <p className="tw-text-md tw-w-1/12 tw-rounded-r-lg tw-py-3  tw-text-left tw-font-normal  tw-tracking-wider tw-text-[#1E0039]">
                    {t("Action")}
                  </p>
                </div>

                {userFilterInfo === undefined ? (
                  "Loading"
                ) : (
                  <div className=" tw-mt-[10px] tw-h-[50vh] tw-min-w-full tw-flex-col  tw-overflow-auto tw-rounded-lg tw-shadow">
                    {userFilterInfo.map((item, index) =>
                      item.deleted ? null : (
                        <div
                          key={index}
                          className={classNames(
                            getRowClass(index)
                              ? "group tw-rounded-lg tw-rounded-l-[14px] tw-bg-[#1E0039] tw-p-[2px] tw-text-white tw-shadow-2xl"
                              : "tw-bg-white tw-text-[#1E0039] ",
                            "tw-group tw-flex tw-h-[80px] tw-w-full tw-items-center tw-justify-between  tw-border-b tw-border-gray-200 tw-shadow-lg  "
                          )}
                          onMouseEnter={() => handleMouseEnter(index)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <div className="tw-w-3/12 tw-px-2 tw-py-5 tw-text-sm">
                            <div className="shadow-xl tw-flex tw-items-center">
                              <div className="tw-relative tw-h-14 tw-w-14 tw-flex-shrink-0">
                                {item.picture.includes("https") ? (
                                  <img
                                    className="tw-h-full tw-w-full tw-justify-center "
                                    src={item.picture}
                                    alt=""
                                  />
                                ) : (
                                  <img
                                    className="tw-h-full tw-w-full tw-justify-center "
                                    src={`${process.env.REACT_APP_AWS_URL}/${item.picture}`}
                                    alt=""
                                  />
                                )}
                                <div className="tw-absolute tw-inset-x-1 tw-bottom-0 tw-h-3 tw-items-start tw-rounded-lg tw-bg-gray-500 tw-bg-opacity-75 tw-text-center tw-text-[8px]  tw-text-white">
                                  <p className="tw-leading-3">{item.role}</p>
                                </div>
                              </div>
                              <div className="tw-ml-3">
                                <p className="tw-whitespace-no-wrap ">
                                  {item.firstName} {item.lastName}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className=" tw-w-2/12  tw-py-5 tw-text-sm ">
                            <p className="tw-whitespace-no-wrap ">
                              {item.role}
                            </p>
                          </div>
                          <div className=" tw-w-4/12 tw-py-5 tw-text-sm">
                            <p className="tw-whitespace-no-wrap ">
                              {item.phone}
                            </p>
                            <p className="tw-whitespace-no-wrap ">
                              {item.email}
                            </p>
                          </div>
                          <div className="  tw-w-2/12 tw-px-5 tw-py-5 tw-text-sm ">
                            <p className="tw-whitespace-no-wrap ">
                              {activeString(item)}
                              {/* {onlineUsers[item._id]
                                ? "Active"
                                : item.lastActive === undefined
                                ? "Never"
                                : item.lastActive} */}
                            </p>
                          </div>
                          <div className="  tw-w-1/12 tw-py-5 tw-text-sm ">
                            <div className="tw-relative  tw-flex tw-px-1 tw-py-1 tw-font-semibold tw-leading-tight ">
                              <img
                                src={
                                  getRowClass(index)
                                    ? MessageIconWhite
                                    : MessageIcon
                                }
                                className="tw-flex tw-h-[20px] tw-cursor-pointer tw-rounded-none tw-fill-red-500"
                                alt="View icon"
                                onClick={() => handleViewClick(item)}
                              />
                              <img
                                src={
                                  getRowClass(index)
                                    ? EditPencilIconWhite
                                    : EditPencilIcon
                                }
                                className="tw-flex tw-h-[20px] tw-cursor-pointer"
                                alt="Edit icon"
                                onClick={() => handleEditClick(item)}
                              />

                              <img
                                src={
                                  getRowClass(index)
                                    ? TrashIconWhite
                                    : TrashIcon
                                }
                                className="tw-flex tw-h-[28px] tw-cursor-pointer"
                                alt="Trash Icon"
                                onClick={() => handleDeleteClick(item)}
                              />
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : null}

          {/* View */}
          {actionStatus === 1 ? (
            <div className="tw-mt-12 tw-w-full tw-rounded-xl  tw-bg-gray-300">
              <div className=" tw-flex tw-h-12 tw-w-full tw-items-center tw-justify-between tw-rounded-xl tw-bg-[#1E0039]">
                <div className="tw-ml-4 tw-cursor-pointer tw-text-white">
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    style={{ color: "#fafafa" }}
                    onClick={handleBackClick}
                  />
                </div>
                <div className="tw-mr-3 tw-flex tw-w-16 tw-justify-around tw-text-white">
                  {/* <img
                    src={MessageIconWhite}
                    className="tw-flex tw-h-5  tw-cursor-pointer tw-rounded-none "
                    alt="View icon"
                    onClick={() => handleViewClick}
                  /> */}
                  <img
                    src={EditPencilIconWhite}
                    className="tw-flex tw-h-[20px] tw-cursor-pointer"
                    alt="Edit icon"
                    onClick={() => handleEditClick(item)}
                  />
                  <img
                    src={TrashIconWhite}
                    className="tw-flex tw-h-[28px] tw-cursor-pointer"
                    alt="Trash Icon"
                    onClick={() => handleDeleteClick(item)}
                  />
                </div>
              </div>
              <div className=" tw-justify-left tw-w-full tw-flex-col tw-rounded-xl tw-bg-gray-300 ">
                <div className="tw-flex tw-w-full tw-pl-8 tw-pt-2">
                  <div className="tw-relative tw-w-24  tw-flex-shrink-0">
                    <img
                      className="tw-h-full tw-w-full tw-justify-center "
                      src={
                        item.picture.includes("https")
                          ? item.picture
                          : `${process.env.REACT_APP_AWS_URL}/${item.picture}`
                      }
                      alt=""
                    />
                    <div className="tw-absolute tw-inset-x-1 tw-bottom-0 tw-flex tw-h-4 tw-items-center tw-justify-center tw-rounded-lg tw-bg-gray-500 tw-bg-opacity-75 tw-text-center tw-text-xs  tw-text-white">
                      <p className=" tw-leading-3">
                        {item.role.includes("_")
                          ? item.role.replace("_", " ")
                          : item.role}
                      </p>
                    </div>
                  </div>
                  <div className="tw-text-md tw-whitespace-no-wrap  tw-pl-6 tw-text-[#1E0039] ">
                    <p>
                      {item.firstName} {item.lastName}
                    </p>
                    <p>
                      {item.role.includes("_")
                        ? item.role.replace("_", " ")
                        : item.role}
                    </p>
                    <p>{item.phone}</p>
                    <p>{item.email}</p>
                  </div>
                </div>
                {epks !== undefined ? (
                  <div className="tw-w-full tw-justify-center tw-rounded-lg tw-bg-gray-300 tw-px-4 tw-pb-8 tw-pt-24">
                    <div className="tw-flex tw-w-full tw-justify-start tw-gap-4 tw-overflow-y-auto tw-rounded-lg tw-bg-[#9b94ab] tw-py-2">
                      {epks.map((epk, index) => (
                        <a
                          key={index}
                          href={`/epk/${epk.title.replace(/ /g, "-").trim()}`}
                        >
                          <img
                            src={
                              epk.image_details.includes("https")
                                ? epk.image_details
                                : `${process.env.REACT_APP_AWS_URL}/${epk.image_details}`
                            }
                            className="  tw-m-2 tw-rounded-none"
                            alt="movie cover"
                          />
                        </a>
                      ))}
                      {epks.length === 0 ? (
                        <div className="tw-block tw-h-[180px]"></div>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}

          {/* Edit */}
          {actionStatus === 2 ? (
            <div className="tw-mt-12 tw-w-full tw-rounded-xl  tw-bg-gray-300">
              <div className=" tw-flex tw-h-12 tw-w-full tw-items-center tw-justify-between tw-rounded-xl tw-bg-[#1E0039]">
                <div className="tw-ml-4 tw-cursor-pointer tw-text-white">
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    style={{ color: "#fafafa" }}
                    onClick={handleBackClick}
                  />
                </div>
                <div className="tw-mr-3 tw-flex tw-w-16 tw-justify-around tw-text-white">
                  <FontAwesomeIcon
                    icon={faFloppyDisk}
                    className="tw-mt-1 tw-cursor-pointer"
                    onClick={handleSaveClick}
                  />
                  <img
                    src={TrashIconWhite}
                    className="tw-flex tw-h-[28px] tw-cursor-pointer"
                    alt="Trash Icon"
                    onClick={() => handleDeleteClick(item)}
                  />
                </div>
              </div>
              <div className=" tw-justify-left tw-w-full tw-flex-col tw-rounded-xl tw-bg-gray-300 ">
                <div className="tw-flex tw-w-full tw-pl-8 tw-pt-2">
                  <div className="tw-relative tw-h-24 tw-w-24  tw-flex-shrink-0">
                    <label
                      htmlFor="profileImageUpload"
                      className="tw-h-full tw-w-full tw-justify-center"
                    >
                      <img
                        className="tw-h-full tw-w-full tw-cursor-pointer tw-justify-center"
                        src={
                          item.picture.includes("https")
                            ? item.picture
                            : `${process.env.REACT_APP_AWS_URL}/${item.picture}`
                        }
                        alt=""
                      />
                    </label>
                    <input
                      id="profileImageUpload"
                      type="file"
                      onChange={fileSelected}
                      // ref={inputFileRef}
                      accept="image/*"
                      className="tw-hidden"
                    />
                    <div className="tw-absolute tw-inset-x-1 tw-bottom-0 tw-flex tw-h-4 tw-items-center tw-justify-center tw-rounded-lg tw-bg-gray-500 tw-bg-opacity-75 tw-text-center tw-text-xs  tw-text-white">
                      <p className="tw-leading-3">
                        {item.role.includes("_")
                          ? item.role.replace("_", " ")
                          : item.role}
                      </p>
                    </div>
                  </div>
                  <div className="tw-text-md  tw-pl-6 tw-text-[#1E0039]">
                    <div className="tw-flex tw-w-full tw-gap-1">
                      <input
                        type="text"
                        value={
                          actionStatus === 2
                            ? item.firstName
                            : item.firstName + " " + item.lastName
                        }
                        onChange={(e) =>
                          setItem({ ...item, firstName: e.target.value })
                        }
                        className="tw-my-1 tw-h-5 tw-w-1/2 tw-rounded-2xl tw-border-none tw-p-2 tw-text-center tw-placeholder-[#1E0039] tw-shadow-lg"
                      />
                      {actionStatus === 2 ? (
                        <input
                          type="text"
                          defaultValue={item.lastName}
                          onChange={(e) =>
                            setItem({ ...item, lastName: e.target.value })
                          }
                          className="tw-my-1 tw-h-5 tw-w-1/2  tw-rounded-2xl tw-border-none tw-p-2 tw-text-center tw-placeholder-[#1E0039] tw-shadow-lg"
                        />
                      ) : null}
                    </div>

                    <div
                      ref={dropdownRef}
                      className="tw-relative  tw-h-5 tw-w-1/2 tw-rounded-2xl  tw-border-none tw-text-center tw-shadow-lg"
                    >
                      <button
                        onClick={handleToggle}
                        type="button"
                        className="tw-hover:bg-indigo-700 tw-focus:outline-none tw-focus:ring tw-focus:ring-indigo-300 tw-focus:ring-opacity-50  tw-flex tw-h-5 tw-w-full tw-items-center tw-justify-center tw-rounded-2xl tw-bg-white tw-text-[#1E0039] "
                        id="options-menu"
                        aria-haspopup="listbox"
                      >
                        {item.role.includes("_")
                          ? item.role.replace("_", " ")
                          : item.role}
                        <img
                          className=" tw-absolute tw-right-5 tw-ml-2.5 tw-h-3 tw-rounded-none"
                          src={Triangle}
                          alt="polygonThree"
                        />
                      </button>
                      {isOpen && (
                        <ul className="tw-absolute tw-right-0 tw-max-h-80 tw-origin-bottom-left tw-overflow-y-auto  tw-rounded-md tw-bg-white tw-shadow-lg tw-ring-1 tw-ring-black tw-ring-opacity-5">
                          {options.map((option, index) => (
                            <li
                              key={index}
                              onClick={(e) => handleSelect(option)}
                              className="tw-block tw-w-full tw-px-4 tw-py-2 tw-text-sm tw-text-[#1E0039] hover:tw-bg-[#1E0039] hover:tw-text-white"
                              role="menuitem"
                            >
                              {option}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <input
                      type="text"
                      placeholder={t("Phone no.")}
                      value={item.phone}
                      onChange={(e) =>
                        setItem({ ...item, phone: e.target.value })
                      }
                      className="tw-my-1 tw-h-5 tw-w-1/2 tw-rounded-2xl tw-border-none tw-p-2 tw-text-center tw-shadow-lg placeholder:tw-text-sm placeholder:tw-text-red-500"
                    />
                    <input
                      type="text"
                      placeholder={t("Email")}
                      value={item.email}
                      onChange={(e) =>
                        setItem({ ...item, email: e.target.value })
                      }
                      className="tw-my-1 tw-h-5 tw-w-9/12 tw-rounded-2xl tw-border-none tw-p-2 tw-text-center  tw-shadow-lg placeholder:tw-text-sm placeholder:tw-text-red-500"
                    />
                  </div>
                </div>
                {epks !== undefined ? (
                  <div className="tw-w-full tw-justify-center tw-rounded-lg tw-bg-gray-300 tw-px-4 tw-pb-8 tw-pt-24">
                    <div className="tw-flex tw-w-full tw-justify-start tw-gap-4 tw-overflow-y-auto tw-rounded-lg tw-bg-[#9b94ab] tw-py-2">
                      {epks.map((epk, index) => (
                        <a
                          key={index}
                          href={
                            epk.title
                              ? `/epk/${epk.title.replace(/ /g, "-").trim()}`
                              : "/"
                          }
                        >
                          <img
                            src={
                              epk.image_details.includes("https")
                                ? epk.image_details
                                : `${process.env.REACT_APP_AWS_URL}/${epk.image_details}`
                            }
                            className="  tw-m-2 tw-rounded-none"
                            alt="movie cover"
                          />
                        </a>
                      ))}
                      {epks.length === 0 ? (
                        <div className="tw-block tw-h-[180px]"></div>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
