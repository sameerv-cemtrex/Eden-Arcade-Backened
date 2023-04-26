import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/api/v1/admin-panel";

const fetchUniqueItems = async (url, options = { method: "GET" }) => {
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

export const getAllUniqueItems = () => {
  return fetchUniqueItems(`/unique-items`);
};

export const getUniqueItemsById = (id) => {
  return fetchUniqueItems(`/unique-items/${id}`);
};

export const addUniqueItem = (obj) => {
  return fetchUniqueItems("/unique-items", { method: "POST", data: obj });
};

export const editUniqueItem = (id, obj) => {
  return fetchUniqueItems(`/unique-items/${id}`, {
    method: "PUT",
    data: obj,
  });
};

export const deleteUniqueItem = (id) => {
  return fetchUniqueItems(`/unique-items/${id}`, { method: "DELETE" });
};

export const deleteMultipleUniqueItems = (obj) => {
  return fetchUniqueItems(`/unique-items`, {
    method: "DELETE",
    data: obj,
  });
};
