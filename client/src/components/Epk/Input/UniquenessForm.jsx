/*import React, { useState, useRef, useEffect } from "react";
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

  const handleClearImage1 = () => {
    setImage1("");
    uniqueData.unique1_poster_url=image1;
  };
  const handleClearImage2 = () => {
    setImage2("");
    uniqueData.unique2_poster_url=image2;
  };
  

 




  
  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();;
      //const response = await fetch(`http://127.0.0.1:8000/epk/${params.id.toString()}/uniques`);
      http
      .get(`epk/${params.id.toString()}/uniques`)
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

  //add for clear
  const handleClear = () => {     
    setImage1("");
  };

  const saveUnique = (e) => {

    e.preventDefault();
    let formData = new FormData();
   
    //console.log("before");
    //console.log(uniqueData.unique1_poster_url);
    uniqueData.unique1_poster_url=image1;
    uniqueData.unique2_poster_url=image2;
    http 
            .put(`epk/${params.id.toString()}/uniques`, uniqueData)
      
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
                 <br/>
                 { image1?      
                
                 <button  type="button" onClick={handleClearImage1} className="btn btn-link" >
                  Clear Image
                </button>  
                :<br/>}              
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
              <br/>
              { image2?      
                
                <button  type="button" onClick={handleClearImage2} className="btn btn-link" >
                 Clear Image
               </button>  
               :<br/>}  
             
                
                 
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
*/


import React, { useState, useEffect } from "react";
//import UploadImage from "../../upload";
import UploadFile from "../../FileUpload";
import { Button, Form, Input, Col, Upload, Row } from "antd";
import toast, { Toaster } from 'react-hot-toast';

const UniquenessForm = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  
  const [title1, setTitle1] = useState(null);
  const [title2, setTitle2] = useState(null);

  const [description1, setDescription1] = useState(null);
  const [description2, setDescription2] = useState(null);

  const [uniquenessList, setUniquenessList] = useState(null);
  const epkID = 4;

  const submit = () => {
  
    const uniqueness = {
       epk: epkID, text:title1,  text: description1,image:image1 , text:title2,  text: description2,image:image2
    
    };
   
    
    createEpkUniqueness(uniqueness);

    async function createEpkUniqueness(uniqueness) {
      const response = await fetch("http://localhost:8000/epk/EpkUniqueness", {
        method: "POST",
        body: JSON.stringify({
          uniquenessList: uniqueness,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const uniquenessList = await response.json();

      setUniquenessList(uniquenessList);
      // localStorage.setItem("epk", 1);
      toast.success('Successfully saveed.')
      window.location = "/epk";

      /*  console.log(shortSynopsis);
      console.log(mediumSynopsis);
      console.log(longSynopsis);*/
    }
  };
  const handleTitle1 = (event) => {
    setTitle1(event.target.value);   
  };
  const handleTitle2 = (event) => {
    setDescription2(event.target.value);   
  };
  const handleDescription1 = (event) => {
    setTitle1(event.target.value);   
  };
  const handleDescription2 = (event) => {
    setDescription2(event.target.value);   
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
                  
                   onChange={handleTitle1}
                   name="unique1_title"                         
                   />   
             <br/> 

              <textarea 
                   class="form-control" 
                   rows="3"
                   placeholder = "Description"
                 
                
                   onChange={handleDescription1}
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
                 
                   onChange={handleTitle2}
                   name="unique2_title"                         
                   />   
             <br/> 

              <textarea 
                   class="form-control" 
                   rows="3"
                   placeholder = "Description"
                   
                
                   onChange={handleDescription2}
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
             <br/>
             
            
               
                
             </div>
            
           
             <Row justify="space-around" className="text-center ">
        <div
          style={{
            height: "50px",
            width: "120px",
          }}
        >
          <Button type="primary" block onClick={submit} value="save">
            save
          </Button>
        </div>
      </Row>
       </form>
     </div>
   </div>

   </> 
  );
};
export default UniquenessForm;

