import mongoose from "mongoose";

const invitationSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 30,
    minlength: 3,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 30,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
  },
  invitedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "fepk",
    required: true,
  },
  picture: {
    type: String,
    trim: true,
    default:
      "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643844376/avatars/default_pic_jeaybr.png",
  },
  role: {
    type: String,
    required: true,
    enum: [
      "Actor",
      "Director",
      "Editor",
      "Producer",
      "Cinematographer",
      "Sound",
      "Writer",
    ],
  },
  status: {
    type: String,
    default: "Invited",
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const invitation = mongoose.model("invitation", invitationSchema);

export default invitation;
