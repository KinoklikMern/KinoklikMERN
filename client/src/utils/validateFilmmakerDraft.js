const URL_RE = /^(https?:\/\/|www\.)\S+/i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9\s+\-().]+$/;

const SOCIAL_URL_FIELDS = [
  'facebook_url', 'instagram_url', 'twitter_url',
  'tiktok_url', 'youtube_url', 'linkedin_url',
];

const FOLLOWER_FIELDS = [
  'facebook_followers', 'instagram_followers', 'twitter_followers',
  'tiktok_followers', 'youtube_subs', 'linkedin_followers',
];

export function validateFilmmakerDraft(draft) {
  const errors = {};

  // ── Hero ─────────────────────────────────────────────────────────────────
  const firstName = draft?.firstName?.trim() || '';
  const lastName  = draft?.lastName?.trim()  || '';

  if (!firstName)
    errors.firstName = 'First name is required';
  else if (firstName.length < 2 || firstName.length > 30)
    errors.firstName = 'First name must be 2–30 characters';

  if (!lastName)
    errors.lastName = 'Last name is required';
  else if (lastName.length < 2 || lastName.length > 30)
    errors.lastName = 'Last name must be 2–30 characters';

  if (draft?.city && draft.city.length > 50)
    errors.city = 'City must be under 50 characters';

  if (draft?.country && draft.country.length > 50)
    errors.country = 'Country must be under 50 characters';

  // ── Bio ──────────────────────────────────────────────────────────────────
  if (draft?.aboutMe && draft.aboutMe.length > 2000)
    errors.aboutMe = `Biography is too long (${draft.aboutMe.length}/2000)`;

  // ── Social URLs ──────────────────────────────────────────────────────────
  for (const field of SOCIAL_URL_FIELDS) {
    const val = draft?.[field]?.trim();
    if (val && !URL_RE.test(val))
      errors[field] = 'Enter a valid URL (e.g. https://... or www....)';
  }

  // ── Follower counts ──────────────────────────────────────────────────────
  for (const field of FOLLOWER_FIELDS) {
    const val = draft?.[field];
    if (val !== '' && val !== null && val !== undefined) {
      const num = Number(String(val).replace(/,/g, ''));
      if (isNaN(num) || num < 0) errors[field] = 'Must be a positive number';
    }
  }

  // ── Contact ──────────────────────────────────────────────────────────────
  const email   = draft?.email?.trim();
  const website = draft?.website?.trim();
  const phone   = draft?.phone?.trim();

  if (email && !EMAIL_RE.test(email))
    errors.email = 'Must be a valid email address';

  if (website && !URL_RE.test(website))
    errors.website = 'Enter a valid URL (e.g. https://... or www....)';

  if (phone && !PHONE_RE.test(phone))
    errors.phone = 'Phone can only contain digits, spaces, +, -, and ()';

  return errors;
}

export const ERROR_LABELS = {
  firstName:            'First Name',
  lastName:             'Last Name',
  city:                 'City',
  country:              'Country',
  aboutMe:              'Biography',
  facebook_url:         'Facebook URL',
  instagram_url:        'Instagram URL',
  twitter_url:          'Twitter/X URL',
  tiktok_url:           'TikTok URL',
  youtube_url:          'YouTube URL',
  linkedin_url:         'LinkedIn URL',
  facebook_followers:   'Facebook Followers',
  instagram_followers:  'Instagram Followers',
  twitter_followers:    'Twitter/X Followers',
  tiktok_followers:     'TikTok Followers',
  youtube_subs:         'YouTube Subscribers',
  linkedin_followers:   'LinkedIn Followers',
  email:                'Email',
  website:              'Website',
  phone:                'Phone',
};

export const SECTION_FIELDS = {
  hero:    ['firstName', 'lastName', 'city', 'country'],
  bio:     ['aboutMe'],
  social:  ['facebook_url', 'instagram_url', 'twitter_url', 'tiktok_url', 'youtube_url', 'linkedin_url',
            'facebook_followers', 'instagram_followers', 'twitter_followers', 'tiktok_followers', 'youtube_subs', 'linkedin_followers'],
  contact: ['email', 'website', 'phone'],
};

export function firstErrorSection(errors) {
  for (const [section, fields] of Object.entries(SECTION_FIELDS)) {
    if (fields.some((f) => errors[f])) return section;
  }
  return 'hero';
}
