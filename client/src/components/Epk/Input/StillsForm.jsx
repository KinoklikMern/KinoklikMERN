import React, { useState, useRef, useEffect  } from "react";
import http from "../../../http-common";
import { useParams, useNavigate } from "react-router";
import UploadFile from "../../FileUpload";

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


  const saveStill = (e) => {
    //debugger;
    e.preventDefault();
    let formData = new FormData();
  

    stillData.still_img1_url=image1;
    stillData.still_img2_url=image2;
    stillData.still_img3_url=image3;
    stillData.still_img4_url=image4;
    stillData.still_img5_url=image5;
    stillData.still_img6_url=image6;
    stillData.still_img7_url=image7;
    stillData.still_img8_url=image8;
    http
    .put(`epks/${params.id.toString()}/stills`, stillData)
    .then((res) => {
      console.log("saved");
    })
    .catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();

      http
      .get(`epks/${params.id.toString()}/stills`)
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
   
     
    <div class="card">
      <div class="card-header">
        <div class="row align-items-start">
          <div class="col align-items-start">EPK Page Upload</div>
          <div class="col align-items-end">link to view</div>
        </div>
      </div>

      <div class="card-body">
        <h5 class="card-title">Stills</h5>
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
  
)
}

export default StillsForm;