import axios from "axios";
import { server_dev_url } from "../utils/SD";

export default axios.create({
  baseURL: server_dev_url,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: server_dev_url,
  headers: { "Content-Type": "application/json", Authorization: "" },
  withCredentials: true,
});

