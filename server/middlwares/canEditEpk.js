import fepk from "../models/fepk.js";
import { authUser } from "./auth.js";

export const canEditEpk = async (req, res, next) => {
  const id = req.params.epkId || req.params.id;
  const userId = (req.user._id || req.user.id).toString();

  try {
    const epk = await fepk.findById(id).where("deleted").equals(false);
    if (!epk) return res.status(404).json({ message: "EPK not found" });

    const isOwner = epk.film_maker.toString() === userId;
    const isCollaborator = epk.collaborators?.some(
      (c) => c.user.toString() === userId
    );

    if (!isOwner && !isCollaborator) {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.epk = epk;
    req.isOwner = isOwner;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};