import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import './Uniques.css';
import http from "../../../http-common";

const UniquesPreview = () => {


  
  
    const params = useParams();
    const navigate = useNavigate();
  
    

    const [uniqueData, setUniqueData] = useState({
        unique1_title: "",
        unique1_description: "",
        unique1_poster_url: "",
        unique2_title: "",
        unique2_description: "",
        unique2_poster_url: "",  
      });
  
    useEffect(() => {
      async function fetchData() {
        const id = params.id.toString();;
        /*const response = await fetch(`http://127.0.0.1:8000/epks/${params.id.toString()}/uniques`);
           
    
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
    
        
        //setUniques(record[0].uniques); 
        //console.log(uniques.length);
        //if (uniques.length <=2 ){     
        //  setUniques([...uniques, {}])
        //}
        uniqueData.unique1_title=record[0].unique1_title
        uniqueData.unique2_title=record[0].unique2_title
        uniqueData.unique1_description=record[0].unique1_description
        uniqueData.unique2_description=record[0].unique2_description
        uniqueData.unique1_poster_url=record[0].unique1_poster_url
        uniqueData.unique2_poster_url=record[0].unique2_poster_url
        console.log("present");
        console.log(uniqueData);
    */
        http
        .get(`epks/${params.id.toString()}/uniques`)
        .then((response) => {
          //console.log("response");
          //console.log(response);
          if (!(response.statusText) ==="OK") {
            console.log("error");
            const message = `An error has occurred: ${response.statusText}`;
            window.alert(message);
            return;
          }
      
          const record = response.data;
          //console.log("record");
          //console.log(record);
          if (!record) {
            window.alert(`epk Record with id ${id} not found`);
            navigate("/movies");
            return;
          }
  
       
           //console.log("before set");
           //console.log(uniqueData);
           setUniqueData(record[0]); 
        
          
         
          /*uniqueData.unique1_title=record[0].unique1_title
          uniqueData.unique2_title=record[0].unique2_title
          uniqueData.unique1_description=record[0].unique1_description
          uniqueData.unique2_description=record[0].unique2_description
          uniqueData.unique1_poster_url=record[0].unique1_poster_url
          uniqueData.unique2_poster_url=record[0].unique2_poster_url*/
          //console.log("after set");
          //console.log(uniqueData);
        }  ) 
      }
    
      fetchData();
    
      return;
    }, [params.id, navigate]);
  
 
  
  
  

  
    return ( 
    
        <div class = "container" >  
          <h1 class="unique-section-title">Uniqueness</h1>      
 
         
            <div >
                {  uniqueData.unique1_title || uniqueData.unique1_description || uniqueData.unique1_poster_url?      
                <>           
                  
                    <div class ="unique-container"   >
                       <p></p>
                        <img src={uniqueData.unique1_poster_url}  class="img-fluid "/>                      
                        <div  class = "unique-title">{uniqueData.unique1_title}</div>
                        <div class = "unique-description">{uniqueData.unique1_description}</div>    
                        <br/>
                    </div> 
                </>
                :<br/>}
            </div>

            <div >
                {  uniqueData.unique2_title || uniqueData.unique2_description || uniqueData.unique2_poster_url?      
                <>            
                   
                    <div class ="unique-container"   >
                    <p></p>
                        <img src={uniqueData.unique2_poster_url}  class="img-fluid "/>
                     
                        <div  class = "unique-title">{uniqueData.unique2_title}</div>
                        <div class = "unique-description">{uniqueData.unique2_description}</div>    
                        <br/>
                    </div> 
                </>
                :<br/>}
            </div>
          
       </div>      
       
    )
  }


export default UniquesPreview








