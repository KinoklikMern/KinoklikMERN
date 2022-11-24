
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";



const Uniques = ({ epkuniques }) => {
  const [uniques, setUniques] = useState(epkuniques);
  
  //console.log("epkuniques:"+epkuniques);
  //console.log("uniques:"+uniques);

  //const nextList = [...uniques];
  //console.log("nextlist:"+nextList);


  //const [uniques, setUniques] = useState<{header: string, content: string,img_url:string}[]>([]);
 

  uniques = setUniques (epkuniques.map(item=>({...item}))); 
  //setUniques(epkuniques);
  //console.log(epkuniques);
  console.log(uniques);

  const params = useParams();
  const navigate = useNavigate();


  async function onSubmit(e) {
    e.preventDefault();
    //console.log(uniques);
    //console.log(JSON.stringify({ uniques }));
    //console.log(JSON.stringify({ uniques:uniques }));
  
    // This will send a put request to update the data in the database.
    await fetch(`http://127.0.0.1:8000/epk/${params.id}/uniques`, {
      method: 'PUT',      
      body: JSON.stringify({ uniques:uniques }),     
      headers: {
        'Content-Type': 'application/json'
      },
    });
  
    navigate("/movies");
  }



  return ( 
   
      <div>  
        <h3>Uniques:</h3>
        <form onSubmit={onSubmit}>
     
        {uniques.map((unique, key) => (
          <div className="unique" key={key}>
              <p>header:{unique.header}</p>
              <input
                    type="text"
                    className="form-control"        
                    value={unique.header}  
                    onChange={(e) => {
                        unique.header = e.target.value;                  
                        setUniques([...uniques]);                      
                        //setUniques( arr => [...arr, `${arr.length}`]);    
                      } }  
                        
                    />
              <p>content:{unique.context}</p>
              <input
                    type="text"
                    className="form-control"        
                    value={unique.content}  
                    onChange={(e) => {
                        unique.content = e.target.value;
                        setUniques([...uniques]);
                        //setUniques( arr => [...arr, `${arr.length}`]);   
                       } }       
                    />
              <p>img_url:{unique.img_url}</p>
              <input
                    type="text"
                    className="form-control"        
                    value={unique.img_url}  
                    onChange={(e) => {
                        unique.img_url = e.target.value;
                        setUniques([...uniques]);
                        //setUniques( arr => [...arr, `${arr.length}`]); 
                     
                       } }       
                    />
          </div>
        ) )}
     
        <div className="form-group">
        <input
          type="submit"
          value="Save Uniques"
          className="btn btn-primary"
        />
      </div>
    </form>
    </div>
    
  )
}

export default Uniques

