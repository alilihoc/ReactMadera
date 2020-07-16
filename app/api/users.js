import client from "./client";

const endpoint = "/users";

const getUserByMAil = (mail) => client.get(endpoint + "/?email=" + mail);

export default {
  getUserByMAil,
};
