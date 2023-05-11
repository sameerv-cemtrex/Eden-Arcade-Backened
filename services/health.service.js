import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/api/v1/admin-panel";

const fetchHealth = async (url, options = { method: "GET" }) => {
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

export const getHealth = () => {
  return fetchHealth("/health");
};

export const editHealth = (id, obj) => {
  return fetchHealth(`/health/${id}`, {
    method: "PUT",
    data: obj,
  });
};
