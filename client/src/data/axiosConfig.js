import axios from "axios";
import { server_production_url } from "../utils/SD";

export default axios.create({
  // baseURL: server_dev_url,
  baseURL: server_production_url,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  // baseURL: server_dev_url,
  baseURL: server_production_url,
  headers: { "Content-Type": "application/json", Authorization: "" },
  withCredentials: true,
});

