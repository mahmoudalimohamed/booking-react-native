import axios from "axios";

const baseURL = `https://mahmoudali0.pythonanywhere.com/api/`;

export const RegisterApi = async (data) => {
  return axios.post(`${baseURL}register/`, data);
};

export const LoginApi = async (email, password) => {
  return axios.post(`${baseURL}login/`, {
    email,
    password,
  });
};

export const logoutApi = async (refreshToken, accessToken) => {
  return axios.post(
    `${baseURL}logout/`,
    { refresh: refreshToken },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
};

export const refreshAccessTokenApi = async (refreshToken) => {
  return axios.post(`${baseURL}token/refresh/`, { refresh: refreshToken });
};

export const forgotPasswordApi = async (email) => {
  return axios.post(`${baseURL}password_reset/`, { email });
};

export const resetPasswordApi = async (token, uid, password) => {
  return axios.post(`${baseURL}password_reset/confirm/`, {
    token,
    uid,
    password,
  });
};
