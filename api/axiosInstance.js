import axios from "axios";
const AxiosInstance = axios.create({
  baseURL: `https://5e85-196-128-218-48.ngrok-free.app/api/`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosInstance;
