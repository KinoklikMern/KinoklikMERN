import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import './Logline.css';
import http from "../../../http-common";

const LoglinePreview = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [loglineData, setLoglineData] = useState({
        log_lines: "",
        log_line_poster_urls: "",
      });
  
    useEffect(() => {
      async function fetchData() {
        const id = params.id.toString();
        http
        .get(`epk/${params.id.toString()}/loglines`)
        .then((response) => {
          if (!(response.statusText) ==="OK") {
            console.log("error");
            const message = `An error has occurred: ${response.statusText}`;
            window.alert(message);
            return;
          }
          const record = response.data;
          if (!record) {
            window.alert(`epk Record with id ${id} not found`);
            navigate("/movies");
            return;
          }
           setLoglineData(record[0]); 
        }  ) 
      }
      fetchData();
      return;
    }, [params.id, navigate]);
    return ( 
        <div class = "container" >  
          <h1 class="logline-section-title">Loglines</h1>      
            <div >
                {  loglineData.log_lines || loglineData.log_line_poster_urls ?      
                <>           
                    <div class ="logline-container"   >
                       <p></p>
                        <img src={loglineData.log_line_poster_urls}  class="img-fluid " />                      
                        <div  class = "logline-title">{loglineData.log_lines}</div>
                        <br/>
                    </div> 
                </>
                :<br/>}
            </div>
       </div>      
       
    )
  }

export default LoglinePreview








