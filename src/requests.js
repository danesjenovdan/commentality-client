import axios from 'axios';

const baseURL = 'http://localhost:5000/api/v2';
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
    .then(response => resolve(response.data))
    .catch(error => reject(error.response.data)),
);

export const getCode = number => new Promise(
  (resolve, reject) => axiosInstance
    .post('/users/', { number })
    .then(response => resolve(response.data))
    .catch(error => reject(error.response.data)),
);

export const verifyCode = (number, code) => new Promise(
  (resolve, reject) => axiosInstance
    .post('/users/verify', { number, code })
    .then(response => resolve(response.data))
    .catch(error => reject(error.response.data)),
);

export const refreshToken = () => new Promise(
  (resolve, reject) => axiosInstance
    .post('/users/refresh', {})
    .then(response => resolve(response.data))
    .catch(error => reject(error.response.data)),
);

export const register = (email, password) => new Promise(
  (resolve, reject) => axiosInstance
    .post('/users/', { email, password, name: email })
    .then(response => resolve(response.data))
    .catch(error => reject(error.response.data)),
);

export const getArticle = articleId => new Promise(
  (resolve, reject) => axiosInstance
    .get(`/articles/${articleId}`)
    .then(response => resolve(response.data))
    .catch(error => reject(error.response.data)),
);

export const createArticle = (title, owner) => new Promise(
  (resolve, reject) => axiosInstance
    .post('/articles/', { title, owner })
    .then(response => resolve(response.data))
    .catch(error => reject(error.response.data)),
);

export const patchArticle = (articleId, articleObject) => new Promise(
  (resolve, reject) => axiosInstance
    .patch(`/articles/${articleId}`, articleObject)
    .then(response => resolve(response.data))
    .catch(error => reject(error.response.data)),
);

export const getArticlesByProperty = property => new Promise(
  (resolve, reject) => axiosInstance
    .get(`/articles/by_property/${property}`)
    .then(response => resolve(response.data))
    .catch(error => reject(error.response.data)),
);

export const createComment = (articleId, contents) => new Promise(
  (resolve, reject) => axiosInstance
    .post('/comments/', {
      contents,
      article_uid: articleId,
    })
    .then(response => resolve(response.data))
    .catch(error => reject(error.response.data)),
);

export const hideComment = commentId => new Promise(
  (resolve, reject) => axiosInstance
    .post(`/comments/hide/${commentId}`, {})
    .then(response => resolve(response.data))
    .catch(error => reject(error.response.data)),
);

export const showComment = commentId => new Promise(
  (resolve, reject) => axiosInstance
    .post(`/comments/show/${commentId}`, {})
    .then(response => resolve(response.data))
    .catch(error => reject(error.response.data)),
);

// TODO REDUNDANT
// export const getComments = articleId => new Promise(
//   (resolve, reject) => axiosInstance
//     .get(`/comments/${articleId}`)
//     .then(response => resolve(response.data))
//     .catch(error => reject(error.response.data)),
// );

export const postComment = (articleId, text) => new Promise(
  (resolve, reject) => axiosInstance
    .post('/comments/', {
      contents: text,
      article_external_id: articleId,
    })
    .then(response => resolve(response.data))
    .catch(error => reject(error.response.data)),
);

export const voteOnComment = (uid, type) => new Promise(
  (resolve, reject) => axiosInstance
    .post(`/comments/vote/${uid}`, { type })
    .then(response => resolve(response.data))
    .catch(error => reject(error.response.data)),
);

window.addComment = postComment;
