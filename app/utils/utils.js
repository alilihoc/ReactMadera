import moment from "moment";

const getCreationDate = (item) => {
  return (
    moment(item.creationDate).format("MMM D, YYYY") +
    " - " +
    moment(item.dateEnd).format("MMM D, YYYY")
  );
};

const getCardName = (item) => {
  return item.name + " - " + getUserFullName(item);
};

const getUserFullName = (item) => {
  return item.customer.firstname + " " + item.customer.lastname;
};

const getCustomerProjectsRow = (customer) => {
  let nbProjects = getArrayLength(customer.projects);
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

export default {
  getUserFullName,
  getCreationDate,
  getCardName,
  getCustomerProjectsRow,
};
