import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import './Stills.css';

const StillPreview = () => {

  
    const [stills, setStills] = useState([]);
   
    const params = useParams();
    const navigate = useNavigate();
 
  
  
    useEffect(() => {
      async function fetchData() {
        const id = params.id.toString();;
        const response = await fetch(`http://127.0.0.1:8000/epk/${params.id.toString()}/stills`);
           
    
        if (!response.ok) {
          const message = `An error has occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
    
        const record = await response.json();
        if (!record) {
          window.alert(`epk Record with id ${id} not found`);
          navigate("/movies");
          return;
        }
    
        
        setStills(record[0].stills); 
        console.log(stills.length);
           
      }
    
      fetchData();
    
      return;
    }, [params.id, navigate]);
  
     
  
    return ( 
     
        <div>  

                    <div class="container text-center">
                    <div  >
                   
                  
                         <div   class="grid">  
                         <img src="https://mediafiles.cineplex.com/Central/Film/Posters/32004_320_470.jpg" ></img>
                         <img src="https://api.time.com/wp-content/uploads/2015/07/southpaw-jake-gyllenhaal.jpg" ></img>
                         <img src="https://mediafiles.cineplex.com/Central/Film/Posters/32004_320_470.jpg" ></img>
                         <img src="https://api.time.com/wp-content/uploads/2015/07/southpaw-jake-gyllenhaal.jpg" ></img>
                         <img src="https://api.time.com/wp-content/uploads/2015/07/southpaw-jake-gyllenhaal.jpg" ></img>
                         </div>
                        
                       

                      </div>
                      </div>

        
        <div class="container text-center" >
        <div  class = "grid">
            
          {stills.map((still, key) => (
            <>
            <div className="still" key={key}  >
                <img src={still.img_url}  class="img-fluid"></img>
            </div>
            </>
          ) )}  

          </div>
          </div>
       </div>      
    )
  }

export default StillPreview













