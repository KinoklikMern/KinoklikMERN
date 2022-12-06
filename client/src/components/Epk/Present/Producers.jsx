import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import './Producers.css';
import http from "../../../http-common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faContactBook, faFolderPlus } from "@fortawesome/free-solid-svg-icons";

const ProducersPreview = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [producerData, setProducerData] = useState({
        producer_name: "",
        producer_header: "",
        producer_photo_url: "",
        producer_biography: "", 
      });
  
    useEffect(() => {
      async function fetchData() {
        const id = params.id.toString();
        http
        .get(`epk/${params.id.toString()}/producers`)
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
           setProducerData(record[0]); 
        }  ) 
      }
    
      fetchData();
    
      return;
    }, [params.id, navigate]);
  
    return ( 
    
        <div class = "container" >
          <div className="row" style={{background: "#1F0439"}}>
            <div className="col-sm m-4">
                    <h1 className="text-center mt-5">PRODUCER</h1>
                    <div style={{margin: 0, position: 'relative', top: '5%'}}>
                      <h3 className= "text-center" style={{color:'#4F2C73', fontWeight: 'bold'}}>
                      {producerData.producer_header}
                      </h3>
                      <br/>
                      <h2 className= "text-center" style={{color:'#4F2C73', fontWeight: 'bold'}}>
                      {producerData.producer_name}
                      </h2>
                      <h2 className="text-center mx-4">          
                      {producerData.producer_biography}
                      </h2>
                      <FontAwesomeIcon className="mediaIcon" icon={faContactBook} />
                    </div>
              </div>
              <div className="col-sm m-4">
                    <img 
                        src={producerData.producer_photo_url}  alt="Image"
                        style={{width: "100%"}}
                    ></img>
              </div>
          </div>
            
          {/* <h1 class="producer-section-title">Producers</h1>      
            <div >
                {  producerData.producer_name || producerData.producer_header || producerData.producer_photo_url || 
                producerData.producer_biography ?      
                <>           
                  
                    <div class ="producer-container"   >
                       <p></p>
                        <img src={producerData.producer_photo_url}  class="img-fluid " />                      
                        <div  class = "producer-header">{producerData.producer_header}</div>
                        <div  class = "producer-name">{producerData.producer_name}</div>
                        <div class = "producer-description">{producerData.producer_biography}</div>    
                        <br/>
                    </div> 
                </>
                :<br/>}
            </div> */}
          {/* </div>    */}
       </div>      
       
    )
  }


export default ProducersPreview








