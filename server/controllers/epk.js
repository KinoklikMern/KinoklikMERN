import Epk from "../models/epk.js";
import Movie from "../models/movie.js";
import {ObjectId} from'mongodb';
import { uploadFileToS3 } from "../s3.js";

export const getEpkByMovieId = async (req, res) => {  
  try {
    const epk = await Epk.findOne({ movie: ObjectId(req.params.id)});
   
    res.status(200).json(epk);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


// create epk
export const createEpk = async(req, res) => {   
  const newepk = new Epk(req.body);  
  //const movie = await Movie.findOne({ _id: ObjectId(req.params.id) });
  newepk.movie = ObjectId(req.params.id);
  newepk.save((err, response) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).json(response);       
  });
};

//update epk by id
export const updateEpkById = async (req,res) =>{
  let newValue = req.body;  

  Epk.updateOne({_id:ObjectId(req.params.id) },newValue, (err, response) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).json(response );       
  });
}


// get uniques of epk by Id
export const getEpkUniquesById = (req,res) =>{
    const id = req.params.id;
  Epk.find({ _id: ObjectId(req.params.id)  }, {unique1_title:1,
    unique2_title:1, unique1_description:1, unique2_description:1,
    unique1_poster_url:1, unique2_poster_url:1},(err, epk) => {

    
     console.log(req.params.id);
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    console.log(epk);
    res.status(200).json(epk);      
  });
}



//update uniques of epk by Id
//example: db.employees.updateMany({_id:5},{$set:{ skills:["Sales Tax"]}})
export const updateEpkUniquesById = async (req,res) =>{
  const newuniques = req.body.uniques;
  //console.log(newuniques);
  const newtitle1 = req.body.unique1_title;
  const newtitle2 = req.body.unique2_title;
  const newdescription1 = req.body.unique1_description;
  const newdescription2 = req.body.unique2_description;
  const newposter1 = req.body.unique1_poster_url;
  const newposter2 = req.body.unique2_poster_url;
  Epk.updateMany({ _id: ObjectId(req.params.id)}, {$set:{ unique1_title:newtitle1,
    unique2_title:newtitle2,unique1_description:newdescription1,unique2_description:newdescription2,
    unique1_poster_url:newposter1,unique2_poster_url:newposter2}},(err, epk) => {
     
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).json(epk);       
  });
}


// get stills of epk by Id
export const getEpkStillsById = (req,res) =>{
  Epk.find({ _id: ObjectId(req.params.id)  }, {still_img1_url:1,still_img2_url:1,
    still_img3_url:1,still_img4_url:1,still_img5_url:1,still_img6_url:1,still_img7_url:1,still_img8_url:1},(err, epk) => {
     //console.log(req.params.id);
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).json(epk);      
  });
}



//update stills of epk by Id
//example: db.employees.updateMany({_id:5},{$set:{ skills:["Sales Tax"]}})
export const updateEpkStillsById = async (req,res) =>{
  const newstill1 = req.body.still_img1_url;
  const newstill2 = req.body.still_img2_url;
  const newstill3 = req.body.still_img3_url;
  const newstill4 = req.body.still_img4_url;
  const newstill5 = req.body.still_img5_url;
  const newstill6 = req.body.still_img6_url;
  const newstill7 = req.body.still_img7_url;
  const newstill8 = req.body.still_img8_url;
  Epk.updateMany({ _id: ObjectId(req.params.id)}, {$set:{ still_img1_url:newstill1,still_img2_url:newstill2,
    still_img3_url:newstill3,still_img4_url:newstill4,still_img5_url:newstill5,
    still_img6_url:newstill6,still_img7_url:newstill7,still_img8_url:newstill8,}},(err, epk) => {
     
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).json(epk);       
  });
}




// upload 8 image for as stills

export const uploadEpkStills = async (req, res) => {
  
  let totalResult = {};
  console.log(req.files);
  if ("file1" in req.files) {
    const file1 = req.files.file1[0];
    const result1 = await uploadFileToS3(file1);
    if (!result1) {
      res.status(406).send({ message: "File extention not supported!" });
    } else {
      console.log(result1);
      totalResult["file1"] = result1.Key;
    }
  }

  console.log("file2" in req.files);
  if ("file2" in req.files) {
    const file2 = req.files.file2[0];
    const result2 = await uploadFileToS3(file2);
    if (!result2) {
      res.status(406).send({ message: "File extention not supported!" });
    } else {
      console.log(totalResult);
      totalResult["file2"] = result2.Key;
    }
  }
  if ("file3" in req.files) {
      const file3 = req.files.file3[0];
      const result3 = await uploadFileToS3(file3);
      if (!result3) {
        res.status(406).send({ message: "File extention not supported!" });
      } else {
        console.log(totalResult);
        totalResult["file3"] = result3.Key;
      }
    }
    if ("file4" in req.files) {
      const file4 = req.files.file4[0];
      const result4 = await uploadFileToS3(file4);
      if (!result4) {
        res.status(406).send({ message: "File extention not supported!" });
      } else {
        console.log(totalResult);
        totalResult["file4"] = result4.Key;
      }
    }
    if ("file5" in req.files) {
      const file5 = req.files.file5[0];
      const result5 = await uploadFileToS3(file5);
      if (!result5) {
        res.status(406).send({ message: "File extention not supported!" });
      } else {
        console.log(totalResult);
        totalResult["file5"] = result5.Key;
      }
    }
    if ("file6" in req.files) {
      const file6 = req.files.file6[0];
      const result6 = await uploadFileToS3(file6);
      if (!result6) {
        res.status(406).send({ message: "File extention not supported!" });
      } else {
        console.log(totalResult);
        totalResult["file6"] = result6.Key;
      }
    }
    if ("file7" in req.files) {
      const file7 = req.files.file7[0];
      const result7 = await uploadFileToS3(file7);
      if (!result7) {
        res.status(406).send({ message: "File extention not supported!" });
      } else {
        console.log(totalResult);
        totalResult["file7"] = result7.Key;
      }
    }
    if ("file8" in req.files) {
      const file8 = req.files.file8[0];
      const result8 = await uploadFileToS3(file8);
      if (!result8) {
        res.status(406).send({ message: "File extention not supported!" });
      } else {
        console.log(totalResult);
        totalResult["file8"] = result8.Key;
      }
    }

  console.log(totalResult);
  res.send(totalResult);
};


export const uploadEpkFiles = async (req, res) => {
  let totalResult = {};
  console.log(req.files);
  if ("file1" in req.files) {
    const file1 = req.files.file1[0];
    const result1 = await uploadFileToS3(file1);
    if (!result1) {
      res.status(406).send({ message: "File extention not supported!" });
    } else {
      console.log(result1);
      totalResult["file1"] = result1.Key;
    }
  }

  console.log("file2" in req.files);
  if ("file2" in req.files) {
    const file2 = req.files.file2[0];
    const result2 = await uploadFileToS3(file2);
    if (!result2) {
      res.status(406).send({ message: "File extention not supported!" });
    } else {
      console.log(totalResult);
      totalResult["file2"] = result2.Key;
    }
  }

  console.log(totalResult);
  res.send(totalResult);
};