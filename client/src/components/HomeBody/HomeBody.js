import React, { useState, useEffect, useRef } from "react";
import "./HomeBody.css";
import "../ListItem/ListItem.css";
import "../List/List.css";
import List from "../List/List";
import http from "../../http-common";
import { FepkContext } from "../../context/FepkContext.js";
import StatusBtn from "../SwitchStatusBtn/Status";


const HomeBody = ({ role }) => {
  const [fepks, setFepks] = useState([]);
  const [filterQuery] = React.useContext(FepkContext);
  const [currentStatus, setCurrentStatus] = useState("All");
  const listRef = useRef();


 

  useEffect(() => {
    http.get(`fepks/`).then((response) => {
      setFepks(response.data);
    });
  }, []); // Fetch EPKs when the component loads

  const productionCategories = [
    { title: "POST PRODUCTION", status: "Postproduction" },
    { title: "PRODUCTION", status: "Production" },
    { title: "PRE PRODUCTION", status: "Preproduction" },
  ];

  const [filteredEPKs, setFilteredEPKs] = useState(fepks);

  const handleStatusChange = (status) => {
    setCurrentStatus(status);

    if (status === "All") {
      setFilteredEPKs(fepks); // Show all EPKs
    } else {
      // Filter EPKs based on the selected status
      const filtered = fepks.filter((fepk) => fepk.status === status);
      setFilteredEPKs(filtered);
    }
  };


  return (
    <div className="home">
      <div>
        <StatusBtn onStatusChange={handleStatusChange} />
      </div>
      {productionCategories.map((category, index) => {
        const categoryFilteredEPKs = filteredEPKs.filter(
          (fepk) =>
            fepk.status === category.status &&
            (filterQuery !== ""
              ? filterQuery.includes(fepk.production_type)
              : true)
        );

        return categoryFilteredEPKs.length > 0 ? (

          <div className="list" key={index}>
          <div className="listTitle">
            <span>{category.title}</span>
          </div>
          <div className="wrapper">
            {category.icon}
            <div className="container" ref={listRef}>
              {categoryFilteredEPKs.map((fepk) => (
                <div className="listItem" key={fepk._id}>
                 
                </div>
    ))}
            </div>
          </div>
        </div>

          // <div className="list" key={index}>
          //   <List // Render the List component
          //     title="all"
          //     status={category.status}
          //     type={category.production_type} // You might want to change this to the appropriate prop
          //     role={role}
          //   />
          // </div>

          
        ) : null;
      })}
    </div>
  );
};

export default HomeBody;