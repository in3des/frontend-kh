import http from "../http-common";
import authHeader from './auth-header';

const getAll = () => {
  return http.get("/cities", { headers: authHeader() });
};

const get = (id) => {
  return http.get(`/cities/${id}`, { headers: authHeader() });
};

const create = (data) => {
  return http.post("/cities", data, { headers: authHeader() });
};

const update = (id, data) => {
  return http.put(`/cities/${id}`, data, { headers: authHeader() });
};

const remove = (id) => {
  return http.delete(`/cities/${id}`, { headers: authHeader() });
};

const removeAll = () => {
  return http.delete(`/cities`, { headers: authHeader() });
};

const findByTitle = (title) => {
  return http.get(`/cities?title=${title}`, { headers: authHeader() });
};

const TutorialService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default TutorialService;
