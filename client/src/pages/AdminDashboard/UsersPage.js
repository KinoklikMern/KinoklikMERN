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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UsersPage() {
  const { user } = useSelector((user) => ({ ...user }));
  const [actionStatus, setActionStatus] = useState(0); //0: list, 1: view, 2: edit,
  const dropdownRef = useRef(null);
  const [userInfo, setUserInfo] = useState();
  const [userFilterInfo, setUserFilterInfo] = useState();
  const [item, setItem] = useState();

  //dropdown
  const [isOpen, setIsOpen] = useState(false);
  const options = ["Distributor", "Actor", "Editor", "Producer"];

  const handleToggle = () => {
    console.log("handleToggle");
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    console.log(`Selected: ${option}`);
    setItem({ ...item, role: option });
    setIsOpen(false);
  };

  const imgs = [
    {
      url: "http://s3.us-east-1.amazonaws.com/kinomovie/f9c17daf535ab107c552d49191701818.png",
    },
    {
      url: "http://s3.us-east-1.amazonaws.com/kinomovie/3ab6f8ea5ee3dd35a9be9f81632be1b4.jpg",
    },
    {
      url: "http://s3.us-east-1.amazonaws.com/kinomovie/0448521dfc96c129e1729e2c5a3b2fdd.png",
    },
    {
      url: "http://s3.us-east-1.amazonaws.com/kinomovie/8a4c8ecf8141675ccc4069280413c475.jpg",
    },
    {
      url: "http://s3.us-east-1.amazonaws.com/kinomovie/575f1eda2e3be1c812d7dc1332650451.jpg",
    },
  ];

  const [hoveredRow, setHoveredRow] = useState(null);

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
    alert("Save clicked");
    setActionStatus(1);
  };
  const handleDeleteClick = (item) => {
    const userConfirmed = window.confirm(
      "Do you really want to delete this user's account?"
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

  useEffect(() => {
    Promise.all([http.get("/users/getallusers")])
      .then(([usersResponse]) => {
        const usersData = usersResponse.data;

        setUserInfo(usersData);
        setUserFilterInfo(usersData);
      })
      .catch((error) => {
        console.error("An error occurred while fetching data.", error);
      });
  }, []);

  return (
    <div className="tw-flex tw-h-screen tw-flex-col tw-bg-white">
      <div className="tw-mb-8 tw-mt-24 tw-flex tw-justify-start tw-pl-24 tw-text-[#1E0039]">
        {/* <p className="tw-text-4xl">Admin Dashboard</p> */}
      </div>
      <div className="tw-mx-8 tw-flex tw-h-5/6 tw-flex-row">
        <div className="tw-ml-16 tw-mt-12 tw-h-5/6">
          <LeftSidebar selectedTab="Users" role={user.role} />
        </div>
        {/* tw-overflow-auto */}
        <div className="tw-ml-16 tw-mt-8 tw-h-5/6 tw-w-5/6 tw-max-w-5xl tw-rounded-lg tw-bg-white tw-p-4">
          {/* line */}
          <div className="tw-h-0.5 tw-w-full tw-bg-[#1E0039]"></div>
          {/* box */}
          <TopToolBar
            selectedTab="Users"
            setFilteredData={setUserFilterInfo}
            dataInfo={userInfo}
          />

          {/* List */}
          {actionStatus == 0 ? (
            <div className=" tw-w-full tw-rounded-md tw-bg-white ">
              <div className=" tw-w-full tw-overflow-auto tw-py-4">
                <div className="tw-scrollbar-width-thin tw-flex tw-h-[50px] tw-min-w-full tw-items-center tw-justify-between tw-overflow-auto tw-rounded-xl tw-bg-gray-300  tw-scrollbar-track-gray-300 tw-scrollbar-thumb-blue-500">
                  <p className="tw-text-md tw-w-3/12  tw-rounded-l-lg   tw-py-3 tw-text-center tw-font-normal tw-tracking-wider tw-text-[#1E0039]">
                    Name
                  </p>
                  <p className=" tw-text-md tw-w-2/12 tw-py-3  tw-text-left tw-font-normal  tw-tracking-wider tw-text-[#1E0039]">
                    Role
                  </p>
                  <p className=" tw-text-md tw-w-4/12 tw-py-3  tw-text-left  tw-font-normal tw-tracking-wider tw-text-[#1E0039]">
                    Contact
                  </p>
                  <p className="  tw-text-md tw-w-2/12 tw-py-3 tw-text-left tw-font-normal tw-tracking-wider tw-text-[#1E0039]">
                    Last Active
                  </p>
                  <p className="tw-text-md tw-w-1/12 tw-rounded-r-lg tw-py-3  tw-text-left tw-font-normal  tw-tracking-wider tw-text-[#1E0039]">
                    Action
                  </p>
                </div>

                {userFilterInfo === undefined ? (
                  "Loading"
                ) : (
                  <div className="tw-mt-[10px] tw-h-[480px] tw-min-w-full tw-overflow-auto tw-rounded-lg tw-shadow">
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
                              {item.lastActive}
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
          {actionStatus == 1 ? (
            <div className="tw-mt-12 tw-w-full tw-rounded-xl  tw-bg-gray-300">
              <div className=" tw-flex tw-h-12 tw-w-full tw-items-center tw-justify-between tw-rounded-xl tw-bg-[#1E0039]">
                <div className="tw-ml-4 tw-cursor-pointer tw-text-white">
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    style={{ color: "#fafafa" }}
                    onClick={() => setActionStatus(0)}
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
                <div className="tw-w-full tw-justify-center tw-rounded-lg tw-bg-gray-300 tw-px-4 tw-pb-8 tw-pt-24">
                  <div className="tw-flex tw-w-full tw-justify-start tw-gap-4 tw-overflow-y-auto tw-rounded-lg tw-bg-[#9b94ab] tw-py-2">
                    {imgs.map((img, index) => (
                      <img
                        key={index}
                        src={img.url}
                        className="  tw-m-2 tw-rounded-none"
                        alt="movie cover"
                      ></img>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* Edit */}
          {actionStatus == 2 ? (
            <div className="tw-mt-12 tw-w-full tw-rounded-xl  tw-bg-gray-300">
              <div className=" tw-flex tw-h-12 tw-w-full tw-items-center tw-justify-between tw-rounded-xl tw-bg-[#1E0039]">
                <div className="tw-ml-4 tw-cursor-pointer tw-text-white">
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    style={{ color: "#fafafa" }}
                    onClick={() => setActionStatus(0)}
                  />
                </div>
                <div className="tw-mr-3 tw-flex tw-w-16 tw-justify-around tw-text-white">
                  {/* <img
                    src={MessageIconWhite}
                    className="tw-flex tw-h-5  tw-cursor-pointer tw-rounded-none "
                    alt="View icon"
                    onClick={() => handleViewClick}
                  /> */}
                  {/* <img
                    src={EditPencilIconWhite}
                    className="tw-flex tw-h-[20px] tw-cursor-pointer"
                    alt="Edit icon"
                    onClick={handleEditClick}
                  /> */}
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
                        // onChange={(e) =>
                        //   setItem({ ...item, name: e.target.value })
                        // }
                        className="tw-my-1 tw-h-5 tw-w-1/2 tw-rounded-2xl tw-border-none tw-p-2 tw-text-center tw-placeholder-[#1E0039] tw-shadow-lg"
                      />
                      {actionStatus == 2 ? (
                        <input
                          type="text"
                          value={item.lastName}
                          onChange={(e) =>
                            setItem({ ...item, name: e.target.value })
                          }
                          className="tw-my-1 tw-h-5 tw-w-1/2  tw-rounded-2xl tw-border-none tw-p-2 tw-text-center tw-placeholder-[#1E0039] tw-shadow-lg"
                        />
                      ) : null}
                    </div>

                    <div
                      ref={dropdownRef}
                      className="tw-relative tw-my-1 tw-h-5 tw-w-1/2 tw-rounded-2xl  tw-border-none tw-text-center tw-shadow-lg"
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
                        <ul className="tw-absolute tw-right-0 tw-origin-bottom-left   tw-rounded-md tw-bg-white tw-shadow-lg tw-ring-1 tw-ring-black tw-ring-opacity-5">
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
                      placeholder="Phone no."
                      value={item.phone}
                      onChange={(e) =>
                        setItem({ ...item, phone: e.target.value })
                      }
                      className="tw-my-1 tw-h-5 tw-w-1/2 tw-rounded-2xl tw-border-none tw-p-2 tw-text-center tw-shadow-lg placeholder:tw-text-sm placeholder:tw-text-red-500"
                    />
                    <input
                      type="text"
                      placeholder="Email"
                      value={item.email}
                      onChange={(e) =>
                        setItem({ ...item, email: e.target.value })
                      }
                      className="tw-my-1 tw-h-5 tw-w-1/2 tw-rounded-2xl tw-border-none tw-p-2 tw-text-center tw-shadow-lg placeholder:tw-text-sm placeholder:tw-text-red-500"
                    />
                  </div>
                </div>
                <div className="tw-w-full tw-justify-center tw-rounded-lg tw-bg-gray-300 tw-px-4 tw-pb-8 tw-pt-24">
                  <div className="tw-flex tw-w-full tw-justify-start tw-gap-4 tw-overflow-y-auto tw-rounded-lg tw-bg-[#9b94ab] tw-py-2">
                    {imgs.map((img, index) => (
                      <img
                        key={index}
                        src={img.url}
                        className="  tw-m-2 tw-rounded-none"
                        alt="movie cover"
                      ></img>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
