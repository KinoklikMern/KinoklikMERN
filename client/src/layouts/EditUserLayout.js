/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import http from "../http-common";

function EditUserLayout(props) {
    const { id } = useParams();
    const [userName, setUserName] = useState("");
    const [profileLink, setProfileLink] = useState("");

    useEffect(() => {
        http.get(`/users/${id}`).then((response) => {
            const { firstName, lastName, _id } = response.data;
            const fullName = firstName || lastName ? `${firstName} ${lastName}` : "User Profile";
            
            setUserName(fullName);
            setProfileLink(`/user/${_id}`);
        }).catch(err => {
            console.error("Error loading user layout data:", err);
        });
    }, [id]);

    return (
        <div className="tw-bg-backgroundGray">
            <Navbar
                className="tw-bg-backgroundGray"
                title={props.title}
                isGrayBackground
                userName={userName}
                profileLink={profileLink}
            />
            <div className="tw-pt-4">
                <Outlet />
            </div>
        </div>
    );
}

export default EditUserLayout;