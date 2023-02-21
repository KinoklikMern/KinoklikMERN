import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Epkcover from "../components/Epk/Present/Cover";
import Details from "../components/Epk/Present/details";
import Logline from "../components/Epk/Present/logline";
import Synopsis from "../components/Epk/Present/synopsis";
import Uniqueness from "../components/Epk/Present/uniqueness";
import Cast from "../components/Epk/Present/cast";
import Director from "../components/Epk/Present/director";
import Producer from "../components/Epk/Present/producer";
import Cinematographer from "../components/Epk/Present/cinematographer";
import Stills from "../components/Epk/Present/stills";
import Review from "../components/Epk/Present/review";
import Resources from "../components/Epk/Present/Resources";
import Trailer from "../components/Epk/Present/Trailer"
import { renderCloseIcon } from "antd/es/modal/PurePanel";
import Footer from"../components/Footer"

function EPK() {

    const { user } = useSelector((user) => ({ ...user }));
    const id = 5;

    //Cover
    const [coverList, setCoverList] = useState(null); 
    useEffect(() => {
      getEpktCover(id);
    }, []);
    async function getEpktCover(id) {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/epk/EpkCover/` + id,
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

        //Details
        const [detailsList, setDetailsList] = useState(null); 
        useEffect(() => {
          getEpktDetails(id);
        }, []);
        async function getEpktDetails(id) {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/epk/EpkDetails/` + id,
            {
              method: "GET",
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            }
          );
          const detailsList1 = await response.json();
          console.log(detailsList1);
          setDetailsList(detailsList1);
        }

  //Logline
  const [loglineList, setLoglineList] = useState(null);
  useEffect(() => {
    getEpktLogline(id);
  }, []);
  async function getEpktLogline(id) {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/epk/EpkLogline/` + id,
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
  const [synopsisList, setSynopsisList] = useState(null);
  useEffect(() => {
    getEpkSynopsis(id);
  }, []);
  async function getEpkSynopsis(id) {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/epk/EpkSynopsis/` + id,
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
        `${process.env.REACT_APP_BACKEND_URL}/epk/EpkUniqueness/` + id,
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
        `${process.env.REACT_APP_BACKEND_URL}/epk/EpkCast/` + id,
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
      `${process.env.REACT_APP_BACKEND_URL}/epk/EpkDirector/` + id,
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

    //Producer
    const [producerList, setProducerList] = useState(null);
    useEffect(() => {
      getEpktProducer(id);
    }, []);
    async function getEpktProducer(id) {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/epk/EpkProducer/` + id,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const producerList1 = await response.json();
      console.log(producerList1);
      setProducerList(producerList1);
    }

    //Cinematographer
    const [cinematographerList, setCinematographerList] = useState(null);
    useEffect(() => {
      getEpktCinematographer(id);
    }, []);
    async function getEpktCinematographer(id) {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/epk/EpkCinematographer/` + id,
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

  //Stills
  const [stillsList, setStillsList] = useState(null);
  useEffect(() => {
    getEpktStills(id);
  }, []);
  async function getEpktStills(id) {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/epk/EpkStills/` + id,
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

  //Review
  const [reviewList, setReviewList] = useState(null);
  useEffect(() => {
    getEpktReview(id);
  }, []);
  async function getEpktReview(id) {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/epk/EpkReview/` + id,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const reviewList1 = await response.json();
    console.log(reviewList1);
    setReviewList(reviewList1);
  }
  
  //Resources
  const [resourcesList, setResourcesList] = useState(null);
  useEffect(() => {
    getEpkResources(id);
  }, []);
  async function getEpkResources(id) {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/epk/EpkResources/` + id,
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

    // // trailer
    // const [trailerList, setTrailerList] = useState(null);
    // useEffect(() => {
    //   getEpkTrailer(id);
    // }, []);
    // async function getTrailer(id) {
    //   const response = await fetch(
    //     "http://localhost:8000/epk/EpkTrialer/" + id,
    //     {
    //       method: "GET",
    //       headers: {
    //         "Content-type": "application/json; charset=UTF-8",
    //       },
    //     }
    //   );
    //   const trailerList1 = await response.json();
  
    //   console.log(trailerList1);
    //   setResourcesList(trailerList1);


    /*  console.log(shortSynopsis);
      console.log(mediumSynopsis);
      console.log(longSynopsis);*/
  }


  return (
    <>
    <div className="container">
      
      {/* {coverList && coverList.map((s) => <EpkCover coverFile={s} />)} */}
      {detailsList && detailsList.map((s) => <Details detailsFile={s} />)}
      {loglineList && loglineList.map((s) => <Logline loglineFile={s} />)}
      {synopsisList && synopsisList.map((s) => <Synopsis synopsFile={s} />)}
      {uniquenessList && uniquenessList.map((s) => <Uniqueness uniquenessFile={s} />)}
      {castList && castList.map((s) => <Cast castFile={s} />)}
      {directorList && directorList.map((s) => <Director directorFile={s} />)}
      {producerList && producerList.map((s) => <Producer producerFile={s} />)}
      {cinematographerList && cinematographerList.map((s) => <Cinematographer cinematographerFile={s} />)}
      {stillsList && stillsList.map((s) => <Stills stillsFile={s} />)}
      {resourcesList && resourcesList.map((s) => <Resources resFile={s} />)}
      <Trailer/>
      {reviewList && reviewList.map((s) => <Review reviewFile={s} />)}
      {/* {trailerList && trailerList.map((s) => <Trailer trailerFile={s} />)} */}
      
      <Footer/>
    </div>
    </>
    );
}

export default EPK;