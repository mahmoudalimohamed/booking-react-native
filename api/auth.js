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

export const LogoutApi = async (refreshToken, accessToken) => {
  return axios.post(
    `${baseURL}logout/`,
    { refresh: refreshToken },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
};

export const RefreshAccessTokenApi = async (refreshToken) => {
  return axios.post(`${baseURL}token/refresh/`, { refresh: refreshToken });
};

export const ForgotPasswordApi = async (email) => {
  return axios.post(`${baseURL}password_reset/`, { email });
};

export const ResetPasswordApi = async (token, uid, password) => {
  return axios.post(`${baseURL}password_reset/confirm/`, {
    token,
    uid,
    password,
  });
};
