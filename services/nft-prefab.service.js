import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/api/v1/admin-panel";

const fetchNFTPrefabs = async (url, options = { method: "GET" }) => {
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

export const getAllNFTPrefabs = () => {
  return fetchNFTPrefabs("/nft-prefabs");
};

export const getNFTPrefabsById = (id) => {
  return fetchNFTPrefabs(`/nft-prefabs/${id}`);
};

export const addNFTPrefab = (obj) => {
  return fetchNFTPrefabs("/nft-prefabs", { method: "POST", data: obj });
};

export const editNFTPrefab = (id, obj) => {
  return fetchNFTPrefabs(`/nft-prefabs/${id}`, {
    method: "PUT",
    data: obj,
  });
};

export const deleteNFTPrefab = (id) => {
  return fetchNFTPrefabs(`/nft-prefabs/${id}`, { method: "DELETE" });
};

export const deleteMultipleNFTPrefabs = (obj) => {
  return fetchNFTPrefabs(`/nft-prefabs`, {
    method: "DELETE",
    data: obj,
  });
};
