import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/api/v1/admin-panel";

const fetchTraits = async (url, options = { method: "GET" }) => {
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

export const getAllHumanTraits = () => {
  return fetchTraits("/human-gun-traits");
};

export const getHumanTraitsById = (id) => {
  return fetchTraits(`/human-gun-traits/${id}`);
};

export const addHumanTraits = (obj) => {
  return fetchTraits("/human-gun-traits", { method: "POST", data: obj });
};

export const editHumanTrait = (id, obj) => {
  return fetchTraits(`/human-gun-traits/${id}`, {
    method: "PUT",
    data: obj,
  });
};

export const deleteHumanTrait = (id) => {
  return fetchTraits(`/human-gun-traits/${id}`, { method: "DELETE" });
};
