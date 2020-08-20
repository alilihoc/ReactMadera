import client from "./client";

const endpoint = "/recent_payments";
const getRecentPayments = () => client.get(endpoint);

const insertRecentPayments = (projectId, customerId, amount) => {
  const data = {
    amount: amount,
    paymentDate: new Date(),
    customer: "/api/customers/" + customerId,
    project: "/api/projects/" + projectId,
  };

  return client.post(endpoint, data);
};

export default {
  getRecentPayments,
  insertRecentPayments,
};
