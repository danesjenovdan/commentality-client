import axios from 'axios';

const baseURL = 'http://0.0.0.0:5000/api/v1';
let axiosInstance = axios.create({ baseURL });

export const setJwtToken = (token) => {
  axiosInstance = axios.create({
    baseURL,
    headers: { 'api-token': token },
  });
};

export const login = (email, password) => new Promise(
  (resolve, reject) => axiosInstance
    .post('/users/login', { email, password })
    .then(response => resolve(response.data.jwt_token))
    .catch(error => reject(error.response.data)),
);

export const getArticle = articleId => new Promise(
  (resolve, reject) => axiosInstance
    .get(`/articles/${articleId}`)
    .then(response => resolve(response.data))
    .catch(error => reject(error.response.data)),
);

export const postComment = contents => new Promise(
  (resolve, reject) => axiosInstance
    .post('/comments/', { contents })
    .then(response => resolve(response.data))
    .catch(error => reject(error.response.data)),
);
