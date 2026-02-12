import axios from "axios";

export const productApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
