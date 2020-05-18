import axios from "axios";

const api = axios.create({
  baseURL: "http://52.67.93.34:3333",
});

export default api;
