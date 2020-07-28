import client from "./client";

const endpoint = "/quotationHtml";
const getHtmlByID = (id) => client.get(endpoint + "/" + id);

export default {
  getHtmlByID,
};
