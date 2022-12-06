import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Synopsis from "../components/Epk/Present/synopsis";
import Cast from "../components/Epk/Present/cast";
import Director from "../components/Epk/Present/director";
import Cinematographer from "../components/Epk/Present/cinematographer";

function EPK() {

  //Synopsis
  const [synopsisList, setSynopsisList] = useState(null);
  const { user } = useSelector((user) => ({ ...user }));
  const id = 3;
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

  //Director
  const [directorList, setDirectorList] = useState(null);
  useEffect(() => {
    getEpktDirector(id);
  }, []);
  async function getEpktDirector(id) {
    const response = await fetch(
      "http://localhost:8000/epk/EpkDirector/" + id,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const directorList1 = await response.json();
    console.log(directorList1);
    setDirectorList(directorList1);
  }

    //Cinematographer
    const [cinematographerList, setCinematographerList] = useState(null);
    useEffect(() => {
      getEpktCinematographer(id);
    }, []);
    async function getEpktCinematographer(id) {
      const response = await fetch(
        "http://localhost:8000/epk/EpkCinematographer/" + id,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const cinematographerList1 = await response.json();
      console.log(cinematographerList1);
      setCinematographerList(cinematographerList1);
    }


  return (
    <>
      {/* {synopsisList && synopsisList.map((s) => <Synopsis synopsFile={s} />)} */}
      {castList && castList.map((s) => <Cast castFile={s} />)}
      {/* {directorList && directorList.map((s) => <Director directorFile={s} />)}
      {cinematographerList && cinematographerList.map((s) => <Cinematographer cinematographerFile={s} />)} */}

    </>

  );
}

export default EPK;
