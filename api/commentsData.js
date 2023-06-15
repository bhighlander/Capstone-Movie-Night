import { clientCredentials } from '../utils/client';

const baseUrl = clientCredentials.databaseURL;

const getComments = () => new Promise((resolve, reject) => {
  fetch(`${baseUrl}/comments.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createComment = (commentObj) => new Promise((resolve, reject) => {
  fetch(`${baseUrl}/comments.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentObj),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateComment = (payload) => new Promise((resolve, reject) => {
  fetch(`${baseUrl}/comments/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteComment = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${baseUrl}/comments/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleComment = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${baseUrl}/comments/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getComments, createComment, updateComment, deleteComment, getSingleComment,
};
