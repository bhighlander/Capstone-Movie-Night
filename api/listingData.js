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

const createListing = (listingObj) => new Promise((resolve, reject) => {
  fetch(`${baseUrl}/listings.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(listingObj),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateListing = (payload) => new Promise((resolve, reject) => {
  fetch(`${baseUrl}/listings/${payload.firebaseKey}.json`, {
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

const getListingComments = (listingFirebaseKey) => new Promise((resolve, reject) => {
  fetch(`${baseUrl}/comments.json?orderBy="listingId"&equalTo="${listingFirebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteSingleListing = (firebaseKey) => new Promise((resolve, reject) => {
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

export {
  getListings, createListing, updateListing, getSingleListing, getListingComments, deleteSingleListing,
};
