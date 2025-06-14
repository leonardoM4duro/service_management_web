import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, deleteUser } from "./api";
import ModalDialog from '../shared/modal/ModalDialog';

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [resultDialogMsg, setResultDialogMsg] = useState("");

  useEffect(() => {
    getUsers()
      .then(data => {
        console.log('Dados recebidos:', data);
        if (data.success) {
          setUsers(data.data);
        } else {
          setUsers([]);
        }
      })
      .catch(error => {
        setUsers([]);
        console.error('Erro ao buscar os dados:', error);
      });
  }, []);

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    setShowDeleteDialog(false);
    deleteUser(userToDelete.id)
      .then(data => {
        if (data.success) {
          setUsers(users.filter(user => user.id !== userToDelete.id));
          setResultDialogMsg("Usuário excluído com sucesso!");
        } else {
          setResultDialogMsg("Erro ao excluir o usuário.");
        }
        setShowResultDialog(true);
      })
      .catch(error => {
        setResultDialogMsg("Erro ao excluir o usuário.");
        setShowResultDialog(true);
        console.error('Erro ao excluir o usuário:', error);
      });
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setUserToDelete(null);
  };
  return (
    <div className="app-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="app-title">Gerenciar Usuários</h2>
        <button className="btn-success app-btn" onClick={() => navigate('/register-user')}>
          + Novo Usuário
        </button>
      </div>
      
      <div className="table-container">
        <table className="app-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Nome de Usuário</th>
              <th>Email</th>
              <th style={{ textAlign: 'center', width: '120px' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center" style={{ padding: '2rem', color: 'var(--text-secondary)' }}>
                  Nenhum usuário cadastrado.
                </td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td title={user.email} style={{ maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {user.email}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div className="d-flex justify-content-center gap-2">
                      <button 
                        className="btn-primary app-btn" 
                        style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem' }}
                        onClick={() => navigate(`/register-user?id=${user.id}`)}
                      >
                        Editar
                      </button>
                      <button 
                        className="btn-danger app-btn" 
                        style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem' }}
                        onClick={() => handleDeleteClick(user)}
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <ModalDialog
        show={showDeleteDialog}
        title="Confirmar Exclusão"
        message={`Deseja realmente excluir o usuário ${userToDelete?.name}?`}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      <ModalDialog
        show={showResultDialog}
        title="Resultado"
        message={resultDialogMsg}
        onOk={() => setShowResultDialog(false)}
      />
    </div>
  );
}

export default Users;
