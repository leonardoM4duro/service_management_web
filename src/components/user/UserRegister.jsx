import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { getUserById, createUser, updateUser } from "./api";
import ModalDialog from '../shared/modal/ModalDialog';

function UserRegister() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [showDialog, setShowDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    if (id) {
      setIsEdit(true);
      setEditId(id);
      getUserById(id).then(data => {
        if (data.success) {
          setForm({
            name: data.data.name || '',
            email: data.data.email || '',
            password: ''
          });
        }
      });
    }
  }, [location.search]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      // Envia apenas os campos esperados pelo backend
      const dataToSend = {
        id: editId,
        name: form.name,
        email: form.email
      };
      console.log('Dados enviados para atualização:', dataToSend);
      updateUser(dataToSend).then(data => {
        if (data.success) {
          setSuccessMsg("Usuário atualizado com sucesso!");
          setShowDialog(true);
        } else {
          setErrorMsg("Erro ao atualizar usuário.");
          setShowErrorDialog(true);
        }
      });
    } else {
      createUser(form).then(data => {
        if (data.success) {
          setSuccessMsg("Usuário cadastrado com sucesso!");
          setShowDialog(true);
        } else {
          setErrorMsg(data.error);
          setShowErrorDialog(true);
        }
      });
    }
  };

  return (
    <div className="app-container">
      <h2 className="app-title">{isEdit ? 'Editar Usuário' : 'Cadastrar Usuário'}</h2>
      <form onSubmit={handleSubmit} className="app-form">
        <div className="mb-3">
          <label className="form-label">Nome:</label>
          <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="d-flex justify-content-center gap-2 mt-4">
          <button type="submit" className="btn btn-primary app-btn">{isEdit ? 'Atualizar' : 'Cadastrar'}</button>
          <button type="button" className="btn btn-secondary app-btn" onClick={() => navigate('/users')}>Voltar</button>
        </div>
      </form>
      <ModalDialog
        show={showDialog}
        title="Sucesso"
        message={successMsg}
        onOk={() => { setShowDialog(false); navigate('/users'); }}
      />
      <ModalDialog
        show={showErrorDialog}
        title="Erro"
        message={errorMsg}
        onOk={() => setShowErrorDialog(false)}
      />
    </div>
  );
}

export default UserRegister;
