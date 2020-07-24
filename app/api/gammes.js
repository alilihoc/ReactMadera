import client from "./client";

const endpoint = "/gammes";

const getAlls = () => client.get(endpoint);

export default {
  getAlls,
};
