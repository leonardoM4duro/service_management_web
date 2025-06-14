# Sistema de Gerenciamento de Serviços

Um sistema web moderno desenvolvido em React para gerenciamento de clientes e usuários, com sistema completo de autenticação e autorização.

## 🚀 Tecnologias Utilizadas

- **React** 19.1.0 - Framework principal
- **React Router DOM** 7.6.0 - Roteamento
- **Bootstrap** 5.3.6 - Interface e responsividade
- **Axios** 1.9.0 - Requisições HTTP
- **React IMask** 7.6.1 - Máscaras de entrada
- **JWT** - Autenticação via tokens

## 📋 Funcionalidades

### Sistema de Autenticação
- Login seguro com tokens JWT
- Renovação automática de tokens
- Proteção de rotas privadas
- Interceptor automático para requisições autenticadas
- Redirecionamento automático em caso de sessão expirada

### Gerenciamento de Clientes
- ✅ Listagem de clientes
- ✅ Cadastro de novos clientes
- ✅ Edição de clientes existentes
- ✅ Interface responsiva e intuitiva

### Gerenciamento de Usuários
- ✅ Listagem de usuários do sistema
- ✅ Cadastro de novos usuários
- ✅ Edição de usuários existentes
- ✅ Controle de permissões

### Interface
- 🎨 Design moderno com Bootstrap
- 📱 Layout responsivo
- 🗂️ Menu lateral navegável
- 🔄 Modais para ações específicas
- 📊 Listagens organizadas e filtráveis

## 🏗️ Estrutura do Projeto

```
src/
├── components/
│   ├── client/          # Componentes de gerenciamento de clientes
│   │   ├── ClientsList.jsx
│   │   ├── ClientRegister.jsx
│   │   └── api.js
│   ├── user/            # Componentes de gerenciamento de usuários
│   │   ├── UsersList.jsx
│   │   ├── UserRegister.jsx
│   │   └── api.js
│   ├── login/           # Sistema de autenticação
│   │   ├── Login.jsx
│   │   ├── Login.css
│   │   └── api.js
│   └── shared/          # Componentes compartilhados
│       ├── Icons.jsx
│       ├── ModalDialog.jsx
│       ├── ProtectedRoute.jsx
│       └── menu/
├── hooks/               # Hooks customizados
│   ├── useAuth.js
│   └── useTokenManager.js
├── utils/               # Utilitários
│   ├── auth.js
│   └── axiosConfig.js
├── context/             # Context API
└── main.jsx             # Ponto de entrada da aplicação
```

## 🛠️ Instalação

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos para instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd app-service-management
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   - Crie um arquivo `.env` na raiz do projeto
   - Configure a URL base da API:
   ```env
   REACT_APP_API_URL=http://localhost:8000
   ```

4. **Execute a aplicação**
   ```bash
   npm start
   ```

A aplicação estará disponível em `http://localhost:3000`

## 📦 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm build` - Gera build de produção
- `npm test` - Executa os testes
- `npm eject` - Ejeta a configuração do Create React App

## 🔐 Sistema de Autenticação

O projeto implementa um sistema robusto de autenticação com as seguintes características:

### Funcionalidades de Segurança
- **Tokens JWT**: Autenticação baseada em tokens seguros
- **Refresh Token**: Renovação automática de sessões
- **Interceptor HTTP**: Inclusão automática de tokens nas requisições
- **Proteção de Rotas**: Rotas protegidas que requerem autenticação
- **Logout Automático**: Redirecionamento em caso de token inválido

### Fluxo de Autenticação
1. Usuário faz login com credenciais
2. Sistema retorna token de acesso e refresh token
3. Tokens são armazenados no localStorage
4. Interceptor adiciona token em todas as requisições
5. Sistema renova automaticamente tokens próximos do vencimento

## 🎨 Interface do Usuário

### Características da UI
- **Design Responsivo**: Compatível com desktop, tablet e mobile
- **Bootstrap 5**: Framework CSS moderno para estilização
- **Menu Lateral**: Navegação intuitiva entre módulos
- **Modais**: Para ações de confirmação e formulários
- **Feedback Visual**: Indicadores de carregamento e status

### Componentes Principais
- **SideMenu**: Menu de navegação lateral
- **ModalDialog**: Componente de modal reutilizável
- **ProtectedRoute**: Wrapper para rotas autenticadas
- **Icons**: Biblioteca de ícones personalizada

## 🔧 Configuração da API

O projeto está configurado para trabalhar com uma API REST. Configure a URL base no arquivo de ambiente:

```env
REACT_APP_API_URL=http://localhost:8000
```

### Endpoints Esperados
- `POST /auth/login` - Autenticação
- `POST /auth/refresh` - Renovação de token
- `GET /clients` - Listagem de clientes
- `POST /clients` - Cadastro de cliente
- `PUT /clients/:id` - Atualização de cliente
- `GET /users` - Listagem de usuários
- `POST /users` - Cadastro de usuário
- `PUT /users/:id` - Atualização de usuário

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte ou dúvidas sobre o projeto, entre em contato através dos issues do repositório.

---

