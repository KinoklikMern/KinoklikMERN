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
      } else {
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

export const getAdminAnalytics = async (req, res) => {
  try {
    const requestingUser = await User.findById(req.user.id).select("role").lean();
    if (!requestingUser || requestingUser.role !== "Admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const [epkAgg, userAgg, topEPKs, topProfiles, roleBreakdown] = await Promise.all([
      fepk.aggregate([{
        $group: {
          _id: null,
          totalViews: { $sum: "$viewCount" },
          totalLikes: { $sum: { $size: "$likes" } },
          totalFavourites: { $sum: { $size: "$favourites" } },
          totalWishesToBuy: { $sum: { $size: "$wishes_to_buy" } },
        }
      }]),
      User.aggregate([{
        $group: {
          _id: null,
          totalProfileViews: { $sum: "$profileViews" },
          totalLikes: { $sum: { $size: "$likes" } },
          totalFollowers: { $sum: { $size: "$followers" } },
        }
      }]),
      fepk.find({}, { title: 1, viewCount: 1, likes: 1, favourites: 1, image_details: 1, status: 1 })
        .sort({ viewCount: -1 })
        .limit(8)
        .lean(),
      User.find({}, { firstName: 1, lastName: 1, role: 1, profileViews: 1, likes: 1, followers: 1, picture: 1 })
        .sort({ profileViews: -1 })
        .limit(8)
        .lean(),
      User.aggregate([{ $group: { _id: "$role", count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
    ]);

    res.json({
      epkStats: epkAgg[0] || { totalViews: 0, totalLikes: 0, totalFavourites: 0, totalWishesToBuy: 0 },
      userStats: userAgg[0] || { totalProfileViews: 0, totalLikes: 0, totalFollowers: 0 },
      topEPKs,
      topProfiles,
      roleBreakdown,
    });
  } catch (error) {
    console.error("Admin analytics error:", error);
    res.status(500).json({ message: "Failed to fetch analytics" });
  }
};