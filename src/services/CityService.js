import http from "../http-common";
import authHeader from './auth-header';

const getAll = () => {
  return http.get('cities', { headers: authHeader() });
};

const get = (id) => {
  return http.get(`cities/${id}`, { headers: authHeader() });
};

const update = (id, data) => {
  return http.put(`cities/${id}`, data, { headers: authHeader() });
};

const findByTitle = (title) => {
  return http.get(`cities?title=${title}`, { headers: authHeader() });
};



// const API_URL = 'http://localhost:8080/api/v1/';
//
// const getAll = () => {
//   return http.get(API_URL + 'cities');
// };
//
// const get = (id) => {
//   return http.get(API_URL + `cities/${id}`);
// };
//
// const update = (id, data) => {
//   return http.put(API_URL + `cities/${id}`, data);
// };
//
// const findByTitle = (title) => {
//   return http.get(API_URL + `cities?title=${title}`);
// };

const CityService = {
  getAll,
  get,
  update,
  findByTitle,
};

export default CityService;
