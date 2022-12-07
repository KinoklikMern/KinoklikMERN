import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import UploadFile from "../../FileUpload";

import http from "../../../http-common";
import toast, { Toaster } from 'react-hot-toast';


function UniqueForm() {
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
 
  //const [message, setMessage] = useState("");

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
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUniqueData({ ...uniqueData, [name]: value });
  };




  
  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();;
      //const response = await fetch(`http://127.0.0.1:8000/epk/${params.id.toString()}/uniques`);
      http
      .get(`epks/${params.id.toString()}/uniques`)
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
        //console.log("record");
        //console.log(record);
        if (!record) {
          window.alert(`epk Record with id ${id} not found`);
          navigate("/movies");
          return;
        }

     
       
         setUniqueData(record[0]);       
         setImage1( record[0].unique1_poster_url);
         setImage2( record[0].unique2_poster_url);    
      }  )         
      //}
  
    }
  
    fetchData();
  
    return;
  }, [params.id, navigate]);



  const saveUnique = (e) => {

    e.preventDefault();
    let formData = new FormData();
   
    //console.log("before");
    //console.log(uniqueData.unique1_poster_url);
    uniqueData.unique1_poster_url=image1;
    uniqueData.unique2_poster_url=image2;
    http 
            .put(`epks/${params.id.toString()}/uniques`, uniqueData)
      
            .then((res) => {
              //console.log("saved");
              toast.success('Successfully saveed.')
            })
            .catch((err) => {
              console.log(err);
            });
            //console.log("after");            
            //console.log(uniqueData.unique1_poster_url);
            
  };

  return (
   
     <>
     <div><Toaster/></div>
    <div class="card">
      <div class="card-header">
        <div class="row align-items-start">
          <div class="col align-items-start">EPK Page Upload</div>
          <div class="col align-items-center">View EPK Page</div>
          <div class="col align-items-end"> 
               Tell the world what makes your film and production so special. This is where you sell the world(and the media) your film.Is your film inspired by a true story? Is it based on a criminal court case? Does it feature a real haunted house or a celebrity cameo?
          </div>

          </div>
      </div>

      <div class="card-body">
        <h5 class="card-title">Uniqueness</h5>
        <form className="row ">      
      
              <div className="col-6">
              <input
                    type="text"
                    placeholder = "Title"
                    className="form-control"        
                    value={uniqueData.unique1_title}
                    onChange={handleInputChange}
                    name="unique1_title"                         
                    />   
              <br/> 

               <textarea 
                    class="form-control" 
                    rows="3"
                    placeholder = "Description"
                    value={uniqueData.unique1_description}
                 
                    onChange={handleInputChange}
                    name="unique1_description"  
                    />  
              
               <br/>   
               <UploadFile setImage={setImage1} />
                {image1 && (
                  <img
                    src={image1}
                    alt="hey"
                    style={{ height: "350px" }}
                    class="img-fluid "
                  />
                )}
              </div>
              <div className="col-6">
              <input
                    type="text"
                    placeholder = "Title"
                    className="form-control"        
                    value={uniqueData.unique2_title}
                    onChange={handleInputChange}
                    name="unique2_title"                         
                    />   
              <br/> 

               <textarea 
                    class="form-control" 
                    rows="3"
                    placeholder = "Description"
                    value={uniqueData.unique2_description}
                 
                    onChange={handleInputChange}
                    name="unique2_description"  
                    />  
              
               <br/> 
               <UploadFile setImage={setImage2} />
              {image2 && (
                <img
                  src={image2}
                  alt="hey"
                  style={{ height: "350px" }}
                  class="img-fluid "
                />
              )}
                 
              </div>
             
            
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-secondary"
              onClick={saveUnique}
            >
              {" "}
              Save{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
 
    </> 
)
}

export default UniqueForm;