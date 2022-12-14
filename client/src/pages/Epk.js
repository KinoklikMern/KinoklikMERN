import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AllSynopsis from "../components/Epk/Present/allSynopsis";
import Synopsis from "../components/Epk/Present/synopsis";
import Resources from "../components/Epk/Present/Resources";
import EpkCover from "../components/Epk/Present/EpkCover";
import Logline from "../components/Epk/Present/logline";
import Uniqueness from "../components/Epk/Present/uniqueness";
import Cast from "../components/Epk/Present/cast";
import Director from "../components/Epk/Present/director";
import Producer from "../components/Epk/Present/producer";
import Cinematographer from "../components/Epk/Present/cinematographer";
import Stills from "../components/Epk/Present/stills";
import { renderCloseIcon } from "antd/es/modal/PurePanel";

function EPK() {

    const { user } = useSelector((user) => ({ ...user }));
    const [synopsisList, setSynopsisList] = useState(null);
    const [resourcesList, setResourcesList] = useState(null);
    const id = 4;
     
    //Cover
    const [coverList, setCoverList] = useState(null); 
    useEffect(() => {
      getEpktCover(id);
    }, []);
    async function getEpktCover(id) {
      const response = await fetch(
        "http://localhost:8000/epk/EpkCover/" + id,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const coverList1 = await response.json();
      console.log(coverList1);
      setCoverList(coverList1);
    }

  //Logline
  const [loglineList, setLoglineList] = useState(null);
  useEffect(() => {
    getEpktLogline(id);
  }, []);
  async function getEpktLogline(id) {
    const response = await fetch(
      "http://localhost:8000/epk/EpkLogline/" + id,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const loglineList1 = await response.json();
    console.log(loglineList1);
    setLoglineList(loglineList1);
  }

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
  }

    //Uniqueness
    const [uniquenessList, setUniquenessList] = useState(null);
    useEffect(() => {
      getEpkUniqueness(id);
    }, []);
    async function getEpkUniqueness(id) {
      const response = await fetch(
        "http://localhost:8000/epk/EpkUniqueness/" + id,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const uniquenessList1 = await response.json();
      console.log(uniquenessList1);
      setUniquenessList(uniquenessList1);
    }

    //Cast
    const [castList, setCastList] = useState(null);
    useEffect(() => {
      getEpktCast(id);
    }, []);
    async function getEpktCast(id) {
      const response = await fetch(
        "http://localhost:8000/epk/EpkCast/" + id,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const castList1 = await response.json();
      console.log(castList1);
      setCastList(castList1);
    }

//Resources
  useEffect(() => {
    getEpkResources(id);
  }, []);
  async function getEpkResources(id) {
    const response = await fetch(
      "http://localhost:8000/epk/EpkResources/" + id,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const resourcesList1 = await response.json();

    console.log(resourcesList1);
    setResourcesList(resourcesList1);

  }

  //Stills
  const [stillsList, setStillsList] = useState(null);
  useEffect(() => {
    getEpktStills(id);
  }, []);
  async function getEpktStills(id) {
    const response = await fetch(
      "http://localhost:8000/epk/EpkStills/" + id,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const stillsList1 = await response.json();
    console.log(stillsList1);
    setStillsList(stillsList1);
  }
  return (
    <>
    <div className="container">
      < EpkCover />
      {/* {coverList && coverList.map((s) => <EpkCover coverFile={s} />)} */}
      {loglineList && loglineList.map((s) => <Logline loglineFile={s} />)}
      {synopsisList && synopsisList.map((s) => <Synopsis synopsFile={s} />)}
      {uniquenessList && uniquenessList.map((s) => <Uniqueness uniquenessFile={s} />)}
      {castList && castList.map((s) => <Cast castFile={s} />)}
      
      {stillsList && stillsList.map((s) => <Stills stillsFile={s} />)}

      {resourcesList && resourcesList.map((s) => <Resources resFile={s} />)}
    </div>
    </>
  );
}

export default EPK;
