import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/api/v1/admin-panel";

const fetchCollectables = async (url, options = { method: "GET" }) => {
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

export const getAllCollectables = () => {
  return fetchCollectables(`/collectable-items`);
};

export const getCollectablesById = (id) => {
  return fetchCollectables(`/collectable-items/${id}`);
};

export const addCollectableItem = (obj) => {
  return fetchCollectables("/collectable-items", { method: "POST", data: obj });
};

export const editCollectableItem = (id, obj) => {
  return fetchCollectables(`/collectable-items/${id}`, {
    method: "PUT",
    data: obj,
  });
};

export const deleteCollectableItem = (id) => {
  return fetchCollectables(`/collectable-items/${id}`, { method: "DELETE" });
};

export const deleteMultipleCollectables = (obj) => {
  return fetchCollectables(`/collectable-items`, {
    method: "DELETE",
    data: obj,
  });
};
