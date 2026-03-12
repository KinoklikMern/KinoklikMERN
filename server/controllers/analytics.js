import crypto from "crypto";
import User from "../models/User.js";
import fepk from "../models/fepk.js"; 
import ViewTracker from "../models/ViewTracker.js";

/**
 * Express controller to track a view for an EPK, Actor, or Filmmaker profile. 
 * Uses a combination of VIP Cookies and a hashed fallback (IP + User Agent) 
 * to prevent duplicate views from the same user within a 24-hour period. 
 * Updates the appropriate view count and sets a cookie to optimize future tracking.
 *
 * @async
 * @function trackUniversalView
 * @param {import('express').Request} req - Express request object. Expects `targetId` and `targetType` in `req.body`, and parses cookies from headers.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} Terminates the request-response cycle by sending a JSON response indicating success or failure.
 */
export const trackUniversalView = async (req, res) => {
  try {
    const { targetId, targetType } = req.body;

    if (!targetId || !targetType) {
      return res.status(400).json({ success: false, message: "Missing targetId or targetType" });
    }

    //  Check for the Cookie
    let viewerHash = req.cookies ? req.cookies[`viewed_${targetId}`] : null;

    //  Hash Fallback (IP + User Agent)
    if (!viewerHash) {
      const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown-ip';
      const userAgent = req.headers['user-agent'] || 'unknown-ua';
      viewerHash = crypto.createHash('sha256').update(`${rawIp}-${userAgent}-${targetId}`).digest('hex');
    }

    // Check the Guestbook using BOTH the ID and the Type
    const alreadyViewed = await ViewTracker.findOne({ targetId, targetType, viewerHash });

    if (!alreadyViewed) {
      //  Add them to the Guestbook
      await ViewTracker.create({ targetId, targetType, viewerHash });

      // THE SWITCH: Update the correct profile based on the Type
      if (targetType === 'EPK') {
        await fepk.findByIdAndUpdate(targetId, { $inc: { viewCount: 1 } });
        //TODO: add view tracking for others profile types if needed
      } else if (targetType === 'ACTOR' || targetType === 'FILMMAKER') {
        await User.findByIdAndUpdate(targetId, { $inc: { profileViews: 1 } });
      }
      //  Drop the 24-hour cookie on user browser
      res.cookie(`viewed_${targetId}`, viewerHash, {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' // Required for cross-origin cookie setting in modern browsers
      });
    }
    // Always return a 200 so the frontend doesn't throw errors
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Tracking error:", error);
    res.status(200).json({ success: false, message: "Tracked silently failed" });
  }
};