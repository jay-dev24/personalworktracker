import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:2401/api"
});

export default api;