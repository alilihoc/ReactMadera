import moment from "moment";

const getCreationDate = (item) => {
  return (
    moment(item.creationDate).format("MMM D, YYYY") +
    " - " +
    moment(item.dateEnd).format("MMM D, YYYY")
  );
};

const getCardName = (item) => {
  return item.name + " - " + getUserFullName(item.customer);
};

const getUserFullName = (item) => {
  return item ? item.firstname + " " + item.lastname : null;
};

const getNbProjectsRow = (projects) => {
  let nbProjects = getArrayLength(projects);
  let isPlural = true;
  if (nbProjects == 1) {
    isPlural = false;
  }
  return nbProjects + (isPlural ? " projects" : " project");
};

const getArrayLength = (projects) => {
  if (Array.isArray(projects)) {
    return projects.length;
  }
};

const getDateFormatted = (date) => {
  if (date == "") return null;
  return moment(date).format("MMM D, YYYY");
};

const parseData = (data) => {
  return typeof data == "string" ? JSON.parse(data) : null;
};

const ctoUpperCase = (string) => {
  return typeof string == "string" ? string.toUpperCase() : null;
};

const getFormattedDate = (date) => {
  return moment(date).format("MMM D, YYYY");
};

const getQuotationState = (state) => {
  switch (state) {
    case 0:
      return "Not generated";
    case 1:
      return "Waiting answer";
    case 2:
      return "Declines";
    case 3:
      return "Accepted";
    case 4:
      return "In order";
    default:
      return null;
  }
};

const getItemPrice = (price) => {
  var parts = price.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
};

const isQuotationGenerated = (quotation) => {
  return quotation == undefined ? null : quotation.state >= 1;
};

const getGammeLabel = (plan) => {
  return plan.gamme == undefined ? null : plan.gamme.label;
};

const getModuleSubtitle = (module) => {
  const type = module.type.label;
  let price = getItemPrice(module.price);

  return `Type: ${type}\nPrice: ${price} $`;
};

const isQuotationWaitingAnswer = (quotation) => {
  return quotation == undefined ? null : quotation.state == 1;
};

export default {
  getUserFullName,
  getCreationDate,
  getCardName,
  getNbProjectsRow,
  getDateFormatted,
  parseData,
  ctoUpperCase,
  getFormattedDate,
  isQuotationGenerated,
  getItemPrice,
  getQuotationState,
  getGammeLabel,
  getModuleSubtitle,
  isQuotationWaitingAnswer,
};
