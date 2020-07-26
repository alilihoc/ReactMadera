import client from "./client";
import projects from "./projects";

const endpoint = "/getAllModulesType";
const getAll = () => client.get(endpoint);

const modulesEndpoint = "/modules";

const AddOrEditdModule = (module, onUploadProgress) => {
  const data = {
    name: module.name,
    length: parseFloat(module.length),
    width: parseFloat(module.width),

    structure: module.structure
      ? "/api/structures/" + module.structure.id
      : null,
    finition: module.finition ? "/api/finitions/" + module.finition.id : null,
    coverage: module.coverage ? "/api/coverages/" + module.coverage.id : null,
    type: module.type ? "/api/types/" + module.type.id : null,
    floor: module.floor ? "/api/floors/" + module.floor.id : null,
    isolation: module.isolation
      ? "/api/isolations/" + module.isolation.id
      : null,
    plan: "/api/plans/" + module.planId,
  };

  if (module.moduleId) {
    return client.put(modulesEndpoint + "/" + module.moduleId, data, {
      onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total),
    });
  } else {
    return client.post(modulesEndpoint, data, {
      onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total),
    });
  }
};

const deleteModule = (id) => {
  return client.delete(modulesEndpoint + "/" + id);
};

export default {
  getAll,
  AddOrEditdModule,
  deleteModule,
};
