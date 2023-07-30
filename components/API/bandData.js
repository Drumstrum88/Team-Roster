import { clientCredentials } from '../../utils/client';

const endpoint = clientCredentials.databaseURL;

const getBands = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/bands.json?orderBy="uid"&equalTo="${uid}"`, {
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

const deleteBand = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/bands/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleBand = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/bands/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createBand = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/bands.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      const firebaseKey = data.name;
      resolve(firebaseKey);
    })
    .catch((error) => {
      reject(error);
    });
});

const updateBand = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/bands/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getBandMembers = (bandFirebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}members.json?orderBy="bandFirebaseKey"&equalTo="${bandFirebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const members = Object.values(data);
      resolve(members);
    })
    .catch(reject);
});

export {

  getBands,
  deleteBand,
  getSingleBand,
  createBand,
  updateBand,
  getBandMembers,

};
