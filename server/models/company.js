import mongoose from "mongoose";

const companySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  user: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  deleted: {
    type: Boolean,
    default: false,
  },
});
// Mongoose will assume there is a collection called the plural of this name (i.e., 'company' in this case).
const Company = mongoose.model("company", companySchema);

export default Company;
