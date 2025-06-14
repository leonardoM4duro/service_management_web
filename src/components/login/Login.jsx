import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalDialog from '../shared/modal/ModalDialog';
import { login } from './api.js';
import { useAuth } from '../../hooks/useAuth';
import './Login.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [resultDialogMsg, setResultDialogMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, login: authLogin } = useAuth();

  // Redirecionar se já estiver logado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/clientes');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const credentials = { email, password };
      const response = await login(credentials);
      
      // Usar o método login do hook useAuth
      authLogin(response.access_token, response.refresh_token);
      
      setResultDialogMsg("Login realizado com sucesso!");
      setShowResultDialog(true);
      
      // Redirecionar após fechar o modal
      setTimeout(() => {
        navigate('/clientes');
      }, 1500);
      
    } catch (error) {
      setResultDialogMsg(error.message || "Erro ao realizar login.");
      setShowResultDialog(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResultDialogOk = () => {
    setShowResultDialog(false);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h3>Login</h3>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Nome de usuário</label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Senha</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>        <div className="d-grid gap-2">
          <button 
            type="submit" 
            className="btn btn-success app-btn" 
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </div>
      </form>
      <ModalDialog
        show={showResultDialog}
        title={resultDialogMsg}
        onOk={handleResultDialogOk}
        okText="Ok"
      />
    </div>
  );
}

export default Login;
