import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = Cookies.get("userToken");
  console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log(config);
  }
  return config;
});
export default instance;
