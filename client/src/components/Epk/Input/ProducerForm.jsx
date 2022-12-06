import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import UploadFile from "../../FileUpload";

import http from "../../../http-common";


function ProducerForm() {
  const [image1, setImage1] = useState("");
  const [message, setMessage] = useState("");

  const params = useParams();
  const navigate = useNavigate();

   const [producerData, setProducerData] = useState({
    producer_name: "",
    producer_header: "",
    producer_photo_url: "",
    producer_biography: "", 
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProducerData({ ...producerData, [name]: value });
  };

  const checkFileMimeType = (file) => {
    if (file !== "") {
      if (  
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg"
      )
        return true;
      else return false;
    } else return true;
  };


  
  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();;
      http
      .get(`epk/${params.id.toString()}/producers`)
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
        console.log("record");
        console.log(record);
        if (!record) {
          window.alert(`epk Record with id ${id} not found`);
          navigate("/movies");
          return;
        }

         setProducerData(record[0]); 
         console.log("image1");
         console.log(producerData.producer_name);
         console.log(producerData.producer_photo_url);
         setImage1( record[0].producer_photo_url);
        console.log("image1");
        console.log(image1);
      }  )       
    }
  
    fetchData();
  
    return;
  }, [params.id, navigate]);



  const saveProducer = (e) => {
    e.preventDefault();
    let formData = new FormData();

    console.log(formData);
    
    console.log("before");
    console.log(producerData.producer_photo_url);
    producerData.producer_photo_url=image1;
    http 
            .put(`epk/${params.id.toString()}/producers`, producerData)
      
            .then((res) => {
              console.log("saved");
            })
            .catch((err) => {
              console.log(err);
            });
            console.log("after");
            
            console.log(producerData.producer_photo_url);
            
  };

  return (
    <form className="form">
    <div class="card">
      <div class="card-header">
        <div class="row align-items-start">
          <div class="col align-items-start">EPK Page Upload</div>
          <div class="col align-items-end">link to view</div>
        </div>
      </div>

      <div class="card-body">
        <h5 class="card-title">Producers</h5>
        <form className="row g-3">      
              <div className="col-6">
              <input
                    type="text"
                    placeholder = "Name"
                    className="form-control"        
                    value={producerData.producer_name}
                    onChange={handleInputChange}
                    name="producer_name"                         
                    />   
              <br/> 
              <input
                    type="text"
                    placeholder = "Header"
                    className="form-control"        
                    value={producerData.producer_header}
                    onChange={handleInputChange}
                    name="producer_header"                          
                    />   
              <br/> 

               <textarea 
                    class="form-control" 
                    rows="3"
                    placeholder = "Biography"
                    value={producerData.producer_biography}
                 
                    onChange={handleInputChange}
                    name="producer_biography"  
                    />  
              
               <br/>   
               <UploadFile setImage={setImage1} />
                {image1 && (
                  <img
                    src={image1}
                    alt="hey"
                    style={{ height: "350px", width: "300px" }}
                    class="img-fluid "
                  />
                )}
              </div>
            
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-secondary"
              onClick={saveProducer}
            >
              {" "}
              Save{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  </form>
)
}

export default ProducerForm;