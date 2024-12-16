import axios from "axios";
export const baseURL = "http://20.244.94.203:8081";
export const httpClient = axios.create({
  baseURL: baseURL,
});
