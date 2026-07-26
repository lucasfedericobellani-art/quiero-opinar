const SITE_URL = "https://www.quieroopinar.com";

const allowedOrigins = new Set([
  SITE_URL,
  "https://quieroopinar.com",
  "https://quieroopinar.com.ar",
  "https://www.quieroopinar.com.ar",
  "https://quiero-opinar.vercel.app",
  "http://localhost:3000",
  "http://localhost:5173"
]);

module.exports = {
  SITE_URL,
  allowedOrigins
};
