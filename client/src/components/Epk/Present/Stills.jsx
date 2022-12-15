/*import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import './Stills.css';
import http from "../../../http-common";

const StillPreview = () => {

  
    //const [stills, setStills] = useState([]);
   
    const params = useParams();
    const navigate = useNavigate();
 
    const [stillData, setStillData] = useState({
        still_img1_url: "",
        still_img2_url: "",
        still_img3_url: "",
        still_img4_url: "",
        still_img5_url: "",
        still_img6_url: "",
        still_img7_url: "",
        still_img8_url: "",
      });
  
    useEffect(() => {
      async function fetchData() {
        const id = params.id.toString();;
        /*const response = await fetch(`http://127.0.0.1:8000/epks/${params.id.toString()}/stills`);
           
    
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
    
        
        //setStills(record[0].stills); 
        //console.log(stills.length);
        //stillData.still_img1_url=record[0].still_img1_url
        
        http
        .get(`epk/${params.id.toString()}/stills`)
        .then((response) => {
          console.log("response");
          console.log(response);
          if (!(response.statusText) ==="OK") {
            console.log("error");
            const message = `An error has occurred: ${response.statusText}`;
            window.alert(message);
            return;
          }
      
          const record = response.data;
          console.log("still");
          console.log(record);
          if (!record) {
            window.alert(`epk Record with id ${id} not found`);
            navigate("/movies");
            return;
          }
          setStillData(record[0]); 
        //stillData.still_img1_url=record[0].still_img1_url
      
        
        }  ) 
            
      }
    
      fetchData();
    
      return;
    }, [params.id, navigate]);
  
     
  
    return ( 
        <>




        <div class = "container" > 

        {  stillData.still_img1_url || stillData.still_img2_url || stillData.still_img3_url||
         stillData.still_img4_url || stillData.still_img5_url || stillData.still_img6_url||
         stillData.still_img7_url || stillData.still_img8_url ?      
                <>  
              <div class="still-section-title "></div>   
              <div class ="still-container"   >
              <div id="images-wrapper">
                
                {stillData.still_img1_url? 
                    <img src={stillData.still_img1_url}  class="img-fluid"></img>:<></>}
                {stillData.still_img2_url? 
                    <img src={stillData.still_img2_url}  class="img-fluid"></img>:<></>}
                {stillData.still_img3_url? 
                    <img src={stillData.still_img3_url}  class="img-fluid"></img>:<></>}
                {stillData.still_img4_url?
                    <img src={stillData.still_img4_url}  class="img-fluid"></img>:<></>}
                {stillData.still_img5_url? 
                    <img src={stillData.still_img5_url}  class="img-fluid"></img>:<></>}
                {stillData.still_img6_url? 
                    <img src={stillData.still_img6_url}  class="img-fluid"></img>:<></>}
                {stillData.still_img7_url? 
                    <img src={stillData.still_img7_url}  class="img-fluid"></img>:<></>}
                {stillData.still_img8_url? 
                    <img src={stillData.still_img8_url}  class="img-fluid"></img>:<></>}
             </div>
           
             <div class="still-section-title "></div>    
            </div>
                   
                </>
                :<br/>}            
       </div>  
        </>
    )
  }

export default StillPreview
*/

import React, { useState } from "react";

import "./Stills.css";

function Stills(stillsFile) {
  console.log("stillfile:" + stillsFile);
  console.log("stillfile.stillfile:"+ stillsFile.stillsFile);
  return (
    <>

    <div class = "container" > 

    {  stillsFile.stillsFile.image1 || stillsFile.stillsFile.image2 || stillsFile.stillsFile.image3||
     stillsFile.stillsFile.image4 || stillsFile.stillsFile.image5|| stillsFile.stillsFile.image6||
     stillsFile.stillsFile.image7 || stillsFile.stillsFile.image8 ?      
            <>  
          <div class="still-section-title "></div>   
          <div class ="still-container"   >
          <div id="images-wrapper">
            
            {stillsFile.stillsFile.image1? 
                <img src={stillsFile.stillsFile.image1}  class="img-fluid"></img>:<></>}
            {stillsFile.stillsFile.image2? 
                <img src={stillsFile.stillsFile.image2}  class="img-fluid"></img>:<></>}
            {stillsFile.stillsFile.image3? 
                <img src={stillsFile.stillsFile.image3}  class="img-fluid"></img>:<></>}
            {stillsFile.stillsFile.image4?
                <img src={stillsFile.stillsFile.image4}  class="img-fluid"></img>:<></>}
            {stillsFile.stillsFile.image5? 
                <img src={stillsFile.stillsFile.image5}  class="img-fluid"></img>:<></>}
            {stillsFile.stillsFile.image6? 
                <img src={stillsFile.stillsFile.image6}  class="img-fluid"></img>:<></>}
            {stillsFile.stillsFile.image7? 
                <img src={stillsFile.stillsFile.image7}  class="img-fluid"></img>:<></>}
            {stillsFile.stillsFile.image8? 
                <img src={stillsFile.stillsFile.image8}  class="img-fluid"></img>:<></>}
         </div>
       
         <div class="still-section-title "></div>    
        </div>
               
            </>
            :<br/>}            
   </div>  
    </>
 );
}
export default Stills;













