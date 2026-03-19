import http from "../http-common"; 

/**
 * Sends a silent ping to the backend to track a unique profile view.
 * * @param {string} targetId - The MongoDB _id of the EPK, Actor, or Filmmaker.
 * @param {string} targetType - The type of profile being viewed ('EPK', 'ACTOR', 'FILMMAKER').
 */
const trackView = (targetId, targetType) => {
  return http.post("/analytics/track-view", {
    targetId,
    targetType
  }, {
    withCredentials: true // Allows the tracking cookies to be sent and received
  });
};

const AnalyticsDataService = {
  trackView
};

export default AnalyticsDataService;