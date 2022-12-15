/*import React, { useState, useRef, useEffect  } from "react";
import http from "../../../http-common";
import { useParams, useNavigate } from "react-router";
import UploadFile from "../../FileUpload";
import toast, { Toaster } from 'react-hot-toast';

function StillsForm() {
 
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [image5, setImage5] = useState("");
  const [image6, setImage6] = useState("");
  const [image7, setImage7] = useState("");
  const [image8, setImage8] = useState("");
  
  //const [message, setMessage] = useState("");

  

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

  const params = useParams();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStillData({ ...stillData, [name]: value });
  };
  const handleClearImage1 = () => {    setImage1(""); stillData.still_img1_url=image1; };
 
  const handleClearImage2 = () => {
    setImage2("");
    stillData.still_img2_url=image2; 
  };
  
  const handleClearImage3 = () => {    
    setImage3(""); 
    stillData.still_img3_url="";  
  };
  const handleClearImage4 = () => {    
    setImage4(""); 
    stillData.still_img4_url=""; 
  };
  const handleClearImage5 = () => {    
    setImage5(""); 
    stillData.still_img5_url=""; 
  };
  const handleClearImage6 = () => {    
    setImage6(""); 
    stillData.still_img6_url=""; };
  const handleClearImage7 = () => {    
    setImage7(""); 
    stillData.still_img7_url=""; 
  };
  const handleClearImage8 = () => { 
    setImage8("");  
    stillData.still_img8_url="";  
};


  const saveStill = (e) => {
    //debugger;
    e.preventDefault();
    let formData = new FormData();
  

   
    http
    .put(`epk/${params.id.toString()}/stills`, stillData)
    .then((res) => {
      console.log("saved");
      toast.success('Successfully saveed.')
    })
    .catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();

      http
      .get(`epk/${params.id.toString()}/stills`)
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
        //console.log("still form");
        //console.log(record);
        if (!record) {
          window.alert(`epk Record with id ${id} not found`);
          navigate("/movies");
          return;
        }
        setStillData(record[0]); 
        setImage1( record[0].still_img1_url);
        setImage2( record[0].still_img2_url);
        setImage3( record[0].still_img3_url);
        setImage4( record[0].still_img4_url);
        setImage5( record[0].still_img5_url);
        setImage6( record[0].still_img6_url);
        setImage7( record[0].still_img7_url);
        setImage8( record[0].still_img8_url);
        console.log("image1+imag2");
        console.log(image1);
        console.log(image2);
      }  ) 
         
    }
  
    fetchData();
  
    return;
  }, [params.id, navigate]);

  return (
   
     <>
       <div><Toaster/></div>
    <div class="card">
      <div class="card-header">
        <div class="row align-items-start">
          <div class="col align-items-start">EPK Page Upload</div>
          <div class="col align-items-center">View EPK Page</div>
        </div>
      </div>

      <div class="card-body">
        <h5 class="card-title">Stills</h5>
        <h5 class=" text-center text-wrap  bg-white"  >Upload film stills here</h5>
       
        <form className="row ">      
      
              <div className="col-3">                
                <UploadFile setImage={setImage1} />
            
                  {image1 && (
                    <img
                      src={image1}
                      alt="hey"
                      style={{ height: "350px" }}
                      class="img-fluid "
                    /> )}
                 <br/>
                 { image1?     
                 <button  type="button" onClick={handleClearImage1} className="btn btn-link" >
                  Clear Image
                </button>  
                :<br/>}  
                    <br/>
              </div>

              <div className="col-3">              
               <UploadFile setImage={setImage2} />
                {image2 && (
                  <img
                    src={image2}
                    alt="hey"
                    style={{ height: "350px" }}
                    class="img-fluid "
                  /> )}
                    <br/>
                 { image2?     
                 <button  type="button" onClick={handleClearImage2} className="btn btn-link" >
                  Clear Image
                </button>  
                :<br/>}  
                    <br/>
              </div>

              <div className="col-3">
               
              <UploadFile setImage={setImage3} />
                {image3 && (
                  <img
                    src={image3}
                    alt="hey"
                    style={{ height: "350px" }}
                    class="img-fluid "
                  /> )}
                     <br/>
                 { image3?     
                 <button  type="button" onClick={handleClearImage3} className="btn btn-link" >
                  Clear Image
                </button>  
                :<br/>} 
                    <br/>
              </div>


              <div className="col-3">
              <UploadFile setImage={setImage4} />
                {image4 && (
                  <img
                    src={image4}
                    alt="hey"
                    style={{ height: "350px" }}
                    class="img-fluid "
                  /> )}
                     <br/>
                 { image4?     
                 <button  type="button" onClick={handleClearImage4} className="btn btn-link" >
                  Clear Image
                </button>  
                :<br/>} 
                    <br/>
              </div>


              <div className="col-3">
              
              <UploadFile setImage={setImage5} />
                {image5 && (
                  <img
                    src={image5}
                    alt="hey"
                    style={{ height: "350px" }}
                    class="img-fluid "
                  /> )}
                     <br/>
                 { image5?     
                 <button  type="button" onClick={handleClearImage5} className="btn btn-link" >
                  Clear Image
                </button>  
                :<br/>} 
                    <br/>
              </div>

              <div className="col-3">
              <UploadFile setImage={setImage6} />
                {image6 && (
                  <img
                    src={image6}
                    alt="hey"
                    style={{ height: "350px" }}
                    class="img-fluid "
                  /> )}
                     <br/>
                 { image6?     
                 <button  type="button" onClick={handleClearImage6} className="btn btn-link" >
                  Clear Image
                </button>  
                :<br/>} 
                    <br/>
              </div>

              <div className="col-3">
              <UploadFile setImage={setImage7} />
                {image7 && (
                  <img
                    src={image7}
                    alt="hey"
                    style={{ height: "350px" }}
                    class="img-fluid "
                  /> )}
                     <br/>
                 { image7?     
                 <button  type="button" onClick={handleClearImage7} className="btn btn-link" >
                  Clear Image
                </button>  
                :<br/>} 
                    <br/>
              </div>

              <div className="col-3">
              <UploadFile setImage={setImage8} />
                {image8 && (
                  <img
                    src={image8}
                    alt="hey"
                    style={{ height: "350px" }}
                    class="img-fluid "
                  /> )}
                     <br/>
                 { image8?     
                 <button  type="button" onClick={handleClearImage8} className="btn btn-link" >
                  Clear Image
                </button>  
                :<br/>} 
                <br/>
              </div>

              
                
            
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-secondary"
              onClick={saveStill}
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

export default StillsForm;
*/



