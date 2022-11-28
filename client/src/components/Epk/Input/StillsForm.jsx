import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

const Stills = () => {

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

  async function onSubmit(e) {
    e.preventDefault();
    setStills([...stills]);   
 
  
    // This will send a put request to update the data in the database.
    await fetch(`http://127.0.0.1:8000/epk/${params.id}/stills`, {
      method: 'PATCH',      
      body: JSON.stringify({ stills:stills }),     
      headers: {
        'Content-Type': 'application/json'
      },
    });
  
    navigate("/movies");
  }



  return ( 
   
      <div>  
        <h3>Still:</h3>
        <form onSubmit={onSubmit}>
     
        {stills.map((still, key) => (
          <div className="still" key={key}>
              <p>img:{still.img_url}</p>
         </div>
        ) )}
     
        <div className="form-group">
        <input
          type="submit"
          value="Save"
          className="btn btn-primary"
        />
      </div>
    </form>
    </div>
    
  )
}

export default Stills
