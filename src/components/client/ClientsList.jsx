import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getClients, deleteClient } from "./api";
import ModalDialog from '../shared/modal/ModalDialog';

function Clients() {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [resultDialogMsg, setResultDialogMsg] = useState("");

  useEffect(() => {
    getClients()
      .then(data => {
        if (data.success) {
          setClients(data.data);
        } else {
          setClients([]);
        }
      })
      .catch(error => {
        setClients([]);
        console.error('Erro ao buscar os dados:', error);
      });
  }, []);

  const handleDeleteClick = (client) => {
    setClientToDelete(client);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    setShowDeleteDialog(false);
    deleteClient(clientToDelete.id)
      .then(data => {
        if (data.success) {
          setClients(clients.filter(client => client.id !== clientToDelete.id));
          setResultDialogMsg("Cliente excluído com sucesso!");
        } else {
          setResultDialogMsg("Erro ao excluir o cliente.");
        }
        setShowResultDialog(true);
      })
      .catch(error => {
        setResultDialogMsg("Erro ao excluir o cliente.");
        setShowResultDialog(true);
        console.error('Erro ao excluir o cliente:', error);
      });
    setClientToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setClientToDelete(null);
  };

  const handleResultDialogOk = () => {
    setShowResultDialog(false);
  };
  return (
    <div className="app-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="app-title">Gerenciar Clientes</h2>
        <button className="btn-success app-btn" onClick={() => navigate('/cadastro-cliente')}>
          + Novo Cliente
        </button>
      </div>
      
      <div className="table-container">
        <table className='app-table'>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Endereço</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>CEP</th>
              <th style={{ textAlign: 'center', width: '120px' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(clients) && clients.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center" style={{ padding: '2rem', color: 'var(--text-secondary)' }}>
                  Nenhum cliente cadastrado.
                </td>
              </tr>
            ) : (
              Array.isArray(clients) ? clients.map((client, idx) => (
                <tr key={idx}>
                  <td>{client.name}</td>
                  <td title={client.email} style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {client.email}
                  </td>
                  <td>{client.phone}</td>
                  <td title={client.address} style={{ maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {client.address}
                  </td>
                  <td>{client.city}</td>
                  <td>{client.state}</td>
                  <td>{client.zip_code}</td>
                  <td style={{ textAlign: 'center' }}>
                    <div className="d-flex justify-content-center gap-2">
                      <button 
                        className="btn-primary app-btn" 
                        style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem' }}
                        onClick={() => navigate(`/editar-cliente/${client.id}`)}
                      >
                        Editar
                      </button>
                      <button 
                        className="btn-danger app-btn" 
                        style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem' }}
                        onClick={() => handleDeleteClick(client)}
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              )) : null
            )}
          </tbody>
        </table>
      </div>
      <ModalDialog
        show={showDeleteDialog}
        title="Excluir Cliente"
        message="Tem certeza que deseja excluir este cliente?"
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        okText="Confirmar"
        cancelText="Cancelar"
      />
      <ModalDialog
        show={showResultDialog}
        title={resultDialogMsg}
        onOk={handleResultDialogOk}
        okText="Ok"
      />
    </div>
  );
}

export default Clients;
