import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = "https://mahmoudali0.pythonanywhere.com/api";

const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem("access");
  return { Authorization: `Bearer ${token}` };
};

export const userProfileApi = async () => {
  const headers = await getAuthHeaders();
  return axios.get(`${BASE_URL}/profile/`, {
    headers,
  });
};

export const tripBookingApi = async (tripId) => {
  const headers = await getAuthHeaders();
  return axios.get(`${BASE_URL}/trips/${tripId}/book/`, {
    headers,
  });
};

export const postTripBookingApi = async (tripId, bookingData) => {
  const headers = await getAuthHeaders();
  return axios.post(`${BASE_URL}/trips/${tripId}/book/`, bookingData, {
    headers,
  });
};

export const confirmTripBookingApi = async (
  tripId,
  tempBookingRef,
  confirmationData
) => {
  const headers = await getAuthHeaders();
  return axios.post(
    `${BASE_URL}/trips/${tripId}/confirm/${tempBookingRef}/`,
    confirmationData,
    { headers }
  );
};

export const fetchPaymentKeyApi = async (orderId) => {
  const headers = await getAuthHeaders();
  return axios.get(`${BASE_URL}/get_payment_key/${orderId}/`, {
    headers,
  });
};

export const redirectToPaymentApi = (paymentKey) => {
  const url = `https://accept.paymob.com/api/acceptance/iframes/908347?payment_token=${paymentKey}`;
  return url;
};

export const bookingDetailApi = async (orderId) => {
  const headers = await getAuthHeaders();
  const url = `${BASE_URL}/bookings/detail/${orderId}/`;
  return axios.get(url, {
    headers,
  });
};

export const cancelBookingApi = async (bookingId) => {
  const headers = await getAuthHeaders();
  return axios.post(
    `${BASE_URL}/bookings/${bookingId}/cancel/`,
    {},
    {
      headers,
    }
  );
};

export const fetchProfileApi = async (page) => {
  const token = await AsyncStorage.getItem("access");
  if (!token) {
    throw new Error("No access token found");
  }
  return axios.get(`${BASE_URL}/profile/?page=${page}&limit=5`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
