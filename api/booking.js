import axios from "axios";

const BASE_URL = `https://mahmoudali0.pythonanywhere.com/api/`;

const BASE_URL1 = `http://127.0.0.1:8000/api/`;

const ngrok = `https://e0c4-196-128-218-48.ngrok-free.app/api/`;

export const locationsyApi = async () => {
  return axios.get(`${ngrok}locations/`);
};

export const tripSearchApi = async (params) => {
  return axios.get(`${ngrok}trips/search/`, {
    params,
  });
};
