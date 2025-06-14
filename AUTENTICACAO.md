# Sistema de Autenticação com Token

Este projeto implementa um sistema robusto de autenticação usando tokens JWT (JSON Web Tokens) para proteger as APIs.

## Funcionalidades Implementadas

### 1. Interceptor de Requisições Axios
- **Localização**: `src/utils/axiosConfig.js`
- **Função**: Adiciona automaticamente o token de autenticação no cabeçalho `Authorization` de todas as requisições
- **Formato**: `Bearer <token>`

### 2. Gerenciamento Automático de Tokens
- **Armazenamento**: Tokens são armazenados no `localStorage`
  - `authToken`: Token de acesso principal
  - `refreshToken`: Token para renovação automática
- **Renovação**: Sistema verifica automaticamente se o token está próximo do vencimento
- **Interceptor de Resposta**: Detecta respostas 401 e redireciona para login

### 3. Hooks de Autenticação

#### `useAuth`
- **Localização**: `src/hooks/useAuth.js`
- **Funcionalidades**:
  - Verificar status de autenticação
  - Fazer login e logout
  - Gerenciar estados de carregamento

#### `useTokenManager`
- **Localização**: `src/hooks/useTokenManager.js`
- **Funcionalidades**:
  - Verificação periódica de expiração de tokens (a cada 5 minutos)
  - Renovação automática de tokens
  - Limpeza automática de tokens inválidos

### 4. Utilitários de Autenticação
- **Localização**: `src/utils/auth.js`
- **Funcções**:
  - `getAuthToken()`: Obter token atual
  - `getRefreshToken()`: Obter refresh token
  - `isTokenExpired()`: Verificar se token está expirado
  - `logout()`: Fazer logout completo

## Como Usar

### Configuração das APIs
Todas as APIs já estão configuradas para usar automaticamente o token:

```javascript
// Exemplo: src/components/client/api.js
import { clientsApi } from '../../utils/axiosConfig';

export const getClients = async () => {
  const response = await clientsApi.get('/clients'); // Token adicionado automaticamente
  return response.data;
};
```

### Uso nos Componentes
```javascript
import { useAuth } from '../hooks/useAuth';

function MeuComponente() {
  const { isAuthenticated, login, logout } = useAuth();
  
  // O token é gerenciado automaticamente
  // Não precisa adicionar manualmente em requisições
}
```

## Fluxo de Autenticação

1. **Login**: Usuário faz login → Token é armazenado no localStorage
2. **Requisições**: Todas as chamadas de API incluem automaticamente o token
3. **Verificação**: Sistema verifica periodicamente se token está válido
4. **Renovação**: Se token está próximo do vencimento, renova automaticamente
5. **Logout**: Se token é inválido ou renovação falha, usuário é redirecionado para login

## Vantagens da Implementação

1. **Automática**: Não precisa adicionar token manualmente em cada requisição
2. **Centralizada**: Toda lógica de autenticação em um local
3. **Robusta**: Gerencia automaticamente expiração e renovação
4. **Segura**: Remove tokens inválidos automaticamente
5. **Reutilizável**: Fácil de usar em qualquer componente

## Estrutura de Arquivos

```
src/
├── utils/
│   ├── axiosConfig.js     # Configuração centralizada do Axios
│   └── auth.js            # Utilitários de autenticação
├── hooks/
│   ├── useAuth.js         # Hook principal de autenticação
│   └── useTokenManager.js # Gerenciamento automático de tokens
└── components/
    ├── client/api.js      # API de clientes (com token automático)
    ├── user/api.js        # API de usuários (com token automático)
    └── login/api.js       # API de login
```

## Configuração de Ambiente

Para diferentes ambientes, configure a variável:
```
REACT_APP_API_URL=http://localhost:8000
```

O sistema usará automaticamente esta URL como base para todas as requisições autenticadas.
