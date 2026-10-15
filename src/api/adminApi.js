import axiosInstance from "./axiosInstance";

export const getAllUsers = () => axiosInstance.get("admin/user");
export const getUserById = (userId) => axiosInstance.get(`admin/user/${userId}`);
export const updateUserRole = (userId, data) => axiosInstance.put(`admin/user/${userId}/role`, data);
export const deleteUser = (userId) => axiosInstance.delete(`admin/user/${userId}`); 