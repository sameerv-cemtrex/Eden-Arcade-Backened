import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/api/v1/admin-panel";

const fetchTaskGivers = async (url, options = { method: "GET" }) => {
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

export const getAllTaskGivers = () => {
  return fetchTaskGivers("/task-givers?per_page=10&sort=priority&order=asc");
};

export const getTaskGiversById = (id) => {
  return fetchTaskGivers(`/task-givers/${id}`);
};

export const addTaskGivers = (obj) => {
  return fetchTaskGivers("/task-givers", { method: "POST", data: obj });
};

export const editTaskGivers = (id, obj) => {
  return fetchTaskGivers(`/task-givers/${id}`, {
    method: "PUT",
    data: obj,
  });
};

export const deleteTaskGiver = (id) => {
  return fetchTaskGivers(`/task-givers/${id}`, { method: "DELETE" });
};
