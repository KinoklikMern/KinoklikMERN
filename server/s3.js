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
  let ext = "";
  if (mimetype === "image/png") ext = ".png";
  else if (mimetype === "image/jpg" || mimetype === "image/jpeg") ext = ".jpg";
  else throw new Error("File extention not supported");

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: fileObj.filename + ext, // use uuid generator  for key
  };

  const uploadData = await s3.upload(uploadParams).promise();
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
