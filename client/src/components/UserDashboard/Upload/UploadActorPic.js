import React, {useState, useRef, useEffect} from "react";
import "./UploadActorPic.css";
import http from "../../../http-common";
import instagramIcon from "../../../images/icons/002-instagram.svg";
import twiiterIcon from "../../../images/icons/005-twitter.svg";
import facebookIcon from "../../../images/icons/004-facebook-app-logo.svg";

export default function UploadActorPic({user}) {
    const [file1, setFile1] = useState("");
    const [file2, setFile2] = useState("");
    const [file3, setFile3] = useState("");
    const [file4, setFile4] = useState("");
    const [fileBanner, setFileBanner] = useState("");
    const inputFile1Ref = useRef(null);
    const inputFile2Ref = useRef(null);
    const inputFile3Ref = useRef(null);
    const inputFile4Ref = useRef(null);
    const inputFileBannerRef = useRef(null);
    const [actor, setActor] = useState([]);
    const [profs, setProfs] = useState([]);
    const [message, setMessage] = useState("");
    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    let i1 = ""
    let i2 = ""
    let i3 = ""
   
    const file1Selected = (event) => {
        const file = event.target.files[0];
        setFile1(file);
      };
    
      const file2Selected = (event) => {
        const file = event.target.files[0];
        setFile2(file);
        console.log("File2 Onchange: " + file2);
      };
      const file3Selected = (event) => {
        const file = event.target.files[0];
        setFile3(file);
      };
      const file4Selected = (event) => {
        const file = event.target.files[0];
        setFile4(file);
      };
      const fileBannerSelected = (event) => {
        const file = event.target.files[0];
        setFileBanner(file);
      };

      useEffect(() => {
        http.get(`users/getactor/${user.id}`).then((response) => {
          setActor(response.data);
          setProfs(response.data.profiles);
        });
      }, []);

      const [actorData, setActorData] = useState({
        bannerImg : actor.bannerImg,
        picture: actor.picture,
        profiles: actor.profiles
      });

      const checkFileMimeType = (file) => {
        if (file !== "") {
          if (
            file.type === "video/mp4" ||
            file.type === "video/mpeg" ||
            file.type === "video/quicktime" ||
            file.type === "video/x-ms-wmv" ||
            file.type === "video/ogg" ||
            file.type === "video/3gpp" ||
            file.type === "	video/x-msvideo" ||
            file.type === "image/png" ||
            file.type === "image/jpg" ||
            file.type === "image/jpeg"
          )
            return true;
          else return false;
        } else return true;
      };

      const saveEpkCover = async (e) => {
        
        e.preventDefault();
        let formDataBanner = new FormData();
        formDataBanner.append("fileBanner", fileBanner);
        let formTest = new FormData();
        formTest.append("file", file1);
        let formData2 = new FormData();
        let formData3 = new FormData();
        let formData4 = new FormData();

        formData2.append("file", file2);
    
        formData3.append("file", file3);
        formData4.append("file", file4);


        if ((!file1 || checkFileMimeType(file1)) && 
        (!file2 || checkFileMimeType(file2)) &&
        (!file3 || checkFileMimeType(file3)) &&
        (!file4 || checkFileMimeType(file4)) &&
        (!fileBanner || checkFileMimeType(fileBanner)) 
        ) {
          if(fileBanner){
            await http
            .post("users/actorbanner", formDataBanner, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response)=>{
              if (response.data.fileBanner !== undefined) {
                actorData.bannerImg = response.data.fileBanner;
              }
            })
          }
          if(file1){
          await http
            .post("users/actorbanner", formTest, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              if (response.data.key !== undefined) {
                actorData.picture = response.data.key;
              }
        })}
        if(file2){
          await http
            .post("users/actorbanner", formData2, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              if (response.data.key !== undefined) {
                console.log(response.data.key);
                setImage1(response.data.key);
                console.log(image1);
                i1 = response.data.key
                console.log("i1: "+ i1);
              }
            })
        }
        if(file3){
          await http
            .post("users/actorbanner", formData3, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              if (response.data.key !== undefined) {
                setImage2(response.data.key);
                i2 = response.data.key
              }
            })
        }
        if(file4){
          await http
            .post("users/actorbanner", formData4, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              if (response.data.key !== undefined) {
                setImage3(response.data.key);
                i3 = response.data.key
              }
            })
        }
        await http.put(`users/actor/files/${user.id}`, {
          picture:actorData.picture,
          bannerImg: actorData.bannerImg,
          profiles: [
            (i1 != "" ? i1: profs[0]),(i2 != "" ? i2:profs[1]),(i3 != "" ? i3:profs[2])
          ]
        })
        .then((res) => {
          console.log("saved");
          console.log(res);
          console.log(i1);
          console.log(12);
          console.log(13);
        })
        .catch((err) => {
          console.log(err);
        });
        setMessage("upload success");
      }
      else{
        setMessage("error in Mime");
      }
      if(true){
        
      }
    }

    return(
      <>
      <div className="actor-upload-pic-container">
        <div className="actor-upload-profile-pic" style={{
              backgroundImage: `url(${process.env.REACT_APP_AWS_URL}/${actor.picture})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat"
            }}>
        <div className="actor-prof-file1">
          <input 
              className="actor-upload-profile-pic-btn"
              filename={file1}
              ref={inputFile1Ref}
              onChange={file1Selected}
              type="file"
              name="files"
              accept="image/*"
              id="actor-file1"
           />
           <label for="actor-file1" className="actor-prof-file" style={{
            fontSize: "20px"
           }}>Upload Headshot</label>
        </div>
        <div className="actor-prof-file2">
          <input 
              className="actor-upload-profile-pic-btn"
              filename={file2}
              ref={inputFile2Ref}
              onChange={file2Selected}
              type="file"
              name="files"
              accept="image/*"
              id="actor-file2"
           />
           <label htmlFor="actor-file2" className="actor-prof-file" style={{
              backgroundImage: `url(${process.env.REACT_APP_AWS_URL}/${profs[0]})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat"
            }}>+</label>
        </div>
        <div className="actor-prof-file3">
          <input 
              className="actor-upload-profile-pic-btn"
              filename={file3}
              ref={inputFile3Ref}
              onChange={file3Selected}
              type="file"
              name="files"
              accept="image/*"
              id="actor-file3"
           />
           <label for="actor-file3" className="actor-prof-file" style={{
              backgroundImage: `url(${process.env.REACT_APP_AWS_URL}/${profs[1]})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat"
            }}>+</label>
        </div>
        <div className="actor-prof-file4">
          <input 
              className="actor-upload-profile-pic-btn"
              filename={file4}
              ref={inputFile4Ref}
              onChange={file4Selected}
              type="file"
              name="files"
              accept="image/*"
              id="actor-file4"
           />
          <label for="actor-file4" className="actor-prof-file" style={{
              backgroundImage: `url(${process.env.REACT_APP_AWS_URL}/${profs[2]})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat"
            }}>+</label>
        </div>
        
        </div>
        <div className="actor-upload-back-pic">
          <input 
          className="actor-upload-back-pic-btn upload-actor-prof-btn"
          filename={fileBanner}
          onChange={fileBannerSelected}
          ref={inputFileBannerRef}
          type="file"
          name="files"
          accept="image/*"
          id="fileBanner"
          />
          <label for="fileBanner" className="upload-banner-actor">Upload Demoreel Video</label>
          
        </div>
        <p>{message}</p>
        <button 
        className="upload-actor-prof-btn1 upload-actor-prof-btn-save1"
        onClick={saveEpkCover}
    >
        save
        </button>
      </div>
  <div className="actor-dashbaord-about">
    <p>Biography text here example Biography text here example Biography text here example  Biography text here example Biography text here exampleBiography text here example Biography text here example Biography text here example Biography text here example Biography text here example Biography text here example  Biography text here example  Biography text here exampleBiography text here example Biography text here example Biography text here example</p>
  </div>
  <div className="actor-dashbaord-com">
      <div className="actor-dashbaord-com-detail">
        <img src={instagramIcon} className="actor-dash-com-icon"/>
        <input value="URL Here" className="actor-dash-com-detail"/>
      </div>
      <div className="actor-dashbaord-com-detail">
        <img src={facebookIcon} className="actor-dash-com-icon"/>
        <input value="URL Here" className="actor-dash-com-detail"/>
      </div>
      <div className="actor-dashbaord-com-detail">
        <img src={twiiterIcon} className="actor-dash-com-icon"/>
        <input value="URL Here" className="actor-dash-com-detail"/>
      </div>
      <div className="actor-dashbaord-com-detail">
        <input value="Enter Your Follower Number" className="actor-dash-com-detail2"/>
      </div>
      <div className="actor-dashbaord-com-detail">
        <input value="Enter Your Follower Number" className="actor-dash-com-detail2"/>
      </div>
      <div className="actor-dashbaord-com-detail">
        <input value="Enter Your Follower Number" className="actor-dash-com-detail2"/>
      </div>
  </div>
  <div className="actor-btn-save-upload-container">
    <p className="actor-text-upload">
      There are currently no EPKs attached to your Actor Page. Once filmmakers will assign you an EPK, it will appear here.
    </p>
    
  </div>
      </>
    );
}