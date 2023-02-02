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
import 'bootstrap/dist/css/bootstrap.min.css';
import './filmMakerDashboard.scss'
import movie6 from '../../images/movies/movie6.jpg';
import movie2 from '../../images/movies/movie2.jpeg';
import movie5 from '../../images/movies/movie5.jpg';

export default function Filmmaker() {
  const [epkList, setEpkList] = useState([]);
  useEffect(() => {
    try {
      Axios.get(process.env.REACT_APP_BACKEND_URL + "/filmMakerDashboard").then((rs) => {
        setEpkList(rs.data);
      });
    } catch (error) {
      alert(error.response.data.message);
    }
  }, []);

  return (
    <div class="filmmakerdash-container container-fluid">
      <div class="sidebar-container"> 
        <div class="sidebar-left">
          
          <ul class="nav nav-tabs filmmaker-dash-ul">

            <li>
              <div class="sidebarnav-icon side-button">
                <a href="/Notification.js">
                  <FontAwesomeIcon icon={faNewspaper} />  
                </a>
              </div>
            </li>

            <li class="nav-item" role="presentation">
              <div class="nav-link tab-clickable" data-bs-toggle="tab" data-bs-target="#dashboard" role="tab" >
                <div class="sidebarnav-icon side-button">
                  <FontAwesomeIcon icon={faPhotoFilm} />  
                </div>  
              </div>
            </li>

            <li class="nav-item" role="presentation">
              <div class="nav-link tab-clickable" data-bs-toggle="tab" data-bs-target="#inbox" role="tab" >
                <div class="sidebarnav-icon side-button">
                  <Link to="/filmMakerDashboard" class="links"><FontAwesomeIcon icon={faHome}/></Link>   
                </div>
              </div>
            </li>

            <li class="nav-item" role="presentation">
              <div class="nav-link tab-clickable" data-bs-toggle="tab" data-bs-target="#notifications" role="tab" >
                <div class="sidebarnav-icon side-button">
                  <FontAwesomeIcon icon={faBell} />   
                </div>
              </div>
            </li>





            <li class="nav-link" role="tab" data-li="UserProfile">
              <div class="sidebarnav-icon side-button">
                <Link to="/filmMakerDashboardSecurity" class="links"><FontAwesomeIcon icon={faCog}/></Link>
              </div>
            </li>
          </ul>
          
        </div>

        <div class="sidebar-right">
          <article class="tab-pane fade show active" role="tabpanel" aria-labelledby="llanfairpwllgwyngyll-left-tab" id="dashboard">
            <div class=" sidebar-rightcontainer">
              <div class="item Dashboard">
                <h1>Filmmaker Dashboard</h1>
                <h1> <Link to="/uploadEpk" class="icon-plus"> <FontAwesomeIcon icon={faPlus} /> </Link></h1>
                
                { (!epkList) ? ( () => (    
                  <div>
                    <p class="icon-plus">
                      You don`t have any EPK created.To start promoting your film right away.
                    </p>
                    <Button> Create your free film EPK now! </Button>
                  </div>
                )) : null }

                <div class="row row-cols-1 row-cols-md-3 g-4">
                  {epkList.map((epk) => (
                    <div class="col">
                      <Link to="/filmMakerSelectedMovie" class="links">
                        <div class="card movie-card">
                        
                          <img src={epkList.banner_url} alt="movie banner"/>
                                
                          <div class="card-body">
                            
                            <div class="d-flex justify-content-between align-items-center pb-1 small-numbers">
                              <p>{epk.wishes_to_buy.length}</p>
                              <p>{epk.favourites.length}</p>
                              <p>{epk.likes.length}</p>
                              <p>{epk.sharings.length}</p>
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
                    </div>
                  ))}
                </div>
                <div class="side-id">
                  <FontAwesomeIcon icon={faUser}/> 
                </div>
              </div>  
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
