import axios from 'axios';
import { authApi } from '../../utils/axiosConfig';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Endpoint para realizar login
export const login = async (credentials) => {
  try {
    // Criar FormData para OAuth2PasswordRequestForm
    const formData = new URLSearchParams();
    formData.append('username', credentials.email);
    formData.append('password', credentials.password);

    const response = await axios.post(`${API_BASE_URL}/auth/login`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error('Credenciais inválidas');
    }
    throw new Error(error.message || 'Erro ao realizar login');
  }
};

// Endpoint para renovar o token de acesso
export const refreshToken = async (refreshToken) => {
  try {
    const response = await authApi.post('/refresh', {
      refresh_token: refreshToken
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error('Erro ao renovar token');
    }
    throw new Error(error.message || 'Erro ao renovar token');
  }
};

// Endpoint para obter informações do usuário autenticado
export const getCurrentUser = async () => {
  try {
    const response = await authApi.get('/me');
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error('Erro ao obter dados do usuário');
    }
    throw new Error(error.message || 'Erro ao obter dados do usuário');
  }
};