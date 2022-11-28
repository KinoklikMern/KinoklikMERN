import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

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
          <h3>Stills:</h3>             
          {stills.map((still, key) => (
            <div className="still" key={key}>
                <p>img_url:{still.img_url}</p>
            </div>
          ) )}      
       </div>      
    )
  }

export default StillPreview













