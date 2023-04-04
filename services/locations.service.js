import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/api/v1/admin-panel";

const fetchLocations = async (url, options = { method: "GET" }) => {
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

export const getAllLocations = () => {
  return fetchLocations("/locations");
};

export const getLocationById = (id) => {
  return fetchLocations(`/locations/${id}`);
};

export const addLocation = (obj) => {
  return fetchLocations("/locations", { method: "POST", data: obj });
};

export const editLocation = (id, obj) => {
  return fetchLocations(`/locations/${id}`, {
    method: "PUT",
    data: obj,
  });
};

export const deleteLocation = (id) => {
  return fetchLocations(`/locations/${id}`, { method: "DELETE" });
};

export const deleteMultipleLocations = (obj) => {
  return fetchLocations(`/locations`, {
    method: "DELETE",
    data: obj,
  });
};
