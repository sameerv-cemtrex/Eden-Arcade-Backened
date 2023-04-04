import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/api/v1/admin-panel";

const fetchTask = async (url, options = { method: "GET" }) => {
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

export const getAllTasks = () => {
  return fetchTask("/tasks?");
};

export const getTasksById = (id) => {
  return fetchTask(`/tasks/${id}`);
};

export const addTasks = (obj) => {
  return fetchTask("/tasks", { method: "POST", data: obj });
};

export const editTask = (id, obj) => {
  return fetchTask(`/tasks/${id}`, {
    method: "PUT",
    data: obj,
  });
};

export const deleteTask = (id) => {
  return fetchTask(`/tasks/${id}`, { method: "DELETE" });
};

export const deleteMultipleTasks = (obj) => {
  return fetchTask(`/tasks`, {
    method: "DELETE",
    data: obj,
  });
};
