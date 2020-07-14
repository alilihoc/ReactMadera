import client from "./client";

const endpoint = "/customers";
const getCustomer = (id) => client.get(endpoint + "/" + id);

export default {
  getCustomer,
};
