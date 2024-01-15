import nodemailer from "nodemailer";
import Invitation from "../models/Invitation.js";
import invitation from "../models/Invitation.js";

// create a transporter object using SMTP
const transport = nodemailer.createTransport({
  host: "smtp.gmail.com", // replace with your SMTP server address
  port: 465, // replace with your SMTP server port
  secure: true, // use SSL
  auth: {
    user: "info@kinoklik.ca", // replace with your email address
    pass: "kzhotugyiukkxjex", // replace with your email password
  },
});

// verify connection configuration
transport.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

export const saveInvitation = async (req, res) => {
  try {
    const invitationToSave = req.body;

    const newInvitation = new Invitation(invitationToSave);
    await newInvitation.save();
    res.status(201).json(newInvitation);
  } catch (error) {
    res.json({ error: "Error, no invitation was saved!" });
  }
};

//SEND INVITATION -------------------------------------

// export const sendInvitation = async (req, res) => {
//   const { email, invitedBy, movie, role, firstName, lastName } = req.body;

//   if (!email) return res.status(404).json({ message: "email is missing!" });

//   // Direct link to your signup page
//   const signUpLink = `http://localhost:3000/signup`;

//   // Send the invitation email
//   transport.sendMail({
//     from: "info@kinoklik.com",
//     to: email, // Directly use the provided email
//     subject: "Invitation to Join Kinoklik",
//     html: `
//       <h2>${firstName} ${lastName}, You're Invited!</h2>
//       <p>Hey, You have been invited by ${invitedBy} to register in the Kinoklikk app in connection with participation in the project named "${movie}" in role of ${role}. To do so, please follow the link below:</p>
//       <a href='${signUpLink}'>Register Now</a>
//     `,
//   });

//   res.status(200).json({ message: "Invitation sent to the provided email!" });
// };

//send invitation + save it
export const sendInvitation = async (req, res) => {
  const { email, invitedByName, movieTitle, role, firstName, lastName } =
    req.body;

  if (!email) return res.status(404).json({ message: "email is missing!" });

  // Direct link to the signup page
  //const signUpLink = `http://localhost:3000/signup`;

  //production
  const signUpLink = `https://www.kinoklik.ca/signup`;

  // Save the invitation
  try {
    const newInvitation = new Invitation(req.body); // Assuming that the body of the request contains all necessary fields for the invitation model.
    await newInvitation.save();

    // Send the invitation email
    transport.sendMail({
      from: "info@kinoklik.com",
      to: email, // Directly use the provided email
      subject: "Invitation to Join Kinoklik",
      html: `
        <h2>${firstName} ${lastName}, You're Invited!</h2>
        <p>Hey, You have been invited by ${invitedByName} to register in the Kinoklikk app in connection with participation in the project named "${movieTitle}" in role of ${role}. To do so, please follow the link below:</p>
        <a href='${signUpLink}'>Register Now</a>
      `,
    });

    res
      .status(200)
      // .json({ message: "Invitation sent to the provided email and saved!" });
      .json(newInvitation);
  } catch (error) {
    res.json({ error: "Error, no invitation was saved!" });
  }
};

//---------------------------------------------------

export const getInvitationByFilmmakerMovie = async (req, res) => {
  const { movie, invitedBy } = req.query;

  try {
    const invitations = await Invitation.find()
      .where({
        invitedBy: invitedBy,
        movie: movie,
      })
      .populate("invitedBy") // includes all fields of this object
      .populate("movie"); // includes all fields of this object
    res.status(200).json(invitations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getInvitationByFilmmakerMovieEmail = async (req, res) => {
  const { movie, invitedBy, email } = req.query;

  try {
    const invitation = await Invitation.find()
      .where({
        invitedBy: invitedBy,
        movie: movie,
        email: email,
      })
      .populate("invitedBy") // includes all fields of this object
      .populate("movie"); // includes all fields of this object
    res.status(200).json(invitation);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteInvitation = async (req, res) => {
  const { movie, invitedBy, email } = req.body;

  try {
    const invitation = await Invitation.findOneAndDelete({
      invitedBy: invitedBy,
      movie: movie,
      email: email,
    });

    if (invitation) {
      res.status(200).json(invitation);
    } else {
      res.status(404).json({ message: "Invitation not found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
