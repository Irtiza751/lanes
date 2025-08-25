import axios from "axios";

export const api = axios.create({
  // baseURL: "/api/proxy",
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
});
