import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import SwitchBtn from "../components/SwitchBtn/Switch";
import HomeHead from "../components/HomeHead";
import HomeBody from "../components/HomeBody/HomeBody";
import HomeBodyActor from "../components/HomeBody/HomeBodyActor";
import Landing1 from "../components/LandingPage/Landing1";
import Landing2 from "../components/LandingPage/Landing2";
import Landing3 from "../components/LandingPage/Landing3";
import Landing5 from "../components/LandingPage/Landing5";
import Landing8 from "../components/LandingPage/Landing8";
import Landing9 from "../components/LandingPage/Landing9";
import Landing10 from "../components/LandingPage/Landing10";
import { FepkContext } from "../context/FepkContext";
import FilterTag from "../components/Filter/FilterTag";
import Landing11 from "../components/LandingPage/Landing11";
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
        const endpoint = isActorView ? 'users/getallactors/' : 'fepks/';
        
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
            <Landing1 />
            <Landing2 />
            <Landing3 />
            <Landing5 />
            <Landing8 />
            <Landing9 />
            <Landing10 />
            <Landing11 />
          </>
        )}
      </div>
    </>
  );
}

export default Home;