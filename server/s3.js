import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import S3 from "aws-sdk/clients/s3.js";

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKey = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3({
  region,
  accessKey,
  secretAccessKey,
});

// upload a file to s3
export async function uploadFileToS3(fileObj) {
  const fileStream = fs.createReadStream(fileObj.path);
  const mimetype = fileObj.mimetype;
  console.log(mimetype);
  let ext = checkMimeType(mimetype);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: fileObj.filename + ext, // use uuid generator  for key
  };

  const uploadData = await s3.upload(uploadParams).promise();
  console.log(uploadData);
  try {
    fs.unlinkSync("./images/" + fileObj.filename);
    //file removed
  } catch (err) {
    console.error(err);
  }
  return uploadData;
}

// upload a file to s3
export async function uploadImageFileToS3(fileObj) {
  const fileStream = fs.createReadStream(fileObj.path);
  const mimetype = fileObj.mimetype;
  console.log(mimetype);
  let ext = "";
  if (mimetype === "image/png") ext = ".png";
  else if (mimetype === "image/gif") ext = ".gif";
  else if (mimetype === "image/jpg" || mimetype === "image/jpeg") ext = ".jpg";
  else if (mimetype === "image/JPEG" || mimetype === "image/jpeg") ext = ".jpg";
  else if (mimetype === "image/JPG" || mimetype === "image/jpeg") ext = ".jpg";
  else throw new Error("File extention not supported");

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: "image/" + fileObj.filename + ext, // use uuid generator  for key
  };

  const uploadData = await s3.upload(uploadParams).promise();

  console.log(uploadData);
  try {
    fs.unlinkSync("./images/" + fileObj.filename);
    //file removed
  } catch (err) {
    console.error(err);
  }
  return uploadData;
}

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
  else if (mimetype === "	video/x-msvideo") ext = ".avi";
  else throw new Error("File extention not supported");

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: "movie/" + fileObj.filename + ext, // use uuid generator  for key
  };

  const uploadData = await s3.upload(uploadParams).promise();
  console.log(uploadData);
  try {
    fs.unlinkSync("./images/" + fileObj.filename);
    //file removed
  } catch (err) {
    console.error(err);
  }
  return uploadData;
}

// downloads a file from s3
export async function getFileStreamFromS3(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  const downloddata = await s3.getObject(downloadParams).promise();

  return downloddata;
}

const checkMimeType = (type) => {
  let ext = "";
  if (type === "video/mp4") ext = ".mp4";
  else if (type === "video/mpeg") ext = ".mpeg";
  else if (type === "video/quicktime") ext = ".mov";
  else if (type === "video/x-ms-wmv") ext = ".wmv";
  else if (type === "video/ogg") ext = ".ogg";
  else if (type === "video/3gpp") ext = ".3gp";
  else if (type === "	video/x-msvideo") ext = ".avi";
  else if (type === "image/png") ext = ".png";
  else if (type === "image/gif") ext = ".gif";
  else if (type === "image/jpg" || type === "image/jpeg") ext = ".jpg";
  else throw new Error("File extention not supported");
  return ext;
};
