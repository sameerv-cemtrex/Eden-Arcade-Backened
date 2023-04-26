import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/api/v1/admin-panel";

const fetchConsumables = async (url, options = { method: "GET" }) => {
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

export const getAllConsumables = () => {
  return fetchConsumables(`/consumable-items`);
};

export const getConsumablesById = (id) => {
  return fetchConsumables(`/consumable-items/${id}`);
};

export const addConsumableItem = (obj) => {
  return fetchConsumables("/consumable-items", { method: "POST", data: obj });
};

export const editConsumableItem = (id, obj) => {
  return fetchConsumables(`/consumable-items/${id}`, {
    method: "PUT",
    data: obj,
  });
};

export const deleteConsumableItem = (id) => {
  return fetchConsumables(`/consumable-items/${id}`, { method: "DELETE" });
};

export const deleteMultipleConsumables = (obj) => {
  return fetchConsumables(`/consumable-items`, {
    method: "DELETE",
    data: obj,
  });
};
