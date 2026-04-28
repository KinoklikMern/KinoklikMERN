import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import { 
  S3Client, 
  PutObjectCommand, 
  GetObjectCommand, 
  DeleteObjectsCommand 
} from "@aws-sdk/client-s3";

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const checkMimeType = (type) => {
  let ext = "";
  if (type === "video/mp4") ext = ".mp4";
  else if (type === "video/mpeg") ext = ".mpeg";
  else if (type === "video/quicktime") ext = ".mov";
  else if (type === "video/webm") ext = ".webm";
  else if (type === "video/x-ms-wmv") ext = ".wmv";
  else if (type === "video/ogg") ext = ".ogg";
  else if (type === "video/3gpp") ext = ".3gp";
  else if (type === "video/x-msvideo") ext = ".avi";
  else if (type === "image/png") ext = ".png";
  else if (type === "image/gif") ext = ".gif";
  else if (type === "image/jpg" || type === "image/jpeg") ext = ".jpg";
  else throw new Error("File extention not supported");
  return ext;
};

// upload a file to s3
export async function uploadFileToS3(fileObj) {
  const fileStream = fs.createReadStream(fileObj.path);
  const mimetype = fileObj.mimetype;

  let ext = checkMimeType(mimetype);
  
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: fileObj.filename + ext, 
  };

  try {
    const command = new PutObjectCommand(uploadParams);
    const uploadData = await s3.send(command);
    
    // Clean up local temp file
    try {
      fs.unlinkSync("./images/" + fileObj.filename);
    } catch (err) {
      console.error("Local file cleanup error:", err);
    }
    
    // Return uploadData + the Key (Controllers rely on result.Key)
    return { ...uploadData, Key: uploadParams.Key };
  } catch (err) {
    console.error("S3 Upload Error:", err);
    return null;
  }
}

// upload an image file to s3
export async function uploadImageFileToS3(fileObj) {
  const fileStream = fs.createReadStream(fileObj.path);
  const mimetype = fileObj.mimetype;
  console.log(mimetype);
  
  let ext = "";
  if (mimetype === "image/png") ext = ".png";
  else if (mimetype === "image/gif") ext = ".gif";
  else if (["image/jpg", "image/jpeg", "image/JPEG", "image/JPG"].includes(mimetype)) ext = ".jpg";
  else throw new Error("File extention not supported");

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: "image/" + fileObj.filename + ext, 
  };

  try {
    const command = new PutObjectCommand(uploadParams);
    const uploadData = await s3.send(command);
    
    try {
      fs.unlinkSync("./images/" + fileObj.filename);
    } catch (err) {
      console.error("Local file cleanup error:", err);
    }
    
    return { ...uploadData, Key: uploadParams.Key };
  } catch (err) {
    console.error("S3 Image Upload Error:", err);
    return null;
  }
}

// upload a media file to s3
export async function uploadMediaFileToS3(fileObj) {
  const fileStream = fs.createReadStream(fileObj.path);
  const mimetype = fileObj.mimetype;
  console.log(mimetype);
  
  let ext = "";
  if (mimetype === "video/mp4") ext = ".mp4";
  else if (mimetype === "video/mpeg") ext = ".mpeg";
  else if (mimetype === "video/quicktime") ext = ".mov";
  else if (mimetype === "video/x-ms-wmv") ext = ".wmv";
  else if (mimetype === "video/ogg") ext = ".ogg";
  else if (mimetype === "video/3gpp") ext = ".3gp";
  else if (mimetype === "video/x-msvideo" || mimetype === "\tvideo/x-msvideo") ext = ".avi";
  else throw new Error("File extention not supported");

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: "movie/" + fileObj.filename + ext, 
  };

  try {
    const command = new PutObjectCommand(uploadParams);
    const uploadData = await s3.send(command);
    
    try {
      fs.unlinkSync("./images/" + fileObj.filename);
    } catch (err) {
      console.error("Local file cleanup error:", err);
    }
    
    return { ...uploadData, Key: uploadParams.Key };
  } catch (err) {
    console.error("S3 Media Upload Error:", err);
    return null;
  }
}

// downloads a file from s3
export async function getFileStreamFromS3(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  try {
    const command = new GetObjectCommand(downloadParams);
    const response = await s3.send(command);
    return response;
  } catch (err) {
    console.error("S3 Download Error:", err);
    throw err;
  }
}

// batch delete files from s3
export async function deleteFilesFromS3(keys) {
  if (!keys || keys.length === 0) return { Deleted: [] };

  const objectsToDelete = keys.map(key => ({ Key: key }));

  const deleteParams = {
    Bucket: bucketName,
    Delete: {
      Objects: objectsToDelete,
      Quiet: false 
    }
  };

  try {
    const command = new DeleteObjectsCommand(deleteParams);
    const deleteData = await s3.send(command);
    console.log("Successfully deleted from S3:", deleteData.Deleted);
    return deleteData;
  } catch (err) {
    console.error("Error batch deleting from S3:", err);
    throw err;
  }
}