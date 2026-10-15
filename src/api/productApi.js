import axiosInstance from "./axiosInstance";

export const getAllProducts = (params) => axiosInstance.get("products", { params });
export const getProductById = (id) => axiosInstance.get(`products/${id}`);
export const createProductReview = (productId, data) => axiosInstance.post(`products/${productId}/reviews`, data);

export const getAdminProducts = () => axiosInstance.get("products/admin/all");
export const createProduct = (data) => axiosInstance.post("products/admin/create", data);
export const updateProduct = (id, data) => axiosInstance.put(`products/admin/${id}`, data);
export const deleteProduct = (id) => axiosInstance.delete(`products/admin/${id}`);
export const deleteProductReview = (productId, reviewId) => axiosInstance.delete(`products/admin/${productId}/reviews/${reviewId}`);