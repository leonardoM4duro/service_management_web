import { clientsApi } from '../../utils/axiosConfig';

export const getClients = async () => {
  const response = await clientsApi.get('/clients');
  return response.data;
};

export const getClientById = async (id) => {
  const response = await clientsApi.get(`/client/${id}`);
  return response.data;
};

export const createClient = async (data) => {
  const response = await clientsApi.post('/client', data);
  return response.data;
};

export const updateClient = async (id, data) => {
  const response = await clientsApi.put(`/client/${id}`, data);
  return response.data;
};

export const deleteClient = async (id) => {
  const response = await clientsApi.delete(`/client/${id}`);
  return response.data;
};
