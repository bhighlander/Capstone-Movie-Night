import { clientCredentials } from '../utils/client';

const baseUrl = clientCredentials.databaseURL;

const getWatchGroups = () => new Promise((resolve, reject) => {
  fetch(`${baseUrl}/watchGroup.json`, {
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

const createWatchGroup = (watchGroupObj) => new Promise((resolve, reject) => {
  fetch(`${baseUrl}/watchGroup.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(watchGroupObj),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateWatchGroup = (payload) => new Promise((resolve, reject) => {
  fetch(`${baseUrl}/watchGroup/${payload.firebaseKey}.json`, {
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

const getGroupListings = (groupId) => new Promise((resolve, reject) => {
  fetch(`${baseUrl}/listings.json?orderBy="groupId"&equalTo="${groupId}"`, {
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

export {
  getWatchGroups, createWatchGroup, updateWatchGroup, getGroupListings,
};
