import express from "express";

import {
  getInvitationByFilmmakerMovie,
  saveInvitation,
  sendInvitation,
  getInvitationByFilmmakerMovieEmail,
  deleteInvitation,
} from "../controllers/invitations.js";

const router = express.Router();

router.get("/get-invitation-by-filmmaker-movie", getInvitationByFilmmakerMovie);

router.get(
  "/get-invitation-by-filmmaker-movie-email",
  getInvitationByFilmmakerMovieEmail
);

router.delete("/delete-invitation", deleteInvitation);

router.post("/save-invitation", saveInvitation);

router.post("/send-invitation", sendInvitation);

export default router;
