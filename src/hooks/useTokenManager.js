import { useState, useEffect, useCallback } from 'react';
import { refreshToken as refreshTokenApi } from '../components/login/api';
import { getAuthToken, getRefreshToken, isTokenExpired } from '../utils/auth';

export const useTokenManager = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Função para verificar se o token precisa ser renovado
  const checkTokenExpiration = useCallback(async () => {
    const token = getAuthToken();
    const refreshToken = getRefreshToken();

    if (!token || !refreshToken) {
      return false;
    }

    // Verificar se o token está próximo do vencimento (5 minutos antes)
    if (isTokenExpired(token)) {
      try {
        setIsRefreshing(true);
        const response = await refreshTokenApi(refreshToken);
        
        // Atualizar tokens no localStorage
        localStorage.setItem('authToken', response.access_token);
        if (response.refresh_token) {
          localStorage.setItem('refreshToken', response.refresh_token);
        }
        
        return true;
      } catch (error) {
        // Se falhou ao renovar, limpar tokens e redirecionar para login
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/';
        return false;
      } finally {
        setIsRefreshing(false);
      }
    }

    return true;
  }, []);

  // Verificar token periodicamente (a cada 5 minutos)
  useEffect(() => {
    const interval = setInterval(() => {
      checkTokenExpiration();
    }, 5 * 60 * 1000); // 5 minutos

    // Verificar imediatamente ao montar o componente
    checkTokenExpiration();

    return () => clearInterval(interval);
  }, [checkTokenExpiration]);

  return {
    isRefreshing,
    checkTokenExpiration
  };
};
