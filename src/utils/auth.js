
export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  return !!token;
};

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('refreshToken');
  window.location.href = '/';
};

// Função para verificar se o token está expirado (opcional - depende da implementação do backend)
export const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    return true;
  }
};