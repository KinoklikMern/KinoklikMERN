import React from 'react'
import {useState} from 'react';
import AWS from 'aws-sdk';
const s3 = new AWS.S3({
    accessKeyId: "accessID",
    secretAccessKey: "accesskey"
  });

const UploadImage = () => 
{ 


  const [selectedFile, setSelectedFile] = useState(null);
  const [url, setUrl] = useState("");

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  } 
  const uploadFile = (file) => 
  {      
    const params = {
        Bucket: "amazonclonefsd03",          
        Key: file.name,
        Body: file
    };
 
    s3.upload(params, function(err, data) 
    {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
        setUrl(data.Location);
        
    }); 
  }
  return(
    <>
    <div>
     <label>Image </label><br />
     <input type="file" onChange={handleFileInput} accept="image/*" /><br />
     <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button><br />
     {/* <img className='photos' src={url} alt={url}  /> */}
    
     
     <p>{url}</p>
     </div>
    </>
  )

}


export default UploadImage