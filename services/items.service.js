import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/api/v1/admin-panel";

const fetchItems = async (url, options = { method: "GET" }) => {
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

export const getAllItems = () => {
  return fetchItems("/items?per_page=10");
};

export const getItemsById = (id) => {
  return fetchItems(`/items/${id}`);
};

export const addItemAPI = (obj) => {
  return fetchItems("/items", { method: "POST", data: obj });
};

export const editItems = (id, obj) => {
  return fetchItems(`/items/${id}`, {
    method: "PUT",
    data: obj,
  });
};

export const deleteItem = (id) => {
  return fetchItems(`/items/${id}`, { method: "DELETE" });
};

export const deleteMultipleItems = (obj) => {
  return fetchItems(`/items`, {
    method: "DELETE",
    data: obj,
  });
};
