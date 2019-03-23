import axios from 'axios';

const baseURL = 'http://localhost:5000/api/v2';
let axiosInstance = axios.create({ baseURL });

export const setJwtToken = (token) => {
  axiosInstance = axios.create({
    baseURL,
    headers: { 'api-token': token },
  });
};

export const login = (email, password) =>
  axiosInstance
    .post('/users/login', { email, password })
    .then(response => response.data)
    .catch(error => {throw error.response.data})


export const getCode = number =>
  axiosInstance
    .post('/users/', { number })
    .then(response => response.data)
    .catch(error => {throw error.response.data})


export const verifyCode = (number, code) =>
  axiosInstance
    .post('/users/verify', { number, code })
    .then(response => response.data)
    .catch(error => {throw error.response.data})


export const refreshToken = () =>
  axiosInstance
    .post('/users/refresh', {})
    .then(response => response.data)
    .catch(error => {throw error.response.data})


export const register = (email, password) =>
  axiosInstance
    .post('/users/', { email, password, name: email })
    .then(response => response.data)
    .catch(error => {throw error.response.data})


export const getArticle = articleId =>
  axiosInstance
    .get(`/articles/${articleId}`)
    .then(response => response.data)
    .catch(error => {throw error.response.data})


export const createArticle = (title, owner) =>
  axiosInstance
    .post('/articles/', { title, owner })
    .then(response => response.data)
    .catch(error => {throw error.response.data})


export const patchArticle = (articleId, articleObject) =>
  axiosInstance
    .patch(`/articles/${articleId}`, articleObject)
    .then(response => response.data)
    .catch(error => {throw error.response.data})


export const getArticlesByProperty = property =>
  axiosInstance
    .get(`/articles/by_property/${property}`)
    .then(response => response.data)
    .catch(error => {throw error.response.data})


export const createComment = (articleId, contents) =>
  axiosInstance
    .post('/comments/', {
      contents,
      article_uid: articleId,
    })
    .then(response => response.data)
    .catch(error => {throw error.response.data})


export const hideComment = commentId =>
  axiosInstance
    .post(`/comments/hide/${commentId}`, {})
    .then(response => response.data)
    .catch(error => {throw error.response.data})


export const showComment = commentId =>
  axiosInstance
    .post(`/comments/show/${commentId}`, {})
    .then(response => response.data)
    .catch(error => {throw error.response.data})


// TODO REDUNDANT
// export const getComments = articleId =>
//  axiosInstance
//     .get(`/comments/${articleId}`)
//     .then(response => response.data)
//     .catch(error => {throw error.response.data})
// );

export const postComment = (articleId, text) =>
  axiosInstance
    .post('/comments/', {
      contents: text,
      article_external_id: articleId,
    })
    .then(response => response.data)
    .catch(error => {throw error.response.data})

export const voteOnComment = (uid, type) =>
  axiosInstance
    .post(`/comments/vote/${uid}`, { type })
    .then(response => response.data)
    .catch(error => {throw error.response.data})

window.addComment = postComment;
