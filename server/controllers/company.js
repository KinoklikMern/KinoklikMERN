import company from "../models/company.js";

// fetch all company info except users
export const getAllCompany = async (req, res) => {
  try {
    const companyGet = await company
      .find()
      .populate("name") // includes all fields of this object
      .populate("email") // includes all fields of this object
      .populate("phone") // includes all fields of this object
      .populate("city") // includes all fields of this object
      .populate("province") // includes all fields of this object
      .populate("country") // includes all fields of this object
      .where("deleted")
      .equals(false);
    res.status(200).json(companyGet);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// fetch all company info by company name
export const getCompanyByName = async (req, res) => {
  const name = req.params.id;
  try {
    const companyGet = await company
      .find()
      .where({ name: name })
      .populate("name") // includes all fields of this object
      .populate("email") // includes all fields of this object
      .populate("phone") // includes all fields of this object
      .populate("city") // includes all fields of this object
      .populate("province") // includes all fields of this object
      .populate("country") // includes all fields of this object
      .where("deleted")
      .equals(false);
    res.status(200).json(companyGet);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Get list of users of a company
export const getCompanyUsers = async (req, res) => {
  const name = req.params.id;
  try {
    const companyGet = await company
      .find()
      .where({ name: name })
      .populate("name") // includes all fields of this object
      .populate("email") // includes all fields of this object
      .populate("user.userId") // includes all fields of this object
      .where("deleted")
      .equals(false);
    res.status(200).json(companyGet);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// create company
export const createCompany = async (req, res) => {
  try {
    const companyToSave = req.body;
    const name = req.body.name;
    const companyName = await company
      .find({ name: { $regex: new RegExp(`^${name}$`, "i") } })
      .where("deleted")
      .equals(false);
    if (companyName.length > 0) {
      res.status(409).json({ error: "Duplicate Company!" });
    } else {
      const newCompany = new company(companyToSave);
      await newCompany.save();
      res.status(201).json(newCompany);
    }
  } catch (error) {
    res.json({ error: "Error, no company was created!" });
  }
};

// update Company
export const updateCompany = async (req, res) => {
  const id = req.params.id;
  try {
    const companyToUpdate = await company
      .findOne({ _id: id })
      .where("deleted")
      .equals(false);
    if (!companyToUpdate) {
      res.json({ error: "No company was found!" });
    } else {
      const updatedCompany = req.body;
      await companyToUpdate.updateOne(updatedCompany);
      await companyToUpdate.updateOne(
        { updatedAt: new Date() },
        { where: { _id: id } }
      );
      const companyUpdated = await company.findOne({ _id: id });
      res.status(200).json(companyUpdated);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Soft-deletion of documents in databases is an operation in which a flag is used
// to mark documents as deleted without erasing the data from the database.
export const deleteCompany = async (req, res) => {
  const id = req.params.id;
  try {
    const companyToDelete = await company
      .findOne({ _id: id })
      .where("deleted")
      .equals(false);
    if (!companyToDelete) {
      res.json({ error: "No Company was found!" });
    } else {
      await companyToDelete.updateOne(
        { deleted: true },
        { where: { _id: id } }
      );
      res.status(200).json("Company was deleted!");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
