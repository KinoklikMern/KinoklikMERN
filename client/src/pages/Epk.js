import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AllSynopsis from "../components/Epk/Present/allSynopsis";
import Synopsis from "../components/Epk/Present/synopsis";
function EPK() {
  const [synopsisList, setSynopsisList] = useState(null);
  const { user } = useSelector((user) => ({ ...user }));
  // const id = JSON.parse(localStorage.getItem("epk"));
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

    /*  console.log(shortSynopsis);
      console.log(mediumSynopsis);
      console.log(longSynopsis);*/
  }

  return (
    <>{synopsisList && synopsisList.map((s) => <Synopsis synopsFile={s} />)}</>
  );
}

export default EPK;
