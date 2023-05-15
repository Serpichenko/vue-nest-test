import axios from 'axios';

export function createUser(user) {
  return axios.post('/users', user).then(response => response.data)
    .catch(err => Promise.reject(err));
}

export function getUsersList(payload) {
  return axios.get('/users', {params: payload}).then(response => response.data)
    .catch(err => Promise.reject(err));
}

export function updateUserById(id, user) {
  return axios.patch(`/users/${id}`, user).then(response => response.data)
    .catch(err => Promise.reject(err));
}

export function deleteUserById(id) {
  return axios.delete(`/users/${id}`).then(response => response.data)
    .catch(err => Promise.reject(err));
}