import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/api/v1/admin-panel";

const fetchAttachments = async (url, options = { method: "GET" }) => {
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

export const getAllAttachments = () => {
  return fetchAttachments("/gun-attachments");
};

export const getAttachmentsById = (id) => {
  return fetchAttachments(`/gun-attachments/${id}`);
};

export const addAttachment = (obj) => {
  return fetchAttachments("/gun-attachments", { method: "POST", data: obj });
};

export const editAttachment = (id, obj) => {
  return fetchAttachments(`/gun-attachments/${id}`, {
    method: "PUT",
    data: obj,
  });
};

export const deleteAttachment = (id) => {
  return fetchAttachments(`/gun-attachments/${id}`, { method: "DELETE" });
};

export const deleteMultipleAttachments = (obj) => {
  return fetchAttachments(`/gun-attachments`, {
    method: "DELETE",
    data: obj,
  });
};
