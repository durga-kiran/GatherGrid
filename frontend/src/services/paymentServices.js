
import api from "./api";

const createPaymentOrder = async (bookingId) => {
  const response = await api.post("/payments/create-order", {
    bookingId,
  });

  return response.data;
};

const completeMockPayment = async (paymentId, outcome) => {
  const response = await api.post("/payments/mock/complete", {
    paymentId,
    outcome,
  });

  return response.data;
};

const paymentService = {
  createPaymentOrder,
  completeMockPayment,
};

export default paymentService;
