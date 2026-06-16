import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:2401/api"
  baseURL: "https://personalworktracker.vercel.app/"
});

export default api;