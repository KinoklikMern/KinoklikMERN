import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import UploadFile from "../../FileUpload";

import http from "../../../http-common";


function UniqueForm() {
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");


  //const [file1, setFile1] = useState("");
  //const [file2, setFile2] = useState("");
  
  //const inputFile1Ref = useRef(null);
  //const inputFile2Ref = useRef(null);
 
  const [message, setMessage] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  /*const file1Selected = (event) => {
    const file = event.target.files[0];
    setFile1(file);
  };

  const file2Selected = (event) => {
    const file = event.target.files[0];
    setFile2(file);
  };*/

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
        console.log("record");
        console.log(record);
        if (!record) {
          window.alert(`epk Record with id ${id} not found`);
          navigate("/movies");
          return;
        }

     
         //console.log("before set");
         //console.log(uniqueData);
         setUniqueData(record[0]); 
         console.log("image1+imag2");
         console.log(uniqueData.unique1_poster_url);
         console.log(uniqueData.unique2_poster_url);
         setImage1( record[0].unique1_poster_url);
         setImage2( record[0].unique2_poster_url);
        console.log("image1+imag2");
        console.log(image1);
        console.log(image2);
        
     
        /*uniqueData.unique1_title=record[0].unique1_title
        uniqueData.unique2_title=record[0].unique2_title
        uniqueData.unique1_description=record[0].unique1_description
        uniqueData.unique2_description=record[0].unique2_description
        uniqueData.unique1_poster_url=ecord[0].unique1_poster_urlr
        uniqueData.unique2_poster_url=record[0].unique2_poster_url*/
        //console.log("after set");
        //console.log(uniqueData);
      }  ) 


  
    
  
  
        
      //}
  
    }
  
    fetchData();
  
    return;
  }, [params.id, navigate]);



  const saveUnique = (e) => {
    //;
    e.preventDefault();
    let formData = new FormData();
    //console.log(file1);
    //console.log(file2);

    //formData.append("file1", file1);
    //formData.append("file2", file2);



    console.log(formData);
    //debugger;
    /*if (checkFileMimeType(file1) && checkFileMimeType(file2)) {
      http
        .post("epks/uploadFiles", formData, {
      
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.file1 !== undefined) {
            uniqueData.unique1_poster_url = response.data.file1;
          }
          if (response.data.file2 !== undefined) {           
            uniqueData.unique2_poster_url = response.data.file1;
          }
      
          http
            .put(`epks/${params.id.toString()}}/uniques`, uniqueData)
      
            .then((res) => {
              console.log("saved");
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log();
          console.log(err);
        });
    } else {
      setMessage("File must be a image(jpeg or png)");
    }*/
    console.log("before");
    console.log(uniqueData.unique1_poster_url);
    uniqueData.unique1_poster_url=image1;
    uniqueData.unique2_poster_url=image2;
    http 
            .put(`epks/${params.id.toString()}/uniques`, uniqueData)
      
            .then((res) => {
              console.log("saved");
            })
            .catch((err) => {
              console.log(err);
            });

           
           
            console.log("after");
            
            console.log(uniqueData.unique1_poster_url);
            
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
        <h5 class="card-title">Uniqueness</h5>
        <form className="row g-3">      
      
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
                    style={{ height: "350px", width: "300px" }}
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
                  style={{ height: "350px", width: "300px" }}
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
  </form>
)
}

export default UniqueForm;