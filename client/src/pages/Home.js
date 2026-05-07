import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import SwitchBtn from "../components/SwitchBtn/Switch";
import HomeHead from "../components/HomeHead";
import HomeBody from "../components/HomeBody/HomeBody";
import HomeBodyActor from "../components/HomeBody/HomeBodyActor";
import LandingHero from "../components/LandingPage/LandingHero";
import LandingEpkExample from "../components/LandingPage/LandingEpkExample";
import LandingEpkIntroductions from "../components/LandingPage/LandingEpkIntroductions";
import LandingIntroductions from "../components/LandingPage/LandingIntroductions";
import LandingFilmCarousels from "../components/LandingPage/LandingFilmCarousels";
import LandingInstructions from "../components/LandingPage/LandingInstructions";
import LandingFaq from "../components/LandingPage/LandingFaq";
import { FepkContext } from "../context/FepkContext";
import FilterTag from "../components/Filter/FilterTag";
import LandingNewsletter from "../components/LandingPage/LandingNewsletter";
import http from "../http-common"; 

function Home() {
  const [data, setData] = useState([]);
  const location = useLocation();
  const user = useSelector((state) => state.user);
  // eslint-disable-next-line no-unused-vars
  const {fepkMaker, setFepkMaker} = React.useContext(FepkContext);
  useEffect(() => {
    setFepkMaker([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!user) return;
    
    const fetchData = async () => {
      try {
        const isActorView = location.pathname === '/actors';
        const endpoint = isActorView ? 'users/getactors/' : 'fepks/';
        
        const response = await http.get(endpoint);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
      
    fetchData();
  }, [location.pathname, user]); 

  return (
    <>
      <div className='tw-overflow-hidden'>
        {user && (
          <>
            <HomeHead role={location.pathname === '/actors' ? 'actor' : 'epk'} data={data} />
            <SwitchBtn />
            <FilterTag role={location.pathname === '/actors' ? 'actor' : 'epk'} />
            
            {location.pathname === '/actors' ? (
              <HomeBodyActor data={data} /> 
            ) : (
              <HomeBody data={data} />
            )}
          </>
        )}
        {!user && (
          <>
            <LandingHero />
            <LandingEpkExample />
            <LandingEpkIntroductions />
            <LandingIntroductions />
            <LandingFilmCarousels />
            <LandingInstructions />
            <LandingFaq />
            <LandingNewsletter />
          </>
        )}
      </div>
    </>
  );
}

export default Home;