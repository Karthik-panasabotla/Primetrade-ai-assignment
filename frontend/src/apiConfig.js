const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : "https://primetrade-backend-oki0.onrender.com/api";

export default BASE_URL;
