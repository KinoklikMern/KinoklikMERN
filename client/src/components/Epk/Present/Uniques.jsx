import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

const UniquesPreview = () => {


  
    const [uniques, setUniques] = useState([{},{}]);
  
    //const [uniques, setUniques] = useState<{header: string, content: string,img_url:string}[]>([]);
   
    //setUniques(epkuniques);
    //console.log(epkuniques);
  
  
    const params = useParams();
    const navigate = useNavigate();
  
    console.log(uniques);
  
  
    useEffect(() => {
      async function fetchData() {
        const id = params.id.toString();;
        const response = await fetch(`http://127.0.0.1:8000/epk/${params.id.toString()}/uniques`);
           
    
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
    
        
        setUniques(record[0].uniques); 
        console.log(uniques.length);
        //if (uniques.length <=2 ){     
        //  setUniques([...uniques, {}])
        //}
    
      }
    
      fetchData();
    
      return;
    }, [params.id, navigate]);
  
    async function onSubmit(e) {
      e.preventDefault();
      setUniques([...uniques]);   
      //console.log(uniques);
      //console.log(JSON.stringify({ uniques }));
      //console.log(JSON.stringify({ uniques:uniques }));
    
      // This will send a put request to update the data in the database.
      await fetch(`http://127.0.0.1:8000/epk/${params.id}/uniques`, {
        method: 'PATCH',      
        body: JSON.stringify({ uniques:uniques }),     
        headers: {
          'Content-Type': 'application/json'
        },
      });
    
      //navigate("/movies");
    }
  
  
  

  
    return ( 
     
        <div>  
               
          {uniques.map((unique, key) => (
            <>
               
            <div className="unique" key={key}>
                {unique.header || unique.content || unique.img_url?    
                <>
                 <h3>Uniques:</h3>    
                  <p>header:{unique.header}</p>
                  <p>content:{unique.content}</p>
              
                  <img src={unique.img_url} width="500" ></img>
                </>
                : <br/>}
            </div>
            </>
          ) )}      
       </div>      
    )
  }


export default UniquesPreview








