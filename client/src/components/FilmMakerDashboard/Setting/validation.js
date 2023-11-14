export const validatename = (name) => {
  const nameRegex = /^[^\s]+$/;
  return nameRegex.test(name);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^\d{10,15}$/;
  return phone === '' || phoneRegex.test(phone);
};

export const validateWebsite = (website) => {
  const websiteRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-zA-Z0-9]+([-.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  return website === '' || websiteRegex.test(website);
};
  
export const validateFollowers = (followers) => {
  const followersRegex = /^(\d+([kK])?)?$/; 
  return followers === '' || followersRegex.test(followers);
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email === '' || emailRegex.test(email);
};


export const cityInfo = {
  Montreal: { province: 'Quebec', country: 'Canada' },
  Toronto: { province: 'Ontario', country: 'Canada' },
  'New York': { province: 'New York', country: 'USA' },
  Other: { province: 'Other', country: 'Other' },
};