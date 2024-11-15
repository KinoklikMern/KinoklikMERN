import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import { getFepksById } from "../api/epks";

function EditFepkLayout(props) {
    const { id } = useParams();
    const [filmName, setFilmName] = useState("");
    const [filmLink, setFilmLink] = useState("");

    useEffect(() => {
        getFepksById(id).then((response) => {
            setFilmName(response.title);
            setFilmLink(`/epk/${response._id}`);
        });
    }, [id]);

    return (
        <div className="tw-bg-backgroundGray">
            <Navbar
                className="tw-bg-backgroundGray"
                title={props.title}
                isGrayBackground
                filmName={filmName}
                filmLink={filmLink}
            />
            <div>
                <Outlet />
            </div>
        </div>
    );
}

export default EditFepkLayout;