import React, { useState, useEffect } from "react";
//import UploadImage from "../../upload";
import UploadFile from "../../FileUpload";
import { Button, Form, Input, Col, Upload, Row } from "antd";
import toast, { Toaster } from 'react-hot-toast';

const StillsForm = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [image5, setImage5] = useState(null);
  const [image6, setImage6] = useState(null);
  const [image7, setImage7] = useState(null);
  const [image8, setImage8] = useState(null);

  const [stillsList, setStillsList] = useState(null);
  const epkID = 4;

  const submit = () => {
  
    const stillsList1 = {
       epk: epkID, image:image1 ,image:image2,image:image3,image:image4,image:image5,image:image6,image:image7,image:image8
 
  };
    
    createEpkStills(stillsList1);

    async function createEpkStills(stillsList1) {
      const response = await fetch("http://localhost:8000/epk/EpkStills", {
        method: "POST",
        body: JSON.stringify({
          stillsList: stillsList1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const stillsList = await response.json();

      setStillsList(stillsList);
      // localStorage.setItem("epk", 1);
      toast.success('Successfully saveed.')
      window.location = "/epk";

      /*  console.log(shortSynopsis);
      console.log(mediumSynopsis);
      console.log(longSynopsis);*/
    }
  };
  

 
  return (
   
    <>
    <div><Toaster/></div>
 <div class="card">
   <div class="card-header">
     <div class="row align-items-start">
       <div class="col align-items-start">EPK Page Upload</div>
       <div class="col align-items-center">View EPK Page</div>
     </div>
   </div>

   <div class="card-body">
     <h5 class="card-title">Stills</h5>
     <h5 class=" text-center text-wrap  bg-white"  >Upload film stills here</h5>
    
     <form className="row ">      
   
           <div className="col-3">                
             <UploadFile setImage={setImage1} />
         
               {image1 && (
                 <img
                   src={image1}
                   alt="hey"
                   style={{ height: "350px" }}
                   class="img-fluid "
                 /> )}
              <br/>
              
                
           </div>

           <div className="col-3">              
            <UploadFile setImage={setImage2} />
             {image2 && (
               <img
                 src={image2}
                 alt="hey"
                 style={{ height: "350px" }}
                 class="img-fluid "
               /> )}
                 <br/>

           </div>

           <div className="col-3">
            
           <UploadFile setImage={setImage3} />
             {image3 && (
               <img
                 src={image3}
                 alt="hey"
                 style={{ height: "350px" }}
                 class="img-fluid "
               /> )}
                  <br/>
             
           </div>


           <div className="col-3">
           <UploadFile setImage={setImage4} />
             {image4 && (
               <img
                 src={image4}
                 alt="hey"
                 style={{ height: "350px" }}
                 class="img-fluid "
               /> )}
                  <br/>
             
           </div>


           <div className="col-3">
           
           <UploadFile setImage={setImage5} />
             {image5 && (
               <img
                 src={image5}
                 alt="hey"
                 style={{ height: "350px" }}
                 class="img-fluid "
               /> )}
                  <br/>
             
           </div>

           <div className="col-3">
           <UploadFile setImage={setImage6} />
             {image6 && (
               <img
                 src={image6}
                 alt="hey"
                 style={{ height: "350px" }}
                 class="img-fluid "
               /> )}
                  <br/>
             
           </div>

           <div className="col-3">
           <UploadFile setImage={setImage7} />
             {image7 && (
               <img
                 src={image7}
                 alt="hey"
                 style={{ height: "350px" }}
                 class="img-fluid "
               /> )}
                  <br/>
             
           </div>

           <div className="col-3">
           <UploadFile setImage={setImage8} />
             {image8 && (
               <img
                 src={image8}
                 alt="hey"
                 style={{ height: "350px" }}
                 class="img-fluid "
               /> )}
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
export default StillsForm;
