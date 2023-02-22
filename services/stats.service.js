import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchWeapons = async (url, options = { method: "GET" }) => {
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

export const getAllCategoryStats = (category) => {
  return fetchWeapons(`/adminPanel/getAllData/${category}`);
};

export const addCategoryStat = (category, obj) => {
  return fetchWeapons(`/adminPanel/addData/${category}`, {
    method: "POST",
    data: obj,
  });
};

export const getCategoryStatById = (category, id) => {
  return fetchWeapons(`/adminPanel/getAllData/${id}/${category}`);
};

export const editCategoryStat = (category, id, obj) => {
  return fetchWeapons(`/adminPanel/editData/${id}/${category}`, {
    method: "POST",
    data: obj,
  });
};

export const deleteSingleStat = (category, id) => {
  return fetchWeapons(`/adminPanel/deleteData/${id}/${category}`, {
    method: "POST",
  });
};

export const deleteMutipleStats = (category, obj) => {
  return fetchWeapons(`/adminPanel/deleteAllData/${category}`, {
    method: "POST",
    data: obj,
  });
};
