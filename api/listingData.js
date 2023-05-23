import { clientCredentials } from '../utils/client';

const baseUrl = clientCredentials.databaseURL;

const getListings = (uid) => new Promise((resolve, reject) => {
  fetch(`${baseUrl}/listings.json?orderBy="uid"&equalTo="${uid}"`, {
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

const createListing = (payload) => new Promise((resolve, reject) => {
  fetch(`${baseUrl}/listings.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      const setcode = { firebaseKey: data.name };
      fetch(`${baseUrl}/listings/${setcode.firebaseKey}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(setcode),
      }).then(resolve);
    })
    .catch(reject);
});

const updateListing = (listingObj) => new Promise((resolve, reject) => {
  fetch(`${baseUrl}/listings/${listingObj.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(listingObj),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteListing = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${baseUrl}/listings/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleListing = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${baseUrl}/listings/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getListings, createListing, updateListing, deleteListing, getSingleListing,
};
