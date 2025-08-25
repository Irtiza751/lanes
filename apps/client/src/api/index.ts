import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  // baseURL: "/api/proxy",
  // baseURL: "/api/v1",
  withCredentials: true,
});
