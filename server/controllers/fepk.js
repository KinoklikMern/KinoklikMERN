import fepk from "../models/fepk.js";
import { uploadFileToS3 } from "../s3.js";

// fetch all Fepks
export const getFepks = async (req, res) => {
  try {
    const fepks = await fepk
      .find()
      .populate("film_maker") // includes all fields of this object
      .populate("crew.crewId") // includes all fields of this object
      .populate("likes") // includes all fields of this object
      .populate("favourites") // includes all fields of this object
      .populate("wishes_to_donate") // includes all fields of this object
      .populate("wishes_to_buy") // includes all fields of this object
      .populate("sharings") // includes all fields of this object
      .populate("mediumSynopsis.user") // includes all fields of this object
      .populate("longSynopsis.user") // includes all fields of this object
      .populate("uniqueness.user")
      .populate("stillsApproval")
      .populate("reports.user")
      // .populate("requests.user")
      .where("deleted")
      .equals(false);
    res.status(200).json(fepks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// fetch all Fepks by Film maker ID
export const getFepksByFilmmakerId = async (req, res) => {
  const id = req.params.id;
  try {
    const fepks = await fepk
      .find()
      .where({ film_maker: id })
      .populate("film_maker") // includes all fields of this object
      .populate("crew.crewId") // includes all fields of this object
      .populate("likes") // includes all fields of this object
      .populate("favourites") // includes all fields of this object
      .populate("wishes_to_donate") // includes all fields of this object
      .populate("wishes_to_buy") // includes all fields of this object
      .populate("sharings") // includes all fields of this object
      .populate("mediumSynopsis.user") // includes all fields of this object
      .populate("longSynopsis.user") // includes all fields of this object
      .populate("uniqueness.user")
      .populate("stillsApproval.user")
      .populate("reports.user")
      // .populate("requests.user")
      .where("deleted")
      .equals(false);
    res.status(200).json(fepks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// // get movie by actor
// export const getFepksByActorId = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const fepks = await fepk
//       .find()
//       .where({ actors: {$in: id} })
//       .populate("film_maker") // includes all fields of this object
//       .populate("crew.crewId") // includes all fields of this object
//       .populate("likes") // includes all fields of this object
//       .populate("favourites") // includes all fields of this object
//       .populate("wishes_to_buy") // includes all fields of this object
//       .populate("sharings") // includes all fields of this object
//       .populate("mediumSynopsis.user") // includes all fields of this object
//       .populate("longSynopsis.user") // includes all fields of this object
//       .populate("uniqueness.user")
//       .populate("stillsApproval.user")
//       .populate("reports.user")
//       // .populate("requests.user")
//       .where("deleted")
//       .equals(false);
//     res.status(200).json(fepks);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

export const getFepksByActorId = async (req, res) => {
  const id = req.params.id;
  try {
    const fepks = await fepk
      .find({ actors: { $in: [id] }, deleted: false }) // combine the two .where() conditions into one .find() condition
      .populate("film_maker")
      .populate("crew.crewId")
      .populate("likes")
      .populate("favourites")
      .populate("wishes_to_donate") // includes all fields of this object
      .populate("wishes_to_buy")
      .populate("sharings")
      .populate("mediumSynopsis.user")
      .populate("longSynopsis.user")
      .populate("uniqueness.user")
      .populate("stillsApproval.user")
      .populate("reports.user");

    // Check if no movies are found and send back an empty array.
    if (!fepks.length) {
      return res.status(200).json([]);
    }

    // If movies are found, send them back.
    res.status(200).json(fepks);
  } catch (error) {
    console.error(error); // This will log the error which can be useful for debugging.
    res.status(500).json({ message: "Internal Server Error" }); // Changed to 500 to indicate a server error.
  }
};

// fetch all Fepks by User in Favourites "My list"
export const getFepksByUser = async (req, res) => {
  const id = req.params.id;
  try {
    const fepks = await fepk
      .find()
      .where({ favourites: id })
      .populate("film_maker") // includes all fields of this object
      .populate("crew.crewId") // includes all fields of this object
      .populate("likes") // includes all fields of this object
      .populate("favourites") // includes all fields of this object
      .populate("wishes_to_donate") // includes all fields of this object
      .populate("wishes_to_buy") // includes all fields of this object
      .populate("sharings") // includes all fields of this object
      .populate("mediumSynopsis.user") // includes all fields of this object
      .populate("longSynopsis.user") // includes all fields of this object
      .populate("uniqueness.user")
      .populate("stillsApproval.user")
      .populate("reports.user")
      .where("deleted")
      .equals(false);
    res.status(200).json(fepks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// fetch Fepk by Id
export const getFepkbyId = async (req, res) => {
  const id = req.params.id;
  try {
    const fepkOne = await fepk
      .findOne({ _id: id })
      .populate("film_maker") // includes all fields of this object
      //.populate("crew.crewId") // includes all fields of this object
      .populate("actors")
      .populate("likes") // includes all fields of this object
      .populate("favourites") // includes all fields of this object
      .populate("wishes_to_donate") // includes all fields of this object
      .populate("wishes_to_buy") // includes all fields of this object
      .populate("sharings") // includes all fields of this object
      .populate("mediumSynopsis.user") // includes all fields of this object
      .populate("longSynopsis.user") // includes all fields of this object
      .populate("uniqueness.user")
      .populate("stillsApproval.user")
      .populate("reports.user")
      .where("deleted")
      .equals(false);
    res.status(200).json(fepkOne);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// fetch Fepk by Title
export const getFepkByTitle = async (req, res) => {
  // const title = req.params.title;
  const title = req.params.title.replace(/_/g, " ");
  try {
    const fepkOne = await fepk
      .findOne({ title: { $regex: new RegExp(`^${title}$`, "i") } })
      .populate("film_maker") // includes all fields of this object
      .populate("crew.crewId") // includes all fields of this object
      .populate("likes") // includes all fields of this object
      .populate("favourites") // includes all fields of this object
      .populate("wishes_to_donate") // includes all fields of this object
      .populate("wishes_to_buy") // includes all fields of this object
      .populate("sharings") // includes all fields of this object
      .populate("mediumSynopsis.user") // includes all fields of this object
      .populate("longSynopsis.user") // includes all fields of this object
      .populate("uniqueness.user")
      .populate("stillsApproval.user")
      .populate("reports.user")
      .where("deleted")
      .equals(false);
    res.status(200).json(fepkOne);
    if (!fepkOne) {
      return res.status(404).json({ message: "FEPK not found" });
    }
    // res.status(200).json(fepkOne);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// fetch Fepks by Title (check if title exists)
export const getFepksByTitle = async (req, res) => {
  const title = req.params.title;
  try {
    const fepks = await fepk
      .find({ title: { $regex: new RegExp(`^${title}$`, "i") } })
      .populate("film_maker") // includes all fields of this object
      .populate("crew.crewId") // includes all fields of this object
      .populate("likes") // includes all fields of this object
      .populate("favourites") // includes all fields of this object
      .where("deleted")
      .equals(false);
    res.status(200).json(fepks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// fetch followers of facebook, instagram, and twitter
export const getFollowers = async (req, res) => {
  const id = req.params.id;
  try {
    const fepkOne = await fepk
      .findOne({ _id: id })
      .where("deleted")
      .equals(false);
    let facebooks = 0;
    let instagrams = 0;
    let twitters = 0;
    fepkOne.crew.forEach((element) => {
      if (element.facebook_followers) {
        facebooks += parseInt(element.facebook_followers);
      }
      if (element.instagram_followers) {
        instagrams += parseInt(element.instagram_followers);
      }
      if (element.twitter_followers) {
        twitters += parseInt(element.twitter_followers);
      }
    });
    //res.status(200).json(fepkOne);
    res
      .status(200)
      .json({ facebook: facebooks, instagram: instagrams, twitter: twitters });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// create Fepk
export const createFepk = async (req, res) => {
  try {
    const fepkToSave = req.body;
    const title = req.body.title;
    const fepks = await fepk
      .find({ title: { $regex: new RegExp(`^${title}$`, "i") } })
      .where("deleted")
      .equals(false);
    if (fepks.length > 0) {
      res.status(409).json({ error: "Duplicate title!" });
    } else {
      const newFepk = new fepk(fepkToSave);
      await newFepk.save();
      res.status(201).json(newFepk);
    }
  } catch (error) {
    res.json({ error: "Error, no Epk was created!" });
  }
};

// update Fepk
export const updateFepk = async (req, res) => {
  const id = req.params.id;
  try {
    const fepkOne = await fepk
      .findOne({ _id: id })
      .where("deleted")
      .equals(false);
    if (!fepkOne) {
      return res.status(404).json({ error: "No EPK was found!" });
    } else {
      const updatedFepk = req.body;
      await fepk.updateOne(
        { _id: id },
        {
          $set: {
            ...updatedFepk,
            updatedAt: new Date(), // Set the updatedAt field to the current date and time
          },
        }
      );
      const fepkUpdated = await fepk.findOne({ _id: id });
      res.status(200).json(fepkUpdated);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// update Fepk with new report from user
export const createReport = async (req, res) => {
  const fepkId = req.params.fepkId;
  const userId = req.body.userId;
  const comment = req.body.comment;
  const reason = req.body.reason;
  let exists = false;
  const report = {
    user: userId,
    reason: reason,
    comment: comment,
    status: "opened",
    createdAt: new Date(),
  };
  try {
    let fepkOne = await fepk
      .findOne({ _id: fepkId })
      .where("deleted")
      .equals(false);
    if (!fepkOne) {
      res.json({ error: "No EPK was found!" });
    } else {
      let reports = fepkOne.reports;

      reports.map((report) => {
        if (report.user == userId && report.status == "opened") {
          exists = true;
        }
      });

      if (exists === true) {
        res.json({ error: "You have already reported this EPK!" });
      } else {
        reports.push(report);
        fepkOne.reports = reports;
        await fepkOne.save();
        fepkOne = await fepk.findOne({ _id: fepkId });
        res.status(200).json(fepkOne);
      }
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// adding user who liked Fepk
export const getFepkLiked = async (req, res) => {
  const fepkId = req.params.fepkid;
  const userId = req.params.userid;
  try {
    const fepkOne = await fepk
      .findOne({ _id: fepkId })
      .where("deleted")
      .equals(false);
    if (!fepkOne) {
      res.json({ error: "No EPK was found!" });
    } else {
      let exists = fepkOne.likes.includes(userId);
      if (exists === false) {
        await fepkOne.likes.push(userId);
        await fepkOne.save();
      } else {
        await fepkOne.likes.pull(userId);
        await fepkOne.save();
      }
      const fepkUpdated = await fepk
        .findOne({ _id: fepkId })
        .populate("likes") // includes all fields of this object
        .populate("favourites") // includes all fields of this object
        .populate("wishes_to_donate") // includes all fields of this object
        .populate("wishes_to_buy") // includes all fields of this object
        .where("deleted")
        .equals(false);
      res.status(200).json(fepkUpdated);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// adding user to  favourite list
export const getFepkFavourite = async (req, res) => {
  const fepkId = req.params.fepkid;
  const userId = req.params.userid;
  try {
    const fepkOne = await fepk
      .findOne({ _id: fepkId })
      .where("deleted")
      .equals(false);
    if (!fepkOne) {
      res.json({ error: "No EPK was found!" });
    } else {
      let exists = fepkOne.favourites.includes(userId);
      // let exists = fepkOne.favourites.includes(userId);
      if (exists === false) {
        await fepkOne.favourites.push(userId);
        await fepkOne.save();
      } else {
        await fepkOne.favourites.pull(userId);
        await fepkOne.save();
      }
      const fepkUpdated = await fepk
        .findOne({ _id: fepkId })
        .populate("likes") // includes all fields of this object
        .populate("favourites") // includes all fields of this object
        .populate("wishes_to_donate") // includes all fields of this object
        .populate("wishes_to_buy") // includes all fields of this object
        .where("deleted")
        .equals(false);
      res.status(200).json(fepkUpdated);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// adding user who wishes to donate
export const getFepkWishedToDonate = async (req, res) => {
  const fepkId = req.params.fepkid;
  const userId = req.params.userid;
  try {
    const fepkOne = await fepk
      .findOne({ _id: fepkId })
      .where("deleted")
      .equals(false);
    if (!fepkOne) {
      res.json({ error: "No EPK was found!" });
    } else {
      let exists = fepkOne.wishes_to_donate.includes(userId);
      if (exists === false) {
        await fepkOne.wishes_to_donate.push(userId);
        await fepkOne.save();
      } else {
        await fepkOne.wishes_to_donate.pull(userId);
        await fepkOne.save();
      }
      const fepkUpdated = await fepk
        .findOne({ _id: fepkId })
        .populate("likes") // includes all fields of this object
        .populate("favourites") // includes all fields of this object
        .populate("wishes_to_donate") // includes all fields of this object
        .populate("wishes_to_buy") // includes all fields of this object
        .where("deleted")
        .equals(false);
      res.status(200).json(fepkUpdated);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// adding user who wishes to buy $
export const getFepkWishedToBuy = async (req, res) => {
  const fepkId = req.params.fepkid;
  const userId = req.params.userid;
  try {
    const fepkOne = await fepk
      .findOne({ _id: fepkId })
      .where("deleted")
      .equals(false);
    if (!fepkOne) {
      res.json({ error: "No EPK was found!" });
    } else {
      let exists = fepkOne.wishes_to_buy.includes(userId);
      if (exists === false) {
        await fepkOne.wishes_to_buy.push(userId);
        await fepkOne.save();
      } else {
        await fepkOne.wishes_to_buy.pull(userId);
        await fepkOne.save();
      }
      const fepkUpdated = await fepk
        .findOne({ _id: fepkId })
        .populate("likes") // includes all fields of this object
        .populate("favourites") // includes all fields of this object
        .populate("wishes_to_donate") // includes all fields of this object
        .populate("wishes_to_buy") // includes all fields of this object
        .where("deleted")
        .equals(false);
      res.status(200).json(fepkUpdated);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// adding user who shared the link
export const getFepkSharings = async (req, res) => {
  const fepkId = req.params.fepkid;
  const userId = req.params.userid;
  try {
    const fepkOne = await fepk
      .findOne({ _id: fepkId })
      .where("deleted")
      .equals(false);
    if (!fepkOne) {
      res.json({ error: "No EPK was found!" });
    } else {
      let exists = fepkOne.sharings.includes(userId);
      if (exists === false) {
        await fepkOne.sharings.push(userId);
        await fepkOne.save();
      } else {
        await fepkOne.sharings.pull(userId);
        await fepkOne.save();
      }
      const fepkUpdated = await fepk
        .findOne({ _id: fepkId })
        .populate("likes") // includes all fields of this object
        .populate("favourites") // includes all fields of this object
        .populate("wishes_to_donate") // includes all fields of this object
        .populate("wishes_to_buy") // includes all fields of this object
        .populate("sharings") // includes all fields of this object
        .where("deleted")
        .equals(false);
      res.status(200).json(fepkUpdated);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// adding user who makes request for Synopsis medium part
export const getMediumSynopsis = async (req, res) => {
  const fepkId = req.params.fepkid;
  const user = req.params.userid;
  const status = "pending";
  try {
    const fepkOne = await fepk
      .findOne({ _id: fepkId })
      .where("deleted")
      .equals(false);
    if (!fepkOne) {
      res.json({ error: "No EPK was found!" });
    } else {
      let exists = false;
      fepkOne.mediumSynopsis.forEach((element) => {
        if (element.user == user) {
          exists = true;
        }
      });

      if (exists === false) {
        await fepkOne.mediumSynopsis.push({ user, status });
        await fepkOne.save();
        const fepkUpdated = await fepk.findOne({ _id: fepkId });
        res.status(200).json(fepkUpdated);
      } else {
        res.status(200).json(fepkOne);
      }
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// adding user who makes request for Synopsis long part
export const getLongSynopsis = async (req, res) => {
  const fepkId = req.params.fepkid;
  const user = req.params.userid;
  const status = "pending";
  try {
    const fepkOne = await fepk
      .findOne({ _id: fepkId })
      .where("deleted")
      .equals(false);
    if (!fepkOne) {
      res.json({ error: "No EPK was found!" });
    } else {
      let exists = false;
      fepkOne.longSynopsis.forEach((element) => {
        if (element.user == user) {
          exists = true;
        }
      });

      if (exists === false) {
        await fepkOne.longSynopsis.push({ user, status });
        await fepkOne.save();
        const fepkUpdated = await fepk.findOne({ _id: fepkId });
        res.status(200).json(fepkUpdated);
      } else {
        res.status(200).json(fepkOne);
      }
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// adding user who makes request for Uniqueness part
export const getUniqueness = async (req, res) => {
  const fepkId = req.params.fepkid;
  const user = req.params.userid;
  const status = "pending";
  try {
    const fepkOne = await fepk
      .findOne({ _id: fepkId })
      .where("deleted")
      .equals(false);
    if (!fepkOne) {
      res.json({ error: "No EPK was found!" });
    } else {
      let exists = false;
      fepkOne.uniqueness.forEach((element) => {
        if (element.user == user) {
          exists = true;
        }
      });

      if (exists === false) {
        await fepkOne.uniqueness.push({ user, status });
        await fepkOne.save();
        const fepkUpdated = await fepk.findOne({ _id: fepkId });
        res.status(200).json(fepkUpdated);
      } else {
        res.status(200).json(fepkOne);
      }
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// adding user who makes request for Stills part
export const getStills = async (req, res) => {
  const fepkId = req.params.fepkid;
  const user = req.params.userid;
  const status = "pending";
  try {
    const fepkOne = await fepk
      .findOne({ _id: fepkId })
      .where("deleted")
      .equals(false);
    if (!fepkOne) {
      res.json({ error: "No EPK was found!" });
    } else {
      let exists = false;
      fepkOne.stillsApproval.forEach((element) => {
        if (element.user == user) {
          exists = true;
        }
      });

      if (exists === false) {
        await fepkOne.stillsApproval.push({ user, status });
        await fepkOne.save();
        const fepkUpdated = await fepk.findOne({ _id: fepkId });
        res.status(200).json(fepkUpdated);
      } else {
        res.status(200).json(fepkOne);
      }
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//upload a file to S3
export const uploadFepkFile = async (req, res) => {
  const file = req.file;
  const result = await uploadFileToS3(file);
  if (!result) {
    res.status(406).send({ message: "File extention not supported!" });
  } else {
    console.log(result);
    res.status(200).send({ key: result.Key });
    //res.status(200).send({ Location: result.Location });
  }
};

//upload 2 or 3 files to S3
export const uploadFepkFiles = async (req, res) => {
  let totalResult = {};
  console.log("here");
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

  console.log("file3" in req.files);
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

  console.log(totalResult);
  res.send(totalResult);
};

// delete Fepk
// Soft-deletion of documents in databases is an operation in which a flag is used
// to mark documents as deleted without erasing the data from the database.
export const deleteFepk = async (req, res) => {
  const id = req.params.id;
  try {
    const fepkOne = await fepk
      .findOne({ _id: id })
      .where("deleted")
      .equals(false);
    if (!fepkOne) {
      res.json({ error: "No EPK was found!" });
    } else {
      await fepkOne.updateOne({ deleted: true }, { where: { _id: id } });
      res.status(200).json("EPK was deleted!");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//**************************************Created by Zibin ***************************************** */
// adding user who makes request mediumSynopsis/Synopsis long/Uniqueness/Stills  part
export const postRequests = async (req, res) => {
  const { fepkId, user, comment } = req.body;
  const status = "pending";
  const createdAt = new Date();
  try {
    const fepkOne = await fepk
      .findOne({ _id: fepkId })
      .where("deleted")
      .equals(false);
    if (!fepkOne) {
      res.json({ error: "No EPK was found!" });
    } else {
      let exists = false;
      fepkOne.requests.forEach((element) => {
        if (element.user == user) {
          exists = true;
        }
      });

      if (exists === false) {
        await fepkOne.requests.push({ user, status, comment, createdAt });
        await fepkOne.save();
        const fepkUpdated = await fepk.findOne({ _id: fepkId });
        res.status(200).json(fepkUpdated);
      } else {
        res.status(200).json(fepkOne);
      }
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get fepks which are starred by user
export const getStarredFepksByUser = async (req, res) => {
  const userId = req.params.userId;
  //console.log(userId);
  try {
    const fepks = await fepk
      .find({ likes: userId })
      .populate("film_maker") // includes all fields of this object
      .populate("crew.crewId") // includes all fields of this object
      .populate("likes") // includes all fields of this object
      .populate("favourites") // includes all fields of this object
      .populate("wishes_to_donate") // includes all fields of this object
      .populate("wishes_to_buy") // includes all fields of this object
      .populate("sharings") // includes all fields of this object
      .populate("mediumSynopsis.user") // includes all fields of this object
      .populate("longSynopsis.user") // includes all fields of this object
      .populate("uniqueness.user")
      .populate("stillsApproval.user")
      .populate("reports.user")
      .populate("requests.user")
      .where("deleted")
      .equals(false);
    res.status(200).json(fepks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get fepks which are following by user
export const getFollowingFepksByUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const fepks = await fepk
      .find({ favourites: userId })
      .populate("film_maker") // includes all fields of this object
      .populate("crew.crewId") // includes all fields of this object
      .populate("likes") // includes all fields of this object
      .populate("favourites") // includes all fields of this object
      .populate("wishes_to_donate") // includes all fields of this object
      .populate("wishes_to_buy") // includes all fields of this object
      .populate("sharings") // includes all fields of this object
      .populate("mediumSynopsis.user") // includes all fields of this object
      .populate("longSynopsis.user") // includes all fields of this object
      .populate("uniqueness.user")
      .populate("stillsApproval.user")
      .populate("reports.user")
      .populate("requests.user")
      .where("deleted")
      .equals(false);
    res.status(200).json(fepks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get fepks which are requests by user
export const getRequestsFepksByUser = async (req, res) => {
  const userId = req.params.userId;
  // const status = req.params.status;
  //console.log(userId, status);
  try {
    const fepks = await fepk
      .find()
      // .where({ requests: { $elemMatch: { user: userId, status: status } } })
      .where({ requests: { $elemMatch: { user: userId } } })
      .populate("film_maker") // includes all fields of this object
      .populate("crew.crewId") // includes all fields of this object
      .populate("likes") // includes all fields of this object
      .populate("favourites") // includes all fields of this object
      .populate("wishes_to_donate") // includes all fields of this object
      .populate("wishes_to_buy") // includes all fields of this object
      .populate("sharings") // includes all fields of this object
      .populate("mediumSynopsis.user") // includes all fields of this object
      .populate("longSynopsis.user") // includes all fields of this object
      .populate("uniqueness.user")
      .populate("stillsApproval.user")
      .populate("reports.user")
      .populate("requests.user")
      .where("deleted")
      .equals(false);
    // console.log(fepks);
    res.status(200).json(fepks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
//************************************************************************************** */
// get fepks which are wish_to_donate by user
export const getWishToDonateFepksByUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const fepks = await fepk
      .find({ wishes_to_donate: userId })
      .populate("film_maker") // includes all fields of this object
      .populate("crew.crewId") // includes all fields of this object
      .populate("likes") // includes all fields of this object
      .populate("favourites") // includes all fields of this object
      .populate("wishes_to_donate") // includes all fields of this object
      .populate("wishes_to_buy") // includes all fields of this object
      .populate("sharings") // includes all fields of this object
      .populate("mediumSynopsis.user") // includes all fields of this object
      .populate("longSynopsis.user") // includes all fields of this object
      .populate("uniqueness.user")
      .populate("stillsApproval.user")
      .populate("reports.user")
      .populate("requests.user")
      .where("deleted")
      .equals(false);
    res.status(200).json(fepks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
//**************************************Created by Rucheng ***************************************** */

// get fepks which are wish_to_buy by user
export const getWishToBuyFepksByUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const fepks = await fepk
      .find({ wishes_to_buy: userId })
      .populate("film_maker") // includes all fields of this object
      .populate("crew.crewId") // includes all fields of this object
      .populate("likes") // includes all fields of this object
      .populate("favourites") // includes all fields of this object
      .populate("wishes_to_donate") // includes all fields of this object
      .populate("wishes_to_buy") // includes all fields of this object
      .populate("sharings") // includes all fields of this object
      .populate("mediumSynopsis.user") // includes all fields of this object
      .populate("longSynopsis.user") // includes all fields of this object
      .populate("uniqueness.user")
      .populate("stillsApproval.user")
      .populate("reports.user")
      .populate("requests.user")
      .where("deleted")
      .equals(false);
    res.status(200).json(fepks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// approve request mediumSynopsis/Synopsis long/Uniqueness/Stills  part
export const approveRequests = async (req, res) => {
  const { fepkId, user, comment } = req.body;
  try {
    const result = await fepk.findOneAndUpdate(
      {
        _id: fepkId,
        "requests.user": user,
      },
      {
        $set: {
          "requests.$": {
            user,
            comment,
            status: "approved",
          },
        },
      },
      { new: true }
    );
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: "something wrong!" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
//************************************************************************************** */
// refused request mediumSynopsis/Synopsis long/Uniqueness/Stills  part
export const refuseRequests = async (req, res) => {
  const { fepkId, user, comment } = req.body;
  try {
    const result = await fepk.findOneAndUpdate(
      {
        _id: fepkId,
        "requests.user": user,
      },
      {
        $set: {
          "requests.$": {
            user,
            comment,
            status: "refused",
          },
        },
      },
      { new: true }
    );
    console.info(result);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: "something wrong!" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
//************************************************************************************** */

export const getNewest = async (req, res) => {
  try {
    const getfips = await fepk
      .find()
      .populate("film_maker") // includes all fields of this object
      .populate("crew.crewId") // includes all fields of this object
      .populate("likes") // includes all fields of this object
      .populate("favourites") // includes all fields of this object
      .populate("wishes_to_buy") // includes all fields of this object
      .populate("sharings") // includes all fields of this object
      .populate("mediumSynopsis.user") // includes all fields of this object
      .populate("longSynopsis.user") // includes all fields of this object
      .populate("uniqueness.user")
      .populate("stillsApproval.user")
      .populate("reports.user")
      .where("deleted")
      .equals(false)
      .sort({ _id: -1 })
      .limit(6);

    res.status(200).json(getfips);
  } catch (error) {
    res.status(404).json({ error: true, message: error.message });
  }
};

export const getMostPopular = async (req, res) => {
  try {
    const popularFind = await fepk
      .find()
      .sort({ "likes.length": -1 })
      .limit(6)
      .populate("film_maker") // includes all fields of this object
      .populate("crew.crewId") // includes all fields of this object
      .populate("likes") // includes all fields of this object
      .populate("favourites") // includes all fields of this object
      .populate("wishes_to_buy") // includes all fields of this object
      .populate("sharings") // includes all fields of this object
      .populate("mediumSynopsis.user") // includes all fields of this object
      .populate("longSynopsis.user") // includes all fields of this object
      .populate("uniqueness.user")
      .populate("stillsApproval.user")
      .populate("reports.user")
      .where("deleted")
      .equals(false);

    res.status(200).json(popularFind);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
