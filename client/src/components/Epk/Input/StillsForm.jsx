import React, { useState, useRef, useEffect  } from "react";
import http from "../../../http-common";
import { useParams, useNavigate } from "react-router";

function StillsForm() {
 
  const [file1, setFile1] = useState("");
  const [file2, setFile2] = useState("");
  const [file3, setFile3] = useState("");
  const [file4, setFile4] = useState("");
  const [file5, setFile5] = useState("");
  const [file6, setFile6] = useState("");
  const [file7, setFile7] = useState("");
  const [file8, setFile8] = useState("");
  const inputFile1Ref = useRef(null);
  const inputFile2Ref = useRef(null);
  const inputFile3Ref = useRef(null);
  const inputFile4Ref = useRef(null);
  const inputFile5Ref = useRef(null);
  const inputFile6Ref = useRef(null);
  const inputFile7Ref = useRef(null);
  const inputFile8Ref = useRef(null);
  const [message, setMessage] = useState("");

  const file1Selected = (event) => {
    const file = event.target.files[0];
    setFile1(file);
  };

  const file2Selected = (event) => {
    const file = event.target.files[0];
    setFile2(file);
  };

  const file3Selected = (event) => {
    const file = event.target.files[0];
    setFile2(file);
  };

  const file4Selected = (event) => {
    const file = event.target.files[0];
    setFile2(file);
  };

  const file5Selected = (event) => {
    const file = event.target.files[0];
    setFile2(file);
  };

  const file6Selected = (event) => {
    const file = event.target.files[0];
    setFile2(file);
  };

  const file7Selected = (event) => {
    const file = event.target.files[0];
    setFile2(file);
  };

  const file8Selected = (event) => {
    const file = event.target.files[0];
    setFile2(file);
  };

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

  const saveStill = (e) => {
    debugger;
    e.preventDefault();
    let formData = new FormData();
    console.log(file1);
    console.log(file2);
    console.log(file3);
    console.log(file4);
    console.log(file5);
    console.log(file6);
    console.log(file7);
    console.log(file8);

    formData.append("file1", file1);
    formData.append("file2", file2);
    formData.append("file3", file2);
    formData.append("file4", file2);
    formData.append("file5", file2);
    formData.append("file6", file2);
    formData.append("file7", file2);
    formData.append("file8", file2);



    console.log(formData);
    debugger;
    if (checkFileMimeType(file1) && checkFileMimeType(file2) && checkFileMimeType(file3) && checkFileMimeType(file4) &&
    checkFileMimeType(file5) && checkFileMimeType(file6) && checkFileMimeType(file7) && checkFileMimeType(file8)) {
      http
        .post("epks/uploadStills", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.file1 !== undefined) {
            stillData.img1_url = response.data.file1;
          }
          if (response.data.file2 !== undefined) {           
            stillData.img2_url = response.data.file2;
          }
          if (response.data.file3 !== undefined) {           
            stillData.img3_url = response.data.file3;
          }
          if (response.data.file4 !== undefined) {           
            stillData.img4_url = response.data.file4;
          }
          if (response.data.file5 !== undefined) {           
            stillData.img5_url = response.data.file5;
          }
          if (response.data.file6 !== undefined) {           
            stillData.img6_url = response.data.file6;
          }
          if (response.data.file7 !== undefined) {           
            stillData.img7_url = response.data.file7;
          }
          if (response.data.file8 !== undefined) {           
            stillData.img8_url = response.data.file8;
          }
          http
            .put(`epks/${params.id.toString()}}/stills`, stillData)
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
    }
  };

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
      stillData.still_img1_url=record[0].still_img1_url
      stillData.still_img2_url=record[0].still_img2_url
      stillData.still_img3_url=record[0].still_img3_url
      stillData.still_img4_url=record[0].still_img4_url
      stillData.still_img5_url=record[0].still_img5_url
      stillData.still_img6_url=record[0].still_img6_url
      stillData.still_img7_url=record[0].still_img7_url
      stillData.still_img8_url=record[0].still_img8_url
      */
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
      /*stillData.still_img1_url=record[0].still_img1_url
      stillData.still_img2_url=record[0].still_img2_url
      stillData.still_img3_url=record[0].still_img3_url
      stillData.still_img4_url=record[0].still_img4_url
      stillData.still_img5_url=record[0].still_img5_url
      stillData.still_img6_url=record[0].still_img6_url
      stillData.still_img7_url=record[0].still_img7_url
      stillData.still_img8_url=record[0].still_img8_url*/
      console.log("still record");
      console.log(record[0].still_img1_url);
      console.log(stillData.still_img1_url);
      }  ) 
         
    }
  
    fetchData();
  
    return;
  }, [params.id, navigate]);

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
        <h5 class="card-title">Stills</h5>
        <form className="row g-3">      
      
              <div className="col-3">
                
                <input
                  className="form-control form-control-sm"
                  filename={file1}
                  onChange={file1Selected}
                  ref={inputFile1Ref}
                  type="file"
                  id="fileBanner"
                  name="files"
                  accept="image/*"
                ></input>
                 {stillData.still_img1_url? 
                    <img src={stillData.still_img1_url}  class="img-fluid"></img>:<></>}
              </div>
              <div className="col-3">
              
                <input
                  className="form-control form-control-sm"
                  filename={file2}
                  onChange={file2Selected}
                  ref={inputFile2Ref}
                  type="file"
                  id="fileBanner"
                  name="files"
                  accept="image/*"
                ></input>
                 {stillData.still_img2_url? 
                    <img src={stillData.still_img2_url}  class="img-fluid"></img>:<></>}
              </div>
              <div className="col-3">
               
                <input
                  className="form-control form-control-sm"
                  filename={file3}
                  onChange={file3Selected}
                  ref={inputFile3Ref}
                  type="file"
                  id="fileBanner"
                  name="files"
                  accept="image/*"
                ></input>
                 {stillData.still_img3_url? 
                    <img src={stillData.still_img3_url}  class="img-fluid"></img>:<></>}
              </div>
              <div className="col-3">
                
                <input
                  className="form-control form-control-sm"
                  filename={file4}
                  onChange={file4Selected}
                  ref={inputFile4Ref}
                  type="file"
                  id="fileBanner"
                  name="files"
                  accept="image/*"
                ></input>
                 {stillData.still_img4_url? 
                    <img src={stillData.still_img4_url}  class="img-fluid"></img>:<></>}
              </div>
              <div className="col-3">
              
                <input
                  className="form-control form-control-sm"
                  filename={file5}
                  onChange={file5Selected}
                  ref={inputFile5Ref}
                  type="file"
                  id="fileBanner"
                  name="files"
                  accept="image/*"
                ></input>
                 {stillData.still_img5_url? 
                    <img src={stillData.still_img5_url}  class="img-fluid"></img>:<></>}
              </div>
              <div className="col-3">
               
                <input
                  className="form-control form-control-sm"
                  filename={file6}
                  onChange={file6Selected}
                  ref={inputFile6Ref}
                  type="file"
                  id="fileBanner"
                  name="files"
                  accept="image/*"
                ></input>
                 {stillData.still_img6_url? 
                    <img src={stillData.still_img6_url}  class="img-fluid"></img>:<></>}
              </div>
              <div className="col-3">
            
                <input
                  className="form-control form-control-sm"
                  filename={file7}
                  onChange={file7Selected}
                  ref={inputFile7Ref}
                  type="file"
                  id="fileBanner"
                  name="files"
                  accept="image/*"
                ></input>
                 {stillData.still_img7_url? 
                    <img src={stillData.still_img7_url}  class="img-fluid"></img>:<></>}
              </div>
              <div className="col-3">
             
                <input
                  className="form-control form-control-sm"
                  filename={file8}
                  onChange={file8Selected}
                  ref={inputFile8Ref}
                  type="file"
                  id="fileBanner"
                  name="files"
                  accept="image/*"
                ></input>
                 {stillData.still_img8_url? 
                    <img src={stillData.still_img8_url}  class="img-fluid"></img>:<></>}
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
  </form>
)
}

export default StillsForm;