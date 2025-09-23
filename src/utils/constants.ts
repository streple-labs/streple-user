export const base_url =
  process.env.API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:4000";
export const dev_url =
  process.env.APP_DEV_URL || process.env.NEXT_PUBLIC_APP_DEV_URL;
export const live_url =
  process.env.APP_VERCEL_URL || process.env.NEXT_PUBLIC_APP_VERCEL_URL;

export const RE_DIGIT = new RegExp(/^\d+$/);
