////////////////////////////////////////////////
// Create filmMakerDashboard page
// Edit by Tony 
// On Jan 15, 2023
////////////////////////////////////////////////
import { useSelector } from "react-redux";
import { React, useEffect, useState } from 'react'
import Axios from "axios"
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faComments} from '@fortawesome/free-solid-svg-icons'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faHome} from '@fortawesome/free-solid-svg-icons'
import { faInbox } from '@fortawesome/free-solid-svg-icons'
import { faBell} from '@fortawesome/free-solid-svg-icons'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faNewspaper} from '@fortawesome/free-solid-svg-icons'
import { faPhotoFilm } from '@fortawesome/free-solid-svg-icons'
import { faDollarSign} from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import { faCrown } from '@fortawesome/free-solid-svg-icons'
import { Link, NavLink } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './filmMakerDashboardPage.scss'
import FilmMakerSideBar from "../../components/FilmMaker/filmMakerSideBar";

export default function Filmmaker() {
  const [epkList, setEpkList] = useState([]);
  useEffect(() => {
    try {
      Axios.get(process.env.REACT_APP_BACKEND_URL + "/filmmaker/").then((rs) => {
        setEpkList(rs.data);
      });
    } catch (error) {
      alert(error.response.data.message);
    }
  }, []);

  return (
    <div class="filmmakerdash-container container-fluid">
      <div class="sidebar-container"> 

        <FilmMakerSideBar />

        <div class="sidebar-right">
          <article class="tab-pane fade show active" role="tabpanel" aria-labelledby="llanfairpwllgwyngyll-left-tab" id="dashboard">
            <div class="sidebar-rightcontainer">
              <div class="item Dashboard">
                <h1>Filmmaker Dashboard</h1>

                <Link to="/uploadFepk"> 
                  <Button> 
                    Create New Film EPK
                  </Button>
                  <br /><br />
                </Link>
                
                { (!epkList) ? ( () => (    
                  <div>
                    <p class="icon-plus">
                      You don`t have any EPK created.To start promoting your film right away.
                    </p>
                    <Button> Create your free film EPK now! </Button>
                  </div>
                )) : null }

                <div class="row g-5">
                  {epkList.map((epk) => (
                    <div class="col-4">
                      <Link to={`/filmMakerSelectedEpk?id=${epk._id}`} class="links">
                        <div class="card movie-card">
                        
                          <img src={`${process.env.REACT_APP_AWS_URL}/${epk.banner_url}`} alt="movie banner"/>

                          <div class="card-body">
                            
                            <div class="d-flex justify-content-between align-items-center pb-1 small-numbers">
                              <p>{(epk.wishes_to_buy == null) ? "0" : epk.wishes_to_buy.length}</p>
                              <p>{(epk.likes == null) ? "0" : epk.likes.length}</p>
                              <p>{(epk.favourites == null) ? "0" : epk.favourites.length}</p>
                              <p>{(epk.sharings == null) ? "0" : epk.sharings.length}</p>
                            </div>
                            
                            <div class="d-flex justify-content-between align-items-center pb-1">
                              <FontAwesomeIcon icon={faDollarSign} />
                              <FontAwesomeIcon icon={faStar} />  
                              <FontAwesomeIcon icon={faBookmark} /> 
                              <FontAwesomeIcon icon={faShareNodes} /> 
                            </div>
                          </div>
                        </div>
                      </Link>
                      <Link to={`/editFepk/${epk._id}`} style={{color:"white", float:"right"}}>update</Link>
                    </div>
                  ))}
                </div>
              </div>  
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
