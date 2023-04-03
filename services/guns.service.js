import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/api/v1/admin-panel";

const fetchGuns = async (url, options = { method: "GET" }) => {
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

export const getAllGuns = () => {
  return fetchGuns("/guns");
};

export const getGunsById = (id) => {
  return fetchGuns(`/guns/${id}`);
};

export const addGun = (obj) => {
  return fetchGuns("/guns", { method: "POST", data: obj });
};

export const editGun = (id, obj) => {
  return fetchGuns(`/guns/${id}`, {
    method: "PUT",
    data: obj,
  });
};

export const deleteGun = (id) => {
  return fetchGuns(`/guns/${id}`, { method: "DELETE" });
};

export const deleteMultipleGuns = (obj) => {
  return fetchGuns(`/guns`, {
    method: "DELETE",
    data: obj,
  });
};
