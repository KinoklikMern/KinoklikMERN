import http from '../http-common';

/**
 * Fetches follower counts for given user IDs and sums them across platforms.
 *
 * @async
 * @param {*} userIds 
 * @returns {Promise<{ platforms: { facebook: number, instagram: number, twitter: number, linkedin: number, youtube: number, tiktok: number, newsletter: number }, total: number }>}
 */
export const fetchAndSumFollowers = async (userIds) => {
  const ids = Array.isArray(userIds) ? userIds : [userIds];
  const platformTotals = {
    facebook: 0,
    instagram: 0,
    twitter: 0,
    linkedin: 0,
    youtube: 0,
    tiktok: 0,
    newsletter: 0 
  };

  for (const id of ids) {
    if (!id) continue;
    
    try {
      const res = await http.get(`/users/getfollower/${id}`);
      const followers = res.data;
      platformTotals.newsletter += parseInt(followers.newsletter, 10) || 0; 
      platformTotals.facebook += parseInt(followers.facebook_followers || followers.facebook || 0, 10) || 0;
      platformTotals.instagram += parseInt(followers.instagram_followers || followers.instagram || 0, 10) || 0;
      platformTotals.twitter += parseInt(followers.twitter_followers || followers.twitter || 0, 10) || 0;
      platformTotals.tiktok += parseInt(followers.tiktok_followers || followers.tiktok || 0, 10) || 0;
      platformTotals.linkedin += parseInt(followers.linkedin_followers || followers.linkedin || followers.linkedIn || 0, 10) || 0;
      platformTotals.youtube += parseInt(followers.youtube_subs || followers.youtube || 0, 10) || 0;
    } catch (error) {
      console.error(`Failed to fetch followers for user ${id}:`, error.message);
    }
  }
  const totalFollowers = 
    platformTotals.facebook + 
    platformTotals.instagram + 
    platformTotals.twitter + 
    platformTotals.tiktok +
    platformTotals.linkedin +
    platformTotals.youtube +
    platformTotals.newsletter; 

  return {
    platforms: platformTotals,
    total: totalFollowers
  };
};