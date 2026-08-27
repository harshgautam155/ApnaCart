import axiosInstance from "./axiosInstance";

export const registerUser = (data) => axiosInstance.post("user/register",data);
export const verifyOtp = (data) => axiosInstance.post("user/verify",data);
export const resendOtp = (data) => axiosInstance.post("user/resend-otp",data);
export const loginUser = (data) => axiosInstance.post("user/login",data);
export const logoutUser = () => axiosInstance.post("user/logout",);
export const updateUser = (data) => axiosInstance.put("user/profile",data);
export const fetchCurrentUser = () => axiosInstance.get("user/profile",);
export const delelteUser = () => axiosInstance.delete("user/delete",);