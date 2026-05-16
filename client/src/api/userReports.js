import axios from "axios";

const base = process.env.REACT_APP_BACKEND_URL;

const authHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const uploadReportScreenshot = async (file, token) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axios.post(`${base}/userreports/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
  });
  return res.data.key;
};

export const submitUserReport = async (reportData, token) => {
  const res = await axios.post(`${base}/userreports`, reportData, authHeaders(token));
  return res.data;
};

export const fetchReports = async ({ type, status, priority, sort, page, limit } = {}, token) => {
  const params = {};
  if (type && type !== "all") params.type = type;
  if (status && status !== "all") params.status = status;
  if (priority) params.priority = priority;
  if (sort) params.sort = sort;
  if (page) params.page = page;
  if (limit) params.limit = limit;
  const res = await axios.get(`${base}/userreports`, { params, ...authHeaders(token) });
  return res.data;
};

export const fetchReportById = async (id, token) => {
  const res = await axios.get(`${base}/userreports/${id}`, authHeaders(token));
  return res.data;
};

export const patchReport = async (id, data, token) => {
  const res = await axios.patch(`${base}/userreports/${id}`, data, authHeaders(token));
  return res.data;
};

export const deleteReport = async (id, token) => {
  const res = await axios.delete(`${base}/userreports/${id}`, authHeaders(token));
  return res.data;
};

export const respondToReport = async (id, message, token) => {
  const res = await axios.post(`${base}/userreports/${id}/respond`, { message }, authHeaders(token));
  return res.data;
};
