import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/api/v1/admin-panel";

const fetchDomeSales = async (url, options = { method: "GET" }) => {
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

export const getAllDomeSales = () => {
  return fetchDomeSales("/dome-sales");
};

export const getDomeSalesById = (id) => {
  return fetchDomeSales(`/dome-sales/${id}`);
};

export const addDomeSaleItems = (obj) => {
  return fetchDomeSales("/dome-sales", { method: "POST", data: obj });
};

export const editDomeSaleItem = (id, obj) => {
  return fetchDomeSales(`/dome-sales/${id}`, {
    method: "PUT",
    data: obj,
  });
};

export const deleteDomeSaleItem = (id) => {
  return fetchDomeSales(`/dome-sales/${id}`, { method: "DELETE" });
};

export const deleteMultipleDomeSaleItems = (obj) => {
  return fetchDomeSales(`/dome-sales`, {
    method: "DELETE",
    data: obj,
  });
};
