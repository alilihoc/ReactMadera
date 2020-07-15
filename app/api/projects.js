import client from "./client";

const endpoint = "/projects";
const getProjects = (id, search) =>
  client.get(endpoint + "?user=" + id + "&name=" + search);

export const addProject = (project, onUploadProgress) => {
  const data = {
    name: project.name,
    dateEnd: project.dateEnd,
    customer: {
      firstname: project.firstname,
      lastname: project.lastname,
      email: project.email,
      phone: project.phone,
    },
    user: "/api/users/2",
  };
  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};
export default {
  getProjects,
  addProject,
};
