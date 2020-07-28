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

const getDueDate = (date) => {
  if (date == "") return null;
  return moment(date).format("MMM D, YYYY");
};

const parseData = (data) => {
  return data != undefined ? JSON.parse(data) : null;
};

const ctoUpperCase = (string) => {
  return typeof string == "string" ? string.toUpperCase() : null;
};

export default {
  getUserFullName,
  getCreationDate,
  getCardName,
  getNbProjectsRow,
  getDueDate,
  parseData,
  ctoUpperCase,
};
