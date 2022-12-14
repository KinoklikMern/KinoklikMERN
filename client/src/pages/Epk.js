import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AllSynopsis from "../components/Epk/Present/allSynopsis";
import Synopsis from "../components/Epk/Present/synopsis";
import Resources from "../components/Epk/Present/Resources";
import EpkCover from "../components/Epk/Present/EpkCover";

function EPK() {
  const [synopsisList, setSynopsisList] = useState(null);
  const [resourcesList, setResourcesList] = useState(null);
  
  const { user } = useSelector((user) => ({ ...user }));
  // const id = JSON.parse(localStorage.getItem("epk"));
  const id = 4;

//Synopsis
  useEffect(() => {
    getEpkSynopsis(id);
  }, []);
  async function getEpkSynopsis(id) {
    const response = await fetch(
      "http://localhost:8000/epk/EpkSynopsis/" + id,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const synopsisList1 = await response.json();

    console.log(synopsisList1);
    setSynopsisList(synopsisList1);

    /*  console.log(shortSynopsis);
      console.log(mediumSynopsis);
      console.log(longSynopsis);*/
  }

//Resources
  useEffect(() => {
    getEpkResources(id);
  }, []);
  async function getEpkResources(id) {
    const response = await fetch(
      "http://localhost:8000/epk/EpkSynopsis/" + id,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const resourcesList1 = await response.json();

    console.log(resourcesList1);
    setSynopsisList(resourcesList1);

    /*  console.log(shortSynopsis);
      console.log(mediumSynopsis);
      console.log(longSynopsis);*/
  }

  return (

    <>
    <EpkCover />
    {synopsisList && synopsisList.map((s) => <Synopsis synopsFile={s} />)}{resourcesList && resourcesList.map((s) => <Resources resFile={s} />)}</>

    </>
  );
}

export default EPK;
