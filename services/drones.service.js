import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/api/v1/admin-panel";

const fetchDrones = async (url, options = { method: "GET" }) => {
  const { method, data, params } = options;
  try {
    const response = await axios({
      url: `${BASE_URL}${url}`,
      method: method,
      headers: {},
      data: data,
      params: params,
    });

    const res = await response.data;
    return res;
  } catch (err) {
    return { error: err };
  }
};

export const getAllDrones = () => {
  return fetchDrones("/drones?per_page=10");
};

export const getDronesById = (id) => {
  return fetchDrones(`/drones/${id}`);
};

export const addDroneAPI = (obj) => {
  return fetchDrones("/drones", { method: "POST", data: obj });
};

export const editDrone = (id, obj) => {
  return fetchDrones(`/drones/${id}`, {
    method: "PUT",
    data: obj,
  });
};

export const deleteDrone = (id) => {
  return fetchDrones(`/drones/${id}`, { method: "DELETE" });
};

export const deleteMultipleDrones = (obj) => {
  return fetchDrones(`/drones`, {
    method: "DELETE",
    data: obj,
  });
};
