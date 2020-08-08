import client from "./client";

const endpoint = "/quotationHtml";
const getHtmlByID = (id) => client.get(endpoint + "/" + id);

const QuotationEndpoint = "/quotations";
const EditQuotationState = (id, state) => {
  const data = {
    state,
  };

  return client.put(QuotationEndpoint + "/" + id, data);
};

export default {
  getHtmlByID,
  EditQuotationState,
};
