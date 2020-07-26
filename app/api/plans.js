import client from "./client";

const endpoint = "/plans";
const getPlanById = (id) => client.get(endpoint + "/" + id);

export default {
  getPlanById,
};
