import axios from "axios";
const AxiosInstance = axios.create({
  baseURL: `https://mahmoudali0.pythonanywhere.com/api/`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosInstance;
