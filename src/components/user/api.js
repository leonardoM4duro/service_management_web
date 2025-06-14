import { usersApi } from '../../utils/axiosConfig';

export const getUsers = async () => {
  const response = await usersApi.get('/users');
  return response.data;
};

export const getUserById = async (id) => {
  const response = await usersApi.get(`/user/${id}`);
  return response.data;
};

export const createUser = async (data) => {
  const response = await usersApi.post('/user', data);
  return response.data;
};

export const updateUser = async (data) => {
  const response = await usersApi.put('/user', data);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await usersApi.delete(`/user/${id}`);
  return response.data;
};
