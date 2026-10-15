import axiosInstance from "./axiosInstance";

export const createOrder = (orderData) =>
  axiosInstance.post("orders", orderData);
export const getMyOrders = () => axiosInstance.get("orders/myorders");
export const getOrderById = (orderId) => axiosInstance.get(`orders/${orderId}`);
export const updateOrderToPaid = (orderId, paymentResult) =>
  axiosInstance.put(`orders/${orderId}/pay`, paymentResult);

export const updateOrderToDelivered = (orderId) =>
  axiosInstance.put(`orders/admin/${orderId}/status`);

export const getAllOrders = () => axiosInstance.get("orders/admin");
