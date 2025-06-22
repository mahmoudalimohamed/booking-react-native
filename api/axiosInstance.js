import axios from "axios";
const AxiosInstance = axios.create({
  baseURL: `https://de78-196-128-218-48.ngrok-free.app/api/`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosInstance;
