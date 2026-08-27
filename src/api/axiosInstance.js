import axios from "axios";
import conf from "../conf/conf";
const axiosInstance = axios.create({
  baseURL: conf.apiURL || "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // token missing/expired/invalid — user is effectively logged out
      // don't redirect here directly; let the calling thunk/component decide,
      // but you could dispatch a logout action via a store import if you
      // set that up (careful with circular imports — see note below)
      console.warn("Unauthorized — session may have expired");
    }

    if (status === 500) {
      console.error("Server Error:", error.response?.data?.message);
    }

    if (!error.response) {
      console.error("Network error - is the backend running");
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
