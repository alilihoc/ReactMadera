import client from "./client";
import quotationsApi from "./quotation";

const endpoint = "/customers";

const getOrCreatePayment = (id) => client.get("/getOrCreatePayment/" + id);

const editPaymentState = async (payment, step, quotationID) => {
  const nbStateStepLabel = "step" + step.index + "State";
  const nbStepDateLabel = "step" + step.index + "DatePaiement";

  let data = new Object();
  data[nbStateStepLabel] = true;
  data[nbStepDateLabel] = new Date();
  data["percent"] = parseInt(payment.percent) + parseInt(step.percent);

  quotationsApi.EditQuotationState(quotationID, 4);
  return client.put("payments/" + payment.id, data);
};

export default {
  getOrCreatePayment,
  editPaymentState,
};
